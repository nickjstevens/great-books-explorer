import test from 'node:test'
import assert from 'node:assert/strict'

import {
  books,
  buildBookCoverImage,
  buildBookResourceLinks,
  difficultyOptions,
  getDirectionalRelatedBooks,
  getVisibleBooks,
  links,
  paths,
  sources,
  territories,
  territoryMap,
} from '../src/data/greatBooks.js'

test('catalog ships a true 100-book corpus', () => {
  assert.equal(books.length, 100)
})

test('every book has source attribution and a valid territory', () => {
  for (const book of books) {
    assert.ok(book.sourceRefs.length >= 1, `${book.title} has no source refs`)
    assert.ok(territoryMap[book.territoryId], `${book.title} has invalid territory`)
    assert.ok(book.summary.length > 20, `${book.title} summary is too short`)
    assert.ok(book.takeaways.length >= 3, `${book.title} needs takeaways`)
  }
})

test('territory metadata is complete', () => {
  assert.equal(territories.length, 9)
  for (const territory of territories) {
    assert.ok(territory.question.endsWith('?'))
    assert.ok(territory.summary.length > 20)
  }
})

test('paths only reference valid books and produce graph links', () => {
  const bookIds = new Set(books.map((book) => book.id))

  for (const path of paths) {
    assert.ok(path.bookIds.length >= 6)
    for (const bookId of path.bookIds) {
      assert.ok(bookIds.has(bookId), `${path.name} references unknown book ${bookId}`)
    }
  }

  assert.ok(links.length > 0)
})

test('overview mode returns a cross-territory atlas while focus mode narrows the set', () => {
  const overview = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    curatedOnly: true,
  })
  const focus = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'justice-and-the-city',
    era: 'all',
    curatedOnly: true,
  })

  assert.ok(new Set(overview.map((book) => book.territoryId)).size > 5)
  assert.ok(focus.length < overview.length)
  assert.ok(focus.some((book) => book.id === 'republic'))
})

test('source metadata includes the five requested sources', () => {
  assert.equal(sources.length, 5)
  for (const source of sources) {
    assert.ok(source.url.startsWith('https://') || source.url.startsWith('http://'))
  }
})

test('difficulty and source filters narrow the visible catalog', () => {
  assert.deepEqual(difficultyOptions, ['all', 'Starter', 'Moderate', 'Challenging'])

  const starterOnly = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    difficulty: 'Starter',
    sourceId: 'all',
    curatedOnly: false,
  })
  assert.ok(starterOnly.length > 0)
  assert.ok(starterOnly.every((book) => book.difficulty === 'Starter'))

  const tacOnly = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    difficulty: 'all',
    sourceId: 'tac',
    curatedOnly: false,
  })
  assert.ok(tacOnly.length > 0)
  assert.ok(tacOnly.every((book) => book.sourceRefs.includes('tac')))
})

test('book resource links are generated for public library searches', () => {
  const links = buildBookResourceLinks(books.find((book) => book.id === 'republic'))
  assert.ok(links.projectGutenberg.includes('gutenberg.org'))
  assert.ok(links.archive.includes('archive.org'))
  assert.match(links.projectGutenberg, /Republic/)
  assert.match(links.archive, /Plato/)
})

test('search results stay in conceptual order rather than chronological order', () => {
  const plato = getVisibleBooks({
    searchQuery: 'Plato',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    difficulty: 'all',
    sourceId: 'all',
    curatedOnly: false,
  })

  assert.ok(plato.length >= 4)
  assert.equal(plato[0].id, 'republic')
  assert.ok(plato.findIndex((book) => book.id === 'republic') < plato.findIndex((book) => book.id === 'apology'))
})

test('directional related books split prerequisites from next steps', () => {
  const neighbors = getDirectionalRelatedBooks('nicomachean-ethics')

  assert.ok(neighbors.readFirstIds.includes('apology'))
  assert.ok(neighbors.readNextIds.includes('meditations'))
  assert.ok(!neighbors.readNextIds.includes('apology'))
})

test('book cover images expose a usable detail-view image source and alt text', () => {
  const cover = buildBookCoverImage(books.find((book) => book.id === 'meditations'))

  assert.match(cover.src, /^data:image\/svg\+xml;charset=UTF-8,|^https?:\/\//)
  assert.match(cover.alt, /Meditations/)
  assert.match(cover.alt, /Marcus Aurelius/)
})

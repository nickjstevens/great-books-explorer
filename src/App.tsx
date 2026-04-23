import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  books,
  booksById,
  buildBookCoverImage,
  buildBookResourceLinks,
  difficultyOptions,
  eras,
  getBookPathMembership,
  getDirectionalRelatedBooks,
  getPathById,
  getPathRationale,
  getSourceFootprint,
  getVisibleBooks,
  links,
  paths,
  sources,
  territories,
  territoryMap,
} from './data/greatBooks.js'
import './App.css'

type Theme = 'light' | 'dark'
type AppPage = 'overview' | 'paths' | 'map' | 'library' | 'method'
type Book = (typeof books)[number]
type Source = (typeof sources)[number]

type GraphLayout = {
  positions: Record<string, { x: number; y: number; radius: number }>
  width: number
  height: number
}

const pages: Array<{ id: AppPage; label: string; description: string }> = [
  { id: 'overview', label: 'Overview', description: 'Doorways, areas, and quick routes' },
  { id: 'paths', label: 'Paths', description: 'Curated sequences in conceptual order' },
  { id: 'map', label: 'Map', description: 'Directed graph of the active slice' },
  { id: 'library', label: 'Library', description: 'Filtered catalog grouped by area' },
  { id: 'method', label: 'Method', description: 'Sources and editorial rules' },
]

const defaultPathId = 'all'
const defaultBookId = paths[0].starterId

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [activePage, setActivePage] = useState<AppPage>('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedPathId, setSelectedPathId] = useState(defaultPathId)
  const [selectedEra, setSelectedEra] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedSourceId, setSelectedSourceId] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [curatedOnly, setCuratedOnly] = useState(true)
  const [selectedBookId, setSelectedBookId] = useState(defaultBookId)
  const [detailOpen, setDetailOpen] = useState(false)
  const [surpriseIndex, setSurpriseIndex] = useState(0)
  const deferredSearch = useDeferredValue(searchQuery)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('great-books-theme', theme)
  }, [theme])

  useEffect(() => {
    document.body.style.overflow = menuOpen || detailOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [detailOpen, menuOpen])

  useEffect(() => {
    if (!detailOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDetailOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [detailOpen])

  const authorOptions = useMemo(
    () => ['all', ...new Set(books.map((book) => book.author))].sort((left, right) => left.localeCompare(right)),
    [],
  )

  const rawVisibleBooks = getVisibleBooks({
    searchQuery: deferredSearch,
    selectedTerritory: selectedArea,
    selectedPathId,
    era: selectedEra,
    difficulty: selectedDifficulty,
    sourceId: selectedSourceId,
    curatedOnly,
  })

  const visibleBooks =
    selectedAuthor === 'all' ? rawVisibleBooks : rawVisibleBooks.filter((book) => book.author === selectedAuthor)

  const selectedBook = visibleBooks.some((book) => book.id === selectedBookId)
    ? booksById[selectedBookId]
    : booksById[visibleBooks[0]?.id ?? defaultBookId]

  const activePath = selectedPathId === 'all' ? null : getPathById(selectedPathId)
  const readingSpineBooks = activePath
    ? activePath.bookIds.map((bookId) => booksById[bookId])
    : paths.map((path) => booksById[path.starterId])
  const starterBook = activePath ? booksById[activePath.starterId] : booksById[paths[0].starterId]
  const selectedBookSources = getSourceFootprint(selectedBook)
  const selectedBookResources = buildBookResourceLinks(selectedBook)
  const selectedBookCover = buildBookCoverImage(selectedBook)
  const selectedPathMembership = getBookPathMembership(selectedBook.id)
  const directionalRelated = getDirectionalRelatedBooks(selectedBook.id)
  const readFirstBooks = directionalRelated.readFirstIds.map((bookId) => booksById[bookId]).filter(Boolean)
  const readNextBooks = directionalRelated.readNextIds.map((bookId) => booksById[bookId]).filter(Boolean)
  const graphBookIds = buildGraphBookIds({
    activePath,
    selectedBookId: selectedBook.id,
    selectedArea,
    visibleBooks,
  })
  const graphBooks = graphBookIds.map((bookId) => booksById[bookId]).filter(Boolean)
  const graphLinks = dedupeDirectedLinks(
    links.filter((link) => graphBookIds.includes(link.from) && graphBookIds.includes(link.to)),
  )
  const graphLayout = buildNodeGraphLayout(graphBooks)
  const graphSelectedBook = graphBookIds.includes(selectedBook.id) ? selectedBook : graphBooks[0] ?? starterBook
  const graphSelectedLinks = graphLinks.filter(
    (link) => link.from === graphSelectedBook.id || link.to === graphSelectedBook.id,
  )
  const areaGroups = territories
    .map((area) => ({
      area,
      books: visibleBooks.filter(
        (book) => book.territoryId === area.id || book.secondaryTerritories.includes(area.id),
      ),
    }))
    .filter((group) => group.books.length > 0)
  const totalEligibleCount = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    difficulty: 'all',
    sourceId: 'all',
    curatedOnly,
  }).length
  const activeFilters = [
    deferredSearch.trim() ? `Search: ${deferredSearch.trim()}` : null,
    selectedPathId !== 'all' ? `Path: ${formatPathLabel(activePath?.name ?? '')}` : null,
    selectedArea !== 'all' ? `Area: ${territoryMap[selectedArea].shortName}` : null,
    selectedAuthor !== 'all' ? `Author: ${selectedAuthor}` : null,
    selectedEra !== 'all' ? `Era: ${selectedEra}` : null,
    selectedDifficulty !== 'all' ? `Readiness: ${selectedDifficulty}` : null,
    selectedSourceId !== 'all'
      ? `Source: ${sources.find((source) => source.id === selectedSourceId)?.shortName ?? selectedSourceId}`
      : null,
    curatedOnly ? 'Best-of subset' : null,
  ].filter(Boolean) as string[]
  const isFiltered = activeFilters.length > 0
  const isUpdating = deferredSearch !== searchQuery

  const setPage = (page: AppPage) => {
    setActivePage(page)
    setMenuOpen(false)
  }

  const handleAreaSelect = (areaId: string) => {
    startTransition(() => {
      setSelectedArea(areaId)
      setSelectedBookId(
        visibleBooks.find(
          (book) => book.territoryId === areaId || book.secondaryTerritories.includes(areaId),
        )?.id ?? selectedBook.id,
      )
    })
    setPage('library')
  }

  const handlePathSelect = (pathId: string, nextPage: AppPage = 'paths') => {
    startTransition(() => {
      setSelectedPathId(pathId)
      if (pathId === 'all') {
        setSelectedBookId(paths[0].starterId)
        return
      }
      const nextPath = getPathById(pathId)
      setSelectedBookId(nextPath.starterId)
    })
    setPage(nextPage)
  }

  const openBook = (bookId: string) => {
    setSelectedBookId(bookId)
    setDetailOpen(true)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedArea('all')
    setSelectedPathId('all')
    setSelectedEra('all')
    setSelectedDifficulty('all')
    setSelectedSourceId('all')
    setSelectedAuthor('all')
    setCuratedOnly(true)
    setSelectedBookId(paths[0].starterId)
  }

  const surpriseMe = () => {
    const pool = visibleBooks.length ? visibleBooks : books
    const nextIndex = (surpriseIndex + 7) % pool.length
    setSurpriseIndex(nextIndex)
    openBook(pool[nextIndex].id)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation and filters' : 'Open navigation and filters'}
          className="menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>

        <div className="topbar-brand">
          <span className="eyebrow">Great Books Explorer</span>
          <strong>{pages.find((page) => page.id === activePage)?.label}</strong>
        </div>

        <div className="topbar-actions">
          <button className="ghost-button" onClick={surpriseMe} type="button">
            Surprise me
          </button>
          <button
            className="ghost-button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            type="button"
          >
            {theme === 'light' ? 'Dark' : 'Light'} mode
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} role="presentation">
          <aside
            aria-label="Navigation and filters"
            className="menu-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <section className="menu-section">
              <span className="eyebrow">Pages</span>
              <div className="menu-page-list">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    className={`menu-page-button ${activePage === page.id ? 'is-active' : ''}`}
                    onClick={() => setPage(page.id)}
                    type="button"
                  >
                    <strong>{page.label}</strong>
                    <span>{page.description}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="menu-section">
              <div className="menu-section-header">
                <div>
                  <span className="eyebrow">Filters</span>
                  <h2>Keep the atlas light</h2>
                </div>
                <button className="inline-link" onClick={clearFilters} type="button">
                  Reset
                </button>
              </div>

              <div className="filter-grid">
                <label className="filter-field filter-field-wide">
                  <span>Search the atlas</span>
                  <input
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Try Plato, Euclid, democracy, Woolf..."
                    type="search"
                    value={searchQuery}
                  />
                </label>

                <label className="filter-field">
                  <span>Area</span>
                  <select onChange={(event) => setSelectedArea(event.target.value)} value={selectedArea}>
                    <option value="all">All areas</option>
                    {territories.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.shortName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span>Path</span>
                  <select onChange={(event) => setSelectedPathId(event.target.value)} value={selectedPathId}>
                    <option value="all">All paths</option>
                    {paths.map((path) => (
                      <option key={path.id} value={path.id}>
                        {formatPathLabel(path.name)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span>Author</span>
                  <select onChange={(event) => setSelectedAuthor(event.target.value)} value={selectedAuthor}>
                    <option value="all">All authors</option>
                    {authorOptions
                      .filter((author) => author !== 'all')
                      .map((author) => (
                        <option key={author} value={author}>
                          {author}
                        </option>
                      ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span>Era</span>
                  <select onChange={(event) => setSelectedEra(event.target.value)} value={selectedEra}>
                    {eras.map((era) => (
                      <option key={era.id} value={era.id}>
                        {era.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span>Readiness</span>
                  <select onChange={(event) => setSelectedDifficulty(event.target.value)} value={selectedDifficulty}>
                    {difficultyOptions.map((difficulty) => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === 'all' ? 'All levels' : difficulty}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="filter-field">
                  <span>Source</span>
                  <select onChange={(event) => setSelectedSourceId(event.target.value)} value={selectedSourceId}>
                    <option value="all">All sources</option>
                    {sources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.shortName}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="toggle-field">
                  <input
                    checked={curatedOnly}
                    onChange={(event) => setCuratedOnly(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Very best subset only</span>
                </label>
              </div>

              <div className="menu-summary">
                <strong>
                  {visibleBooks.length} of {totalEligibleCount} books visible
                </strong>
                <span>{isUpdating ? 'Refreshing…' : isFiltered ? activeFilters.join(' · ') : 'No filters applied'}</span>
              </div>
            </section>
          </aside>
        </div>
      ) : null}

      <main className="page-shell">
        <section className="status-band">
          <div>
            <span className="eyebrow">Current slice</span>
            <h1>{pages.find((page) => page.id === activePage)?.label}</h1>
            <p>
              {activePage === 'overview'
                ? 'A lighter front door into the atlas: overview first, then jump to paths, the graph, or the filtered library.'
                : activePage === 'paths'
                  ? 'Every path now stays in conceptual order, so the sequence expresses editorial judgment rather than chronology.'
                  : activePage === 'map'
                    ? 'The graph stays spare: nodes and directed edges in the stage, with the selected book shown outside it.'
                    : activePage === 'library'
                      ? 'Use the menu to search and filter, then browse the current slice by area instead of wrestling one dense page.'
                      : 'The atlas is explicit about what is source-backed, what is inferred, and how the curated sequences are ordered.'}
            </p>
          </div>
          <div className="metric-pills compact-pills">
            <span>{visibleBooks.length} visible</span>
            <span>{territories.length} areas</span>
            <span>{paths.length} curated paths</span>
            <span>{sources.length} sources</span>
          </div>
        </section>

        {activePage === 'overview' ? (
          <>
            <section className="hero-card">
              <div className="hero-copy">
                <span className="eyebrow">Editorial atlas</span>
                <h2>An easier way to decide what to read next.</h2>
                <p className="hero-summary">
                  Start with an area or a curated path instead of one giant page. The atlas still covers the same
                  100-book corpus, but the interface now breaks the decision into cleaner views.
                </p>
                <div className="hero-actions">
                  <button className="ghost-button" onClick={() => setPage('paths')} type="button">
                    Explore curated paths
                  </button>
                  <button className="ghost-button" onClick={() => setPage('map')} type="button">
                    Open the graph
                  </button>
                  <button className="ghost-button" onClick={() => setPage('library')} type="button">
                    Browse the library
                  </button>
                </div>
              </div>

              <aside className="starter-card">
                <span className="eyebrow">Current doorway book</span>
                <div className="starter-card-book">
                  <BookCover book={starterBook} size="large" />
                  <div>
                    <h3>{starterBook.title}</h3>
                    <p>{starterBook.summary}</p>
                  </div>
                </div>
                <div className="metric-pills compact-pills">
                  <span>{starterBook.author}</span>
                  <span>{territoryMap[starterBook.territoryId].shortName}</span>
                  <span>{starterBook.difficulty}</span>
                </div>
                <button className="inline-link" onClick={() => openBook(starterBook.id)} type="button">
                  Open details
                </button>
              </aside>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Areas</span>
                  <h3>Pick the question first</h3>
                </div>
              </div>
              <div className="area-grid">
                {territories.map((area) => {
                  const featured = books.filter((book) => book.territoryId === area.id && book.bestOf).slice(0, 4)
                  const matchingPath = paths.find((path) => path.territoryIds.includes(area.id))

                  return (
                    <button
                      key={area.id}
                      className="area-card"
                      onClick={() => handleAreaSelect(area.id)}
                      style={{ '--area-color': area.color } as CSSProperties}
                      type="button"
                    >
                      <span className="eyebrow">Conceptual area</span>
                      <h4>{area.shortName}</h4>
                      <p className="area-question">{area.question}</p>
                      <p>{area.summary}</p>
                      <div className="cover-row">
                        {featured.map((book) => (
                          <BookCover key={book.id} book={book} muted size="mini" />
                        ))}
                      </div>
                      <div className="area-meta">
                        <span>{featured.length} doorway books</span>
                        <span>{matchingPath ? `Try ${formatPathLabel(matchingPath.name)}` : 'Open area view'}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Curated paths</span>
                  <h3>Use a path when you want a sequence, not a pile</h3>
                </div>
                <button className="inline-link" onClick={() => setPage('paths')} type="button">
                  See all paths
                </button>
              </div>
              <div className="path-grid">
                {paths.slice(0, 4).map((path) => (
                  <button
                    key={path.id}
                    className="path-card"
                    onClick={() => handlePathSelect(path.id)}
                    type="button"
                  >
                    <span className="eyebrow">Curated path</span>
                    <h4>{formatPathLabel(path.name)}</h4>
                    <p>{path.description}</p>
                    <div className="metric-pills compact-pills">
                      <span>{path.bookIds.length} books</span>
                      <span>Starts with {booksById[path.starterId].shortTitle}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {activePage === 'paths' ? (
          <>
            <section className="section-card path-hero-card">
              <div>
                <span className="eyebrow">Active path</span>
                <h3>{activePath ? formatPathLabel(activePath.name) : 'Doorway books across the atlas'}</h3>
                <p>
                  {activePath
                    ? activePath.description
                    : 'Choose any curated path below. Each sequence stays in conceptual order, so every step prepares the next one.'}
                </p>
              </div>
              <div className="metric-pills compact-pills">
                <span>{activePath ? `${activePath.bookIds.length} steps` : `${paths.length} entry paths`}</span>
                <span>{activePath ? `Starts with ${booksById[activePath.starterId].shortTitle}` : 'Overview mode'}</span>
              </div>
            </section>

            <section className="section-card">
              <div className="path-grid path-grid-full">
                <button
                  className={`path-card ${selectedPathId === 'all' ? 'is-active' : ''}`}
                  onClick={() => handlePathSelect('all')}
                  type="button"
                >
                  <span className="eyebrow">Overview</span>
                  <h4>All areas</h4>
                  <p>Read the atlas through its strongest doorway books before choosing any one path.</p>
                </button>
                {paths.map((path) => (
                  <button
                    key={path.id}
                    className={`path-card ${selectedPathId === path.id ? 'is-active' : ''}`}
                    onClick={() => handlePathSelect(path.id)}
                    type="button"
                  >
                    <span className="eyebrow">Curated path</span>
                    <h4>{formatPathLabel(path.name)}</h4>
                    <p>{path.whyThisPath}</p>
                    <div className="metric-pills compact-pills">
                      <span>{path.bookIds.length} books</span>
                      <span>{path.territoryIds.map((areaId) => territoryMap[areaId].shortName).join(' · ')}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="section-card">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">Reading spine</span>
                  <h3>{activePath ? `${formatPathLabel(activePath.name)} in conceptual order` : 'Doorway books by path'}</h3>
                </div>
              </div>
              <div className="reading-spine">
                {readingSpineBooks.map((book, index) => (
                  <button
                    key={book.id}
                    className={`spine-step ${selectedBook.id === book.id ? 'is-active' : ''}`}
                    onClick={() => openBook(book.id)}
                    type="button"
                  >
                    <span className="step-index">{index + 1}</span>
                    <BookCover book={book} size="small" />
                    <div>
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                      <div className="mini-meta-row">
                        <span>{territoryMap[book.territoryId].shortName}</span>
                        <span>{book.difficulty}</span>
                      </div>
                      <p>
                        {activePath
                          ? getPathRationale(activePath.id, book.id)
                          : `A doorway book for ${territoryMap[book.territoryId].shortName.toLowerCase()} that anchors one of the atlas’s main curated paths.`}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {activePage === 'map' ? (
          <section className="section-card map-page-card">
            <div className="section-heading map-page-heading">
              <div>
                <span className="eyebrow">Directed graph</span>
                <h3>
                  {activePath ? `Node map for ${formatPathLabel(activePath.name)}` : 'Node map for the current atlas slice'}
                </h3>
                <p>
                  Only nodes and directed edges stay in the graph itself. Click a node to inspect the book, then open the full detail view if you want the cover, metadata, and links.
                </p>
              </div>
              <div className="metric-pills compact-pills">
                <span>{graphBooks.length} nodes</span>
                <span>{graphLinks.length} directed edges</span>
              </div>
            </div>

            <div className="graph-layout">
              <div className="graph-stage">
                <svg className="graph-lines" viewBox={`0 0 ${graphLayout.width} ${graphLayout.height}`}>
                  <defs>
                    <marker id="graph-arrow" markerHeight="8" markerUnits="strokeWidth" markerWidth="8" orient="auto" refX="7" refY="4">
                      <path d="M0,0 L8,4 L0,8 z" fill="currentColor" />
                    </marker>
                  </defs>
                  {graphLinks.map((link) => {
                    const from = graphLayout.positions[link.from]
                    const to = graphLayout.positions[link.to]
                    if (!from || !to) return null

                    return (
                      <line
                        key={link.id}
                        className={`graph-link graph-link--${link.type}`}
                        markerEnd="url(#graph-arrow)"
                        x1={from.x}
                        x2={to.x}
                        y1={from.y}
                        y2={to.y}
                      />
                    )
                  })}
                </svg>

                {graphBooks.map((book) => {
                  const position = graphLayout.positions[book.id]
                  const area = territoryMap[book.territoryId]
                  return (
                    <button
                      key={book.id}
                      aria-label={`Select ${book.title}`}
                      className={`graph-node ${graphSelectedBook.id === book.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedBookId(book.id)}
                      style={{
                        '--area-color': area.color,
                        height: `${position.radius * 2}px`,
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        width: `${position.radius * 2}px`,
                      } as CSSProperties}
                      type="button"
                    >
                      <span>{graphBooks.indexOf(book) + 1}</span>
                    </button>
                  )
                })}
              </div>

              <aside className="graph-inspector">
                <span className="eyebrow">Selected node</span>
                <h4>{graphSelectedBook.title}</h4>
                <p>
                  {graphSelectedBook.author} · {territoryMap[graphSelectedBook.territoryId].shortName} · {graphSelectedBook.yearLabel}
                </p>
                <p>{graphSelectedBook.summary}</p>
                <div className="metric-pills compact-pills">
                  <span>{graphSelectedLinks.filter((link) => link.to === graphSelectedBook.id).length} incoming</span>
                  <span>{graphSelectedLinks.filter((link) => link.from === graphSelectedBook.id).length} outgoing</span>
                </div>
                <button className="ghost-button" onClick={() => openBook(graphSelectedBook.id)} type="button">
                  Open full detail view
                </button>
                <div className="graph-edge-list">
                  {graphSelectedLinks.length ? (
                    graphSelectedLinks.map((link) => {
                      const fromBook = booksById[link.from]
                      const toBook = booksById[link.to]
                      return (
                        <div key={link.id} className="graph-edge-item">
                          <strong>
                            {fromBook.title} → {toBook.title}
                          </strong>
                          <span>{link.reason}</span>
                        </div>
                      )
                    })
                  ) : (
                    <div className="graph-edge-item">
                      <strong>No local edges</strong>
                      <span>This node is isolated in the current filtered slice.</span>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </section>
        ) : null}

        {activePage === 'library' ? (
          <>
            <section className="section-card filter-summary-card">
              <div>
                <span className="eyebrow">Current filters</span>
                <h3>{selectedPathId !== 'all' ? formatPathLabel(activePath?.name ?? '') : 'Library slice by area'}</h3>
                <p>
                  {isFiltered
                    ? 'The menu controls the filter stack; this page stays focused on the resulting slice.'
                    : 'No filters are active, so you are seeing the default best-of atlas grouped by area.'}
                </p>
              </div>
              <div className="filter-chip-stack">
                {activeFilters.length ? activeFilters.map((filter) => <span key={filter}>{filter}</span>) : <span>No filters applied</span>}
              </div>
            </section>

            <section className="area-cluster-grid">
              {areaGroups.map(({ area, books: areaBooks }) => (
                <section
                  key={area.id}
                  className="area-cluster"
                  style={{ '--area-color': area.color } as CSSProperties}
                >
                  <div className="section-heading section-heading-tight">
                    <div>
                      <span className="eyebrow">{area.shortName}</span>
                      <h4>{area.question}</h4>
                    </div>
                    <span className="cluster-count">{areaBooks.length} shown</span>
                  </div>
                  <p>{area.summary}</p>
                  <div className="book-card-grid">
                    {areaBooks.slice(0, deferredSearch ? 10 : 6).map((book) => (
                      <button
                        key={book.id}
                        className={`book-card ${selectedBook.id === book.id ? 'is-active' : ''}`}
                        onClick={() => openBook(book.id)}
                        type="button"
                      >
                        <BookCover book={book} size="small" />
                        <div>
                          <strong>{book.title}</strong>
                          <span>{book.author}</span>
                          <p>{book.focus}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </section>
          </>
        ) : null}

        {activePage === 'method' ? (
          <section className="section-card methodology-panel">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Methodology</span>
                <h3>Curated, attributed, and explicit about inference</h3>
              </div>
            </div>
            <p className="methodology-summary">
              Inclusion uses source evidence plus editorial judgment. Path order favors conceptual readiness rather than chronology, and every graph edge is labelled as recommendation rather than law.
            </p>
            <div className="source-grid">
              {sources.map((source) => (
                <article key={source.id} className="source-card">
                  <span className="eyebrow">{source.type.replace('_', ' ')}</span>
                  <h4>{source.name}</h4>
                  <p>{source.note}</p>
                  <a href={source.url} rel="noreferrer" target="_blank">
                    View source
                  </a>
                </article>
              ))}
            </div>
            <div className="rule-grid">
              <article>
                <h4>Selection rule</h4>
                <p>A book enters when the atlas can say why it belongs, not just where it appears on a list.</p>
              </article>
              <article>
                <h4>Ordering rule</h4>
                <p>All curated paths and visible slices stay in conceptual order. Chronological sorting is gone.</p>
              </article>
              <article>
                <h4>Interface rule</h4>
                <p>Navigation and filtering live in the menu so the reading views can stay focused and less dense.</p>
              </article>
            </div>
          </section>
        ) : null}

        {detailOpen ? (
          <div className="detail-backdrop" onClick={() => setDetailOpen(false)} role="presentation">
            <aside
              aria-label={`${selectedBook.title} details`}
              aria-modal="true"
              className="detail-sheet"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
            >
              <div className="detail-header">
                <div>
                  <span className="eyebrow">{territoryMap[selectedBook.territoryId].name}</span>
                  <h3>{selectedBook.title}</h3>
                  <p>
                    {selectedBook.author} · {selectedBook.eraLabel} · {selectedBook.yearLabel} · impact {selectedBook.impactScore}
                  </p>
                </div>
                <button
                  aria-label="Close details"
                  className="close-button"
                  onClick={() => setDetailOpen(false)}
                  ref={closeButtonRef}
                  type="button"
                >
                  ×
                </button>
              </div>

              <div className="detail-body">
                <section className="detail-cover-card">
                  <img alt={selectedBookCover.alt} className="detail-cover-image" src={selectedBookCover.src} />
                  <div>
                    <span className="eyebrow">Cover image</span>
                    <p className="detail-summary">{selectedBook.summary}</p>
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Why this doorway matters</span>
                  <p>{selectedBook.impactReason}</p>
                </section>

                <section>
                  <span className="eyebrow">Why this next?</span>
                  <p>
                    {activePath
                      ? getPathRationale(activePath.id, selectedBook.id)
                      : `This book earns attention because it compresses the central pressure inside ${territoryMap[selectedBook.territoryId].shortName.toLowerCase()} into a strong conceptual starting point.`}
                  </p>
                </section>

                <section>
                  <span className="eyebrow">Conceptual areas</span>
                  <div className="chip-row static-row">
                    <span className="chip static-chip">{territoryMap[selectedBook.territoryId].shortName}</span>
                    {selectedBook.secondaryTerritories.map((areaId: string) => (
                      <span key={areaId} className="chip static-chip">
                        {territoryMap[areaId].shortName}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Key takeaways</span>
                  <ul className="takeaway-list">
                    {selectedBook.takeaways.map((takeaway: string) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <span className="eyebrow">Source footprint</span>
                  <div className="chip-row static-row">
                    {selectedBookSources.map((source: Source) => (
                      <a
                        key={source.id}
                        className="chip static-chip"
                        href={source.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {source.shortName}
                      </a>
                    ))}
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Read it online</span>
                  <div className="chip-row static-row">
                    <a className="chip static-chip" href={selectedBookResources.projectGutenberg} rel="noreferrer" target="_blank">
                      Project Gutenberg
                    </a>
                    <a className="chip static-chip" href={selectedBookResources.archive} rel="noreferrer" target="_blank">
                      Archive.org
                    </a>
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Read first</span>
                  <div className="chip-row static-row">
                    {readFirstBooks.length ? (
                      readFirstBooks.map((book) => (
                        <button key={book.id} className="chip" onClick={() => setSelectedBookId(book.id)} type="button">
                          {book.title}
                        </button>
                      ))
                    ) : (
                      <span className="chip static-chip">No earlier recommendation in this slice</span>
                    )}
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Read next</span>
                  <div className="chip-row static-row">
                    {readNextBooks.length ? (
                      readNextBooks.map((book) => (
                        <button key={book.id} className="chip" onClick={() => setSelectedBookId(book.id)} type="button">
                          {book.title}
                        </button>
                      ))
                    ) : (
                      <span className="chip static-chip">No next-step recommendation in this slice</span>
                    )}
                  </div>
                </section>

                <section>
                  <span className="eyebrow">Path memberships</span>
                  <div className="chip-row static-row">
                    {selectedPathMembership.map((path) => (
                      <button
                        key={path.id}
                        className="chip"
                        onClick={() => handlePathSelect(path.id)}
                        type="button"
                      >
                        {formatPathLabel(path.name)}
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </aside>
          </div>
        ) : null}
      </main>
    </div>
  )
}

function BookCover({
  book,
  size,
  muted = false,
}: {
  book: Book
  size: 'mini' | 'small' | 'large'
  muted?: boolean
}) {
  const area = territoryMap[book.territoryId]
  const initials = book.title
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join('')
    .toUpperCase()

  return (
    <div
      aria-hidden="true"
      className={`book-cover book-cover--${size} ${muted ? 'is-muted' : ''}`}
      style={{ '--area-color': area.color } as CSSProperties}
    >
      <span>{initials}</span>
      <small>{book.yearLabel}</small>
    </div>
  )
}

function buildGraphBookIds({
  activePath,
  selectedBookId,
  selectedArea,
  visibleBooks,
}: {
  activePath: ReturnType<typeof getPathById> | null
  selectedBookId: string
  selectedArea: string
  visibleBooks: Book[]
}) {
  if (activePath) {
    const related = getDirectionalRelatedBooks(selectedBookId)
    return [...new Set([...activePath.bookIds, ...related.readFirstIds, ...related.readNextIds])].slice(0, 16)
  }

  if (selectedArea !== 'all') {
    return visibleBooks.slice(0, 14).map((book) => book.id)
  }

  return [...new Set(paths.map((path) => path.starterId).concat(visibleBooks.slice(0, 8).map((book) => book.id)))].slice(0, 14)
}

function dedupeDirectedLinks(graphLinks: typeof links) {
  const map = new Map<string, (typeof links)[number]>()

  graphLinks.forEach((link) => {
    const key = `${link.from}:${link.to}`
    const current = map.get(key)
    if (!current || current.type === 'adjacent') {
      map.set(key, link)
    }
  })

  return [...map.values()]
}

function buildNodeGraphLayout(graphBooks: Book[]): GraphLayout {
  const width = 960
  const height = 540
  const positions: GraphLayout['positions'] = {}
  const grouped = territories
    .map((area) => ({ area, books: graphBooks.filter((book) => book.territoryId === area.id) }))
    .filter((group) => group.books.length > 0)
  const columnWidth = grouped.length > 1 ? width / grouped.length : width / 2

  grouped.forEach((group, columnIndex) => {
    group.books.forEach((book, rowIndex) => {
      const x = columnWidth * columnIndex + columnWidth / 2
      const y = 92 + rowIndex * 102 + (columnIndex % 2 === 0 ? 0 : 28)
      const radius = 18 + Math.round((book.impactScore - 60) / 5)
      positions[book.id] = { x, y, radius }
    })
  })

  return { positions, width, height: Math.max(height, ...Object.values(positions).map((position) => position.y + 72)) }
}

function formatPathLabel(name: string) {
  return name.toLowerCase().endsWith('path') ? name : `${name} path`
}

function getInitialTheme(): Theme {
  const forced = new URLSearchParams(window.location.search).get('theme')
  if (forced === 'light' || forced === 'dark') {
    return forced
  }

  const stored = window.localStorage.getItem('great-books-theme')
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default App

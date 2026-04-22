import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import {
  books,
  booksById,
  buildBookResourceLinks,
  difficultyOptions,
  eras,
  getBookPathMembership,
  getPathById,
  getPathRationale,
  getRelatedBookIds,
  getSourceFootprint,
  getTerritoryCounts,
  getVisibleBooks,
  links,
  orderBooks,
  paths,
  sources,
  territories,
  territoryMap,
} from './data/greatBooks.js'
import './App.css'

const defaultPathId = 'all'
const defaultBookId = paths[0].starterId
const sectionLinks = [
  { id: 'hero', label: 'Atlas' },
  { id: 'territories', label: 'Territories' },
  { id: 'active-path', label: 'Reading spine' },
  { id: 'atlas', label: 'Maps' },
  { id: 'paths', label: 'Paths' },
  { id: 'methodology', label: 'Method' },
]

type Theme = 'light' | 'dark'
type OrderMode = 'conceptual' | 'chronological'
type ViewMode = 'overview' | 'focus'
type Book = (typeof books)[number]
type Source = (typeof sources)[number]

type GraphLayout = {
  positions: Record<string, { x: number; y: number; size: number }>
  width: number
  height: number
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('overview')
  const [selectedTerritory, setSelectedTerritory] = useState('all')
  const [selectedPathId, setSelectedPathId] = useState(defaultPathId)
  const [selectedEra, setSelectedEra] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedSourceId, setSelectedSourceId] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [curatedOnly, setCuratedOnly] = useState(true)
  const [orderMode, setOrderMode] = useState<OrderMode>('conceptual')
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
    if (!detailOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDetailOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [detailOpen])

  const rawVisibleBooks = getVisibleBooks({
    searchQuery: deferredSearch,
    selectedTerritory: viewMode === 'overview' ? 'all' : selectedTerritory,
    selectedPathId: viewMode === 'overview' ? 'all' : selectedPathId,
    era: selectedEra,
    difficulty: selectedDifficulty,
    sourceId: selectedSourceId,
    curatedOnly,
  })

  const authorOptions = useMemo(
    () => ['all', ...new Set(books.map((book) => book.author))].sort((left, right) => left.localeCompare(right)),
    [],
  )

  const visibleBooks =
    selectedAuthor === 'all'
      ? rawVisibleBooks
      : rawVisibleBooks.filter((book) => book.author === selectedAuthor)

  const isOverviewMode = viewMode === 'overview'
  const activePath = selectedPathId === 'all' ? null : getPathById(selectedPathId)
  const activePathBooks = activePath
    ? orderMode === 'chronological'
      ? orderBooks(activePath.bookIds.map((bookId) => booksById[bookId]), 'chronological')
      : activePath.bookIds.map((bookId) => booksById[bookId])
    : orderBooks(
        paths.map((path) => booksById[path.starterId]),
        orderMode === 'chronological' ? 'chronological' : 'conceptual',
      ).slice(0, 6)

  const activeBookId = visibleBooks.some((book) => book.id === selectedBookId)
    ? selectedBookId
    : visibleBooks[0]?.id ?? defaultBookId
  const selectedBook = booksById[activeBookId] ?? booksById[defaultBookId]
  const territoryGroups = getTerritoryCounts(visibleBooks).filter((group) => group.books.length > 0)
  const effectiveTerritory = isOverviewMode ? 'all' : selectedTerritory
  const isUpdating = deferredSearch !== searchQuery
  const totalEligibleCount = getVisibleBooks({
    searchQuery: '',
    selectedTerritory: 'all',
    selectedPathId: 'all',
    era: 'all',
    difficulty: 'all',
    sourceId: 'all',
    curatedOnly,
  }).length
  const visibleCountLabel = `${visibleBooks.length} visible`
  const graphBookIds = buildGraphBookIds({
    visibleBooks,
    selectedBookId: selectedBook.id,
    activePath,
    isOverviewMode,
  })
  const graphBooks = graphBookIds.map((bookId) => booksById[bookId]).filter(Boolean)
  const graphLinks = links.filter(
    (link) => graphBookIds.includes(link.from) && graphBookIds.includes(link.to),
  )
  const graphLayout = buildGraphLayout(graphBooks)

  const starterBook = booksById[isOverviewMode ? paths[0].starterId : activePath?.starterId ?? paths[0].starterId]
  const selectedBookSources = getSourceFootprint(selectedBook)
  const relatedBooks: Book[] = getRelatedBookIds(selectedBook.id).map((bookId) => booksById[bookId])
  const selectedPathMembership = getBookPathMembership(selectedBook.id)
  const selectedBookResources = buildBookResourceLinks(selectedBook)
  const spineIndex = Math.max(0, activePathBooks.findIndex((book) => book.id === selectedBook.id))
  const spineProgress = activePathBooks.length > 1 ? ((spineIndex + 1) / activePathBooks.length) * 100 : 100
  const activeFilters = [
    deferredSearch.trim() ? `Search: ${deferredSearch.trim()}` : null,
    !isOverviewMode && selectedPathId !== 'all' ? `Path: ${activePath?.name}` : null,
    effectiveTerritory !== 'all' ? `Territory: ${territoryMap[effectiveTerritory].shortName}` : null,
    selectedAuthor !== 'all' ? `Author: ${selectedAuthor}` : null,
    selectedEra !== 'all' ? `Era: ${selectedEra}` : null,
    selectedDifficulty !== 'all' ? `Readiness: ${selectedDifficulty}` : null,
    selectedSourceId !== 'all' ? `Source: ${sources.find((source) => source.id === selectedSourceId)?.shortName}` : null,
    curatedOnly ? 'Best-of subset' : null,
  ].filter(Boolean) as string[]

  const handleTerritorySelect = (territoryId: string) => {
    startTransition(() => {
      setViewMode('focus')
      setSelectedTerritory(territoryId)
      const matchingPath = paths.find((path) => path.territoryIds.includes(territoryId))
      if (matchingPath) {
        setSelectedPathId(matchingPath.id)
        setSelectedBookId(matchingPath.starterId)
      } else {
        setSelectedPathId('all')
      }
    })
    scrollToSection('active-path')
  }

  const handlePathSelect = (pathId: string) => {
    startTransition(() => {
      if (pathId === 'all') {
        setViewMode('overview')
        setSelectedPathId('all')
        setSelectedTerritory('all')
        setSelectedBookId(paths[0].starterId)
        return
      }
      setViewMode('focus')
      setSelectedPathId(pathId)
      setSelectedTerritory('all')
      const nextPath = getPathById(pathId)
      setSelectedBookId(nextPath.starterId)
    })
    scrollToSection('active-path')
  }

  const openBook = (bookId: string) => {
    setSelectedBookId(bookId)
    setDetailOpen(true)
  }

  const clearFilters = () => {
    setSearchQuery('')
    setViewMode('overview')
    setSelectedTerritory('all')
    setSelectedPathId('all')
    setSelectedEra('all')
    setSelectedDifficulty('all')
    setSelectedSourceId('all')
    setSelectedAuthor('all')
    setCuratedOnly(true)
    setSelectedBookId(paths[0].starterId)
  }

  const surpriseMe = () => {
    const pool = visibleBooks.length ? visibleBooks : rawVisibleBooks.length ? rawVisibleBooks : books
    const nextIndex = (surpriseIndex + 7) % pool.length
    setSurpriseIndex(nextIndex)
    openBook(pool[nextIndex].id)
  }

  return (
    <div className="app-frame">
      <aside className="sidebar-nav">
        <div className="sidebar-card">
          <span className="eyebrow">Great Books Explorer</span>
          <h2>Navigate the atlas</h2>
          <p>Stay oriented while you scan the canon, drop into a path, and open details.</p>
          <nav aria-label="Section navigation" className="sidebar-links">
            {sectionLinks.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
          <div className="sidebar-status">
            <span>{isOverviewMode ? 'Overview mode' : 'Focus mode'}</span>
            <strong>{visibleCountLabel}</strong>
          </div>
        </div>
      </aside>

      <main className="page-shell">
        <header className="hero-card" id="hero">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow">The Great Books</span>
              <div className="hero-actions-row">
                <button className="theme-toggle" onClick={surpriseMe} type="button">
                  Surprise me
                </button>
                <button
                  className="theme-toggle"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  type="button"
                >
                  {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
                </button>
              </div>
            </div>
            <h1>An editorial atlas for deciding what to read next.</h1>
            <p className="hero-summary">
              Start with a path, not a pile. This atlas groups a source-attributed canon into
              intellectual territories, then makes its reading judgments visible instead of pretending
              there is one neutral master list.
            </p>
            <div className="metric-pills">
              <span>100 books in the atlas</span>
              <span>{territories.length} territories</span>
              <span>{paths.length} reading paths</span>
              <span>{sources.length} attributed sources</span>
            </div>
          </div>

          <aside className="starter-card">
            <span className="eyebrow">Current doorway book</span>
            <div className="starter-card-book">
              <BookCover book={starterBook} size="large" />
              <div>
                <h2>{starterBook.title}</h2>
                <p>{starterBook.summary}</p>
              </div>
            </div>
            <div className="metric-pills compact-pills">
              <span>{starterBook.author}</span>
              <span>{territoryMap[starterBook.territoryId].shortName}</span>
              <span>{starterBook.difficulty}</span>
            </div>
            <button
              className="inline-link"
              onClick={() => openBook(starterBook.id)}
              type="button"
            >
              Open the active path
            </button>
          </aside>
        </header>

        <section className="territory-entry-grid" id="territories">
          {territories.map((territory) => {
            const featured = books
              .filter((book) => book.territoryId === territory.id && book.bestOf)
              .slice(0, 4)
            const matchingPath = paths.find((path) => path.territoryIds.includes(territory.id))

            return (
              <button
                key={territory.id}
                className={`territory-card ${selectedTerritory === territory.id ? 'is-active' : ''}`}
                onClick={() => handleTerritorySelect(territory.id)}
                style={{ '--territory-color': territory.color } as React.CSSProperties}
                type="button"
              >
                <span className="eyebrow">Intellectual territory</span>
                <h3>{territory.shortName}</h3>
                <p className="territory-question">{territory.question}</p>
                <p className="territory-summary">{territory.summary}</p>
                <div className="territory-cover-row">
                  {featured.map((book) => (
                    <BookCover key={book.id} book={book} size="mini" muted />
                  ))}
                </div>
                <div className="territory-meta">
                  <span>{featured.length} best-of anchors</span>
                  <span>{matchingPath ? `Try ${matchingPath.name}` : 'Editorial overview'}</span>
                </div>
              </button>
            )
          })}
        </section>

        <section className="control-band" id="controls">
          <div className="control-group search-group control-group-wide">
            <label htmlFor="catalog-search">Search the atlas</label>
            <input
              id="catalog-search"
              onChange={(event) => {
                const nextValue = event.target.value
                setSearchQuery(nextValue)
                setViewMode(nextValue.trim() || !isFiltersCleared({
                  selectedTerritory,
                  selectedPathId,
                  selectedEra,
                  selectedDifficulty,
                  selectedSourceId,
                  selectedAuthor,
                }) ? 'focus' : 'overview')
              }}
              placeholder="Try Plato, Euclid, democracy, Woolf..."
              type="search"
              value={searchQuery}
            />
            <div className="control-footer">
              <span aria-live="polite" className="control-note">
                Showing {visibleBooks.length} of {totalEligibleCount} books {curatedOnly ? 'in the best-of layer' : 'in the full atlas'}.
              </span>
              {isUpdating ? <span className="loading-pill">Refreshing map…</span> : null}
            </div>
          </div>

          <div className="control-group">
            <label htmlFor="author-filter">Author</label>
            <select
              id="author-filter"
              onChange={(event) => setSelectedAuthor(event.target.value)}
              value={selectedAuthor}
            >
              <option value="all">All authors</option>
              {authorOptions.filter((author) => author !== 'all').map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="territory-filter">Territory</label>
            <select
              id="territory-filter"
              onChange={(event) => {
                const nextTerritory = event.target.value
                setViewMode(nextTerritory === 'all' && selectedPathId === 'all' && !searchQuery.trim() ? 'overview' : 'focus')
                setSelectedTerritory(nextTerritory)
              }}
              value={effectiveTerritory}
            >
              <option value="all">All territories</option>
              {territories.map((territory) => (
                <option key={territory.id} value={territory.id}>
                  {territory.shortName}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group small-group">
            <label htmlFor="era-filter">Era</label>
            <select
              id="era-filter"
              onChange={(event) => setSelectedEra(event.target.value)}
              value={selectedEra}
            >
              {eras.map((era) => (
                <option key={era.id} value={era.id}>
                  {era.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group small-group">
            <label htmlFor="difficulty-filter">Readiness</label>
            <select
              id="difficulty-filter"
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              value={selectedDifficulty}
            >
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All levels' : difficulty}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group small-group">
            <label htmlFor="source-filter">Source</label>
            <select
              id="source-filter"
              onChange={(event) => setSelectedSourceId(event.target.value)}
              value={selectedSourceId}
            >
              <option value="all">All sources</option>
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.shortName}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group small-group emphasis-group">
            <span>Display</span>
            <div className="segmented-control compact-control">
              <button
                className={isOverviewMode ? 'is-selected' : ''}
                onClick={() => handlePathSelect('all')}
                type="button"
              >
                Overview
              </button>
              <button
                className={!isOverviewMode && orderMode === 'conceptual' ? 'is-selected' : ''}
                onClick={() => {
                  setViewMode('focus')
                  setOrderMode('conceptual')
                }}
                type="button"
              >
                Conceptual
              </button>
              <button
                className={!isOverviewMode && orderMode === 'chronological' ? 'is-selected' : ''}
                onClick={() => {
                  setViewMode('focus')
                  setOrderMode('chronological')
                }}
                type="button"
              >
                Chronological
              </button>
            </div>
            <label className="toggle-row">
              <input
                checked={curatedOnly}
                onChange={(event) => setCuratedOnly(event.target.checked)}
                type="checkbox"
              />
              <span>Very best subset</span>
            </label>
            <p className="control-note">Showing {visibleBooks.length} of {curatedOnly ? books.filter((book) => book.bestOf).length : books.length} books in this layer.</p>
          </div>
        </section>

        <section className="active-filter-bar">
          <div>
            <span className="eyebrow">{isOverviewMode ? 'Overview mode' : 'Focus mode'}</span>
            <h2>{isOverviewMode ? 'Scan the atlas before choosing a route' : activePath?.name ?? 'Filtered exploration'}</h2>
            <p>
              {isOverviewMode
                ? 'Start broad, compare territories, then open a path when one region of the canon starts pulling on you.'
                : activePath?.description ?? 'Your current filter stack is narrowing the atlas into a more decision-ready slice.'}
            </p>
          </div>
          <div className="filter-chip-stack">
            {activeFilters.length ? activeFilters.map((filter) => <span key={filter}>{filter}</span>) : <span>No filters applied</span>}
            <button className="inline-link" onClick={clearFilters} type="button">
              Clear filters
            </button>
          </div>
        </section>

        <section className="active-path-card" id="active-path">
          <div>
            <span className="eyebrow">{isOverviewMode ? 'Reading spine' : 'Active path'}</span>
            <h2>{isOverviewMode ? 'Read the atlas through its doorway books' : activePath?.name}</h2>
            <p>
              {isOverviewMode
                ? 'The spine below shows the strongest doors into each territory. Open any card to see why it belongs and where it leads next.'
                : activePath?.description}
            </p>
          </div>
          <div className="active-path-actions">
            <div className="segmented-control">
              {paths.slice(0, 4).map((path) => (
                <button
                  key={path.id}
                  className={selectedPathId === path.id ? 'is-selected' : ''}
                  onClick={() => handlePathSelect(path.id)}
                  type="button"
                >
                  {path.name}
                </button>
              ))}
            </div>
            <button className="theme-toggle" onClick={() => scrollToSection('paths')} type="button">
              Browse all paths
            </button>
          </div>
        </section>

        <section className={`atlas-grid ${isUpdating ? 'is-updating' : ''}`} id="atlas">
          <article className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Reading spine</span>
                <h3>{isOverviewMode ? 'Doorway books to the whole atlas' : `Read this path in ${orderMode} order`}</h3>
              </div>
              <span className="panel-note">{spineIndex + 1} / {activePathBooks.length}</span>
            </div>
            <div className="spine-progress" aria-hidden="true">
              <span style={{ width: `${spineProgress}%` }} />
            </div>
            <div className="reading-spine">
              {activePathBooks.map((book, index) => (
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
                    <p>{activePath ? getPathRationale(activePath.id, book.id) : getOverviewRationale(book)}</p>
                  </div>
                </button>
              ))}
            </div>
          </article>

          <article className="panel wide-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Filtered map</span>
                <h3>
                  {activePath
                    ? `${activePath.name} as an interactive territory constellation`
                    : 'Overview map of the strongest visible anchors'}
                </h3>
              </div>
              <span className="panel-note">{visibleCountLabel}</span>
            </div>
            <div className="graph-stage">
              <svg
                aria-hidden="true"
                className="graph-lines"
                viewBox={`0 0 ${graphLayout.width} ${graphLayout.height}`}
              >
                <defs>
                  <marker
                    id="graph-arrow"
                    markerHeight="8"
                    markerUnits="strokeWidth"
                    markerWidth="8"
                    orient="auto"
                    refX="7"
                    refY="4"
                  >
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
                const territory = territoryMap[book.territoryId]
                return (
                  <button
                    key={book.id}
                    className={`graph-node ${selectedBook.id === book.id ? 'is-active' : ''}`}
                    onClick={() => openBook(book.id)}
                    style={{
                      left: `${position.x}px`,
                      top: `${position.y}px`,
                      width: `${position.size}px`,
                      minHeight: `${Math.max(122, position.size + 16)}px`,
                      '--territory-color': territory.color,
                    } as React.CSSProperties}
                    type="button"
                  >
                    <BookCover book={book} size="mini" />
                    <span className="eyebrow">{territory.shortName}</span>
                    <strong>{book.title}</strong>
                    <small>{book.author}</small>
                  </button>
                )
              })}
            </div>
          </article>
        </section>

        <section className={`panel territory-map-panel ${isUpdating ? 'is-updating' : ''}`}>
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Territory map</span>
              <h3>Books grouped so you can see the wood before the trees</h3>
            </div>
            <span className="panel-note">{visibleCountLabel}</span>
          </div>
          <div className="territory-map-grid">
            {territoryGroups.map(({ territory, books: territoryBooks }) => (
              <section
                key={territory.id}
                className="territory-cluster"
                style={{ '--territory-color': territory.color } as React.CSSProperties}
              >
                <div className="cluster-header">
                  <div>
                    <span className="eyebrow">{territory.shortName}</span>
                    <h4>{territory.question}</h4>
                  </div>
                  <span>{territoryBooks.length} shown</span>
                </div>
                <p>{territory.summary}</p>
                <div className="book-card-grid">
                  {territoryBooks.slice(0, deferredSearch ? 8 : 6).map((book: Book) => (
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
          </div>
        </section>

        <section className="panel path-panel" id="paths">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Reading paths</span>
              <h3>Different ways into the canon, depending on what you want next</h3>
            </div>
          </div>
          <div className="path-grid">
            <button
              className={`path-card ${isOverviewMode ? 'is-active' : ''}`}
              onClick={() => handlePathSelect('all')}
              type="button"
            >
              <span className="eyebrow">Overview</span>
              <h4>All territories</h4>
              <p>See the canon as an atlas before collapsing into any one route.</p>
              <div className="metric-pills compact-pills">
                <span>{territories.length} territories</span>
                <span>{curatedOnly ? 'best-of first' : 'full visible set'}</span>
              </div>
            </button>
            {paths.map((path) => (
              <button
                key={path.id}
                className={`path-card ${selectedPathId === path.id ? 'is-active' : ''}`}
                onClick={() => handlePathSelect(path.id)}
                type="button"
              >
                <span className="eyebrow">Curated path</span>
                <h4>{path.name}</h4>
                <p>{path.description}</p>
                <div className="metric-pills compact-pills">
                  <span>{path.bookIds.length} books</span>
                  <span>Start with {booksById[path.starterId].shortTitle}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel methodology-panel" id="methodology">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Methodology</span>
              <h3>Curated, attributed, and explicit about inference</h3>
            </div>
          </div>
          <p className="methodology-summary">
            Inclusion uses source evidence plus editorial judgment. Impact leans on importance and source
            overlap; path order favors conceptual readiness over strict chronology; and any relationship
            the app infers is labelled as recommendation rather than law.
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
              <p>
                A book enters when the atlas can state why it belongs, not just that it appears on a
                list. Broad consensus matters, but explanatory value matters more.
              </p>
            </article>
            <article>
              <h4>Ordering rule</h4>
              <p>
                Conceptual development leads. Chronology stays visible as a check, not the master
                ordering rule.
              </p>
            </article>
            <article>
              <h4>MVP boundary</h4>
              <p>
                The atlas ships a true 100-book corpus, but the graph stays scoped so the reader never
                has to decode the whole canon at once.
              </p>
            </article>
          </div>
        </section>

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
                <div className="detail-header-book">
                  <BookCover book={selectedBook} size="large" />
                  <div>
                    <span className="eyebrow">{territoryMap[selectedBook.territoryId].name}</span>
                    <h3>{selectedBook.title}</h3>
                    <p>
                      {selectedBook.author} · {selectedBook.eraLabel} · {selectedBook.yearLabel} · impact{' '}
                      {selectedBook.impactScore}
                    </p>
                  </div>
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
                <p className="detail-summary">{selectedBook.summary}</p>

                <section>
                  <span className="eyebrow">Why this doorway matters</span>
                  <p>{selectedBook.impactReason}</p>
                </section>

                <section>
                  <span className="eyebrow">Why this next?</span>
                  <p>
                    {activePath
                      ? getPathRationale(activePath.id, selectedBook.id)
                      : getOverviewRationale(selectedBook)}
                  </p>
                </section>

                <section>
                  <span className="eyebrow">Intellectual areas</span>
                  <div className="chip-row static-row">
                    <span className="chip static-chip">{territoryMap[selectedBook.territoryId].shortName}</span>
                    {selectedBook.secondaryTerritories.map((territoryId: string) => (
                      <span key={territoryId} className="chip static-chip">
                        {territoryMap[territoryId].shortName}
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
                  <span className="eyebrow">Related books</span>
                  <div className="chip-row static-row">
                    {relatedBooks.map((book) => (
                      <button
                        key={book.id}
                        className="chip"
                        onClick={() => setSelectedBookId(book.id)}
                        type="button"
                      >
                        {book.title}
                      </button>
                    ))}
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
                        {path.name}
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
  const territory = territoryMap[book.territoryId]
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
      style={{ '--territory-color': territory.color } as React.CSSProperties}
    >
      <span>{initials}</span>
      <small>{book.yearLabel}</small>
    </div>
  )
}

function buildGraphLayout(graphBooks: typeof books): GraphLayout {
  const width = 1040
  const visibleTerritories = territories.filter((territory) =>
    graphBooks.some((book) => book.territoryId === territory.id),
  )
  const columnWidth = visibleTerritories.length > 1 ? width / visibleTerritories.length : width / 2
  const positions: Record<string, { x: number; y: number; size: number }> = {}
  let maxHeight = 260

  visibleTerritories.forEach((territory, territoryIndex) => {
    const territoryBooks = graphBooks.filter((book) => book.territoryId === territory.id)
    territoryBooks.forEach((book, index) => {
      const row = Math.floor(index / 2)
      const lane = index % 2
      const xOffset = lane === 0 ? -56 : 56
      const x = columnWidth * territoryIndex + columnWidth / 2 + xOffset
      const y = 118 + row * 164 + (lane === 0 ? 0 : 28)
      const size = 132 + Math.round((book.impactScore - 60) * 0.7)
      positions[book.id] = { x, y, size }
      maxHeight = Math.max(maxHeight, y + size / 2 + 42)
    })
  })

  return { positions, width, height: maxHeight }
}

function buildGraphBookIds({
  visibleBooks,
  selectedBookId,
  activePath,
  isOverviewMode,
}: {
  visibleBooks: Book[]
  selectedBookId: string
  activePath: ReturnType<typeof getPathById> | null
  isOverviewMode: boolean
}) {
  if (isOverviewMode) {
    return visibleBooks.slice(0, 14).map((book) => book.id)
  }

  if (activePath) {
    const pathFirst = activePath.bookIds
      .map((bookId) => visibleBooks.find((book) => book.id === bookId))
      .filter(Boolean) as Book[]
    const related = getRelatedBookIds(selectedBookId)
      .map((bookId) => visibleBooks.find((book) => book.id === bookId))
      .filter(Boolean) as Book[]

    return [...new Set([...pathFirst, ...related, ...visibleBooks.slice(0, 12)].map((book) => book.id))].slice(0, 14)
  }

  return visibleBooks.slice(0, 14).map((book) => book.id)
}

function getOverviewRationale(book: Book) {
  return `This is a strong doorway into ${territoryMap[book.territoryId].shortName.toLowerCase()} because it compresses that territory's central question into a durable starting point.`
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

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function isFiltersCleared({
  selectedTerritory,
  selectedPathId,
  selectedEra,
  selectedDifficulty,
  selectedSourceId,
  selectedAuthor,
}: {
  selectedTerritory: string
  selectedPathId: string
  selectedEra: string
  selectedDifficulty: string
  selectedSourceId: string
  selectedAuthor: string
}) {
  return (
    selectedTerritory === 'all' &&
    selectedPathId === 'all' &&
    selectedEra === 'all' &&
    selectedDifficulty === 'all' &&
    selectedSourceId === 'all' &&
    selectedAuthor === 'all'
  )
}

export default App

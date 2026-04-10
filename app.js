const SOURCES = [
  { id: 'thomas-aquinas', name: 'Thomas Aquinas College Syllabus', url: 'https://www.thomasaquinas.edu/a-liberating-education/syllabus' },
  { id: 'fs-blog', name: 'Farnam Street: Great Books', url: 'https://fs.blog/great-books/' },
  { id: 'bloom-list', name: 'Bloom / St. John\'s Great Books List', url: 'http://sonic.net/~rteeter/grtbloom.html' },
  { id: 'read-great-books', name: 'Read The Great Books', url: 'https://www.readthegreatbooks.com/' },
  { id: 'greatest-books', name: 'The Greatest Books', url: 'https://thegreatestbooks.org/' }
];

const BOOKS = [
  { title: 'Iliad', author: 'Homer', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 5, influence: 5, accessibility: 4, foundational: 4, prereq: [] },
  { title: 'Odyssey', author: 'Homer', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 5, influence: 5, accessibility: 5, foundational: 4, prereq: ['Iliad'] },
  { title: 'Oresteia', author: 'Aeschylus', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: [] },
  { title: 'History', author: 'Herodotus', discipline: 'History', era: 'Ancient', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: [] },
  { title: 'Peloponnesian War', author: 'Thucydides', discipline: 'History', era: 'Ancient', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 4, prereq: ['History'] },
  { title: 'Republic', author: 'Plato', discipline: 'Philosophy', era: 'Ancient', tracks: ['Philosophy', 'Politics'], sources: 5, influence: 5, accessibility: 3, foundational: 5, prereq: [] },
  { title: 'Nicomachean Ethics', author: 'Aristotle', discipline: 'Philosophy', era: 'Ancient', tracks: ['Philosophy'], sources: 4, influence: 5, accessibility: 3, foundational: 5, prereq: ['Republic'] },
  { title: 'Politics', author: 'Aristotle', discipline: 'Philosophy', era: 'Ancient', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 5, prereq: ['Nicomachean Ethics'] },
  { title: 'Elements', author: 'Euclid', discipline: 'Mathematics', era: 'Ancient', tracks: ['Mathematics', 'Science'], sources: 5, influence: 5, accessibility: 2, foundational: 5, prereq: [] },
  { title: 'Almagest', author: 'Ptolemy', discipline: 'Science', era: 'Ancient', tracks: ['Science'], sources: 3, influence: 4, accessibility: 2, foundational: 4, prereq: ['Elements'] },
  { title: 'Confessions', author: 'Augustine', discipline: 'Theology', era: 'Late Antiquity', tracks: ['Theology', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Republic'] },
  { title: 'Divine Comedy', author: 'Dante', discipline: 'Literature', era: 'Medieval', tracks: ['Humanities', 'Theology'], sources: 4, influence: 5, accessibility: 3, foundational: 3, prereq: ['Confessions'] },
  { title: 'Summa Theologica (Selections)', author: 'Thomas Aquinas', discipline: 'Theology', era: 'Medieval', tracks: ['Theology'], sources: 4, influence: 5, accessibility: 2, foundational: 5, prereq: ['Confessions'] },
  { title: 'Prince', author: 'Machiavelli', discipline: 'Politics', era: 'Renaissance', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Politics'] },
  { title: 'Meditations on First Philosophy', author: 'Descartes', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy', 'Science'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Nicomachean Ethics'] },
  { title: 'Leviathan', author: 'Hobbes', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: ['Prince'] },
  { title: 'Second Treatise', author: 'Locke', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Leviathan'] },
  { title: 'Federalist Papers', author: 'Hamilton, Madison, Jay', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 5, accessibility: 4, foundational: 4, prereq: ['Second Treatise'] },
  { title: 'Critique of Pure Reason (Selections)', author: 'Kant', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy'], sources: 3, influence: 5, accessibility: 1, foundational: 5, prereq: ['Meditations on First Philosophy'] },
  { title: 'Wealth of Nations', author: 'Adam Smith', discipline: 'Economics', era: 'Modern', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 4, prereq: ['Second Treatise'] },
  { title: 'Origin of Species', author: 'Charles Darwin', discipline: 'Science', era: 'Modern', tracks: ['Science'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Elements'] },
  { title: 'Democracy in America', author: 'Tocqueville', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: ['Federalist Papers'] },
  { title: 'Brothers Karamazov', author: 'Fyodor Dostoevsky', discipline: 'Literature', era: 'Modern', tracks: ['Humanities', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Confessions'] },
  { title: 'War and Peace', author: 'Leo Tolstoy', discipline: 'Literature', era: 'Modern', tracks: ['Humanities'], sources: 4, influence: 5, accessibility: 3, foundational: 3, prereq: ['History'] },
  { title: 'On Liberty', author: 'John Stuart Mill', discipline: 'Philosophy', era: 'Modern', tracks: ['Politics', 'Philosophy'], sources: 4, influence: 4, accessibility: 5, foundational: 3, prereq: ['Second Treatise'] }
];

const state = {
  search: '',
  disciplines: new Set(),
  tracks: new Set(),
  subsetSize: 14
};

const disciplines = [...new Set(BOOKS.map((book) => book.discipline))].sort();
const tracks = [...new Set(BOOKS.flatMap((book) => book.tracks))].sort();

const sourceList = document.getElementById('sourceList');
const disciplineFilters = document.getElementById('disciplineFilters');
const trackFilters = document.getElementById('trackFilters');
const searchInput = document.getElementById('search');
const subsetSizeInput = document.getElementById('subsetSize');
const subsetValue = document.getElementById('subsetValue');
const mapElement = document.getElementById('map');
const readingOrderElement = document.getElementById('readingOrder');
const bookNodeTemplate = document.getElementById('bookNodeTemplate');

function score(book) {
  return (book.sources * 3) + (book.influence * 2) + (book.accessibility * 1.5) + (book.foundational * 2);
}

function renderSources() {
  sourceList.innerHTML = '';
  SOURCES.forEach((source) => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${source.url}" target="_blank" rel="noreferrer">${source.name}</a>`;
    sourceList.append(li);
  });
}

function toggleSet(set, key) {
  if (set.has(key)) {
    set.delete(key);
  } else {
    set.add(key);
  }
}

function makeChip(label, isActive, onClick) {
  const button = document.createElement('button');
  button.className = `chip ${isActive ? 'active' : ''}`;
  button.type = 'button';
  button.textContent = label;
  button.addEventListener('click', onClick);
  return button;
}

function renderChips() {
  disciplineFilters.innerHTML = '';
  trackFilters.innerHTML = '';

  disciplineFilters.append(
    makeChip('All', state.disciplines.size === 0, () => {
      state.disciplines.clear();
      render();
    })
  );

  disciplines.forEach((discipline) => {
    disciplineFilters.append(
      makeChip(discipline, state.disciplines.has(discipline), () => {
        toggleSet(state.disciplines, discipline);
        render();
      })
    );
  });

  trackFilters.append(
    makeChip('All tracks', state.tracks.size === 0, () => {
      state.tracks.clear();
      render();
    })
  );

  tracks.forEach((track) => {
    trackFilters.append(
      makeChip(track, state.tracks.has(track), () => {
        toggleSet(state.tracks, track);
        render();
      })
    );
  });
}

function passesFilters(book) {
  const matchesSearch = state.search === '' || `${book.title} ${book.author}`.toLowerCase().includes(state.search.toLowerCase());
  const matchesDiscipline = state.disciplines.size === 0 || state.disciplines.has(book.discipline);
  const matchesTrack = state.tracks.size === 0 || book.tracks.some((track) => state.tracks.has(track));
  return matchesSearch && matchesDiscipline && matchesTrack;
}

function getFilteredBooks() {
  return BOOKS.filter(passesFilters).map((book) => ({ ...book, recommendationScore: score(book) }));
}

function renderMap(filteredBooks) {
  mapElement.innerHTML = '';
  const byDiscipline = filteredBooks.reduce((groups, book) => {
    if (!groups[book.discipline]) {
      groups[book.discipline] = [];
    }
    groups[book.discipline].push(book);
    return groups;
  }, {});

  Object.entries(byDiscipline)
    .sort(([left], [right]) => left.localeCompare(right))
    .forEach(([discipline, books]) => {
      const cluster = document.createElement('section');
      cluster.className = 'cluster';
      cluster.innerHTML = `<h3>${discipline} (${books.length})</h3>`;
      const booksWrap = document.createElement('div');
      booksWrap.className = 'books';

      books
        .sort((a, b) => b.recommendationScore - a.recommendationScore)
        .forEach((book) => {
          const node = bookNodeTemplate.content.firstElementChild.cloneNode(true);
          node.querySelector('h3').textContent = book.title;
          node.querySelector('.meta').textContent = `${book.author} · ${book.era}`;
          node.querySelector('.tags').textContent = `Track: ${book.tracks.join(', ')}`;
          node.querySelector('.score').textContent = `Score: ${book.recommendationScore.toFixed(1)} | Seen in ${book.sources} / 5 sources`;
          node.style.flexGrow = Math.max(1, Math.round(book.recommendationScore / 8));
          booksWrap.append(node);
        });

      cluster.append(booksWrap);
      mapElement.append(cluster);
    });
}

function buildReadingOrder(filteredBooks) {
  const index = new Map(filteredBooks.map((book) => [book.title, book]));
  const indegree = new Map();
  const graph = new Map();

  filteredBooks.forEach((book) => {
    indegree.set(book.title, 0);
    graph.set(book.title, []);
  });

  filteredBooks.forEach((book) => {
    book.prereq.forEach((requirement) => {
      if (index.has(requirement)) {
        graph.get(requirement).push(book.title);
        indegree.set(book.title, indegree.get(book.title) + 1);
      }
    });
  });

  const queue = filteredBooks
    .filter((book) => indegree.get(book.title) === 0)
    .sort((a, b) => b.recommendationScore - a.recommendationScore)
    .map((book) => book.title);

  const sorted = [];

  while (queue.length > 0) {
    queue.sort((leftTitle, rightTitle) => index.get(rightTitle).recommendationScore - index.get(leftTitle).recommendationScore);
    const current = queue.shift();
    sorted.push(index.get(current));

    graph.get(current).forEach((next) => {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) {
        queue.push(next);
      }
    });
  }

  return sorted.slice(0, state.subsetSize);
}

function renderReadingOrder(filteredBooks) {
  readingOrderElement.innerHTML = '';
  const readingList = buildReadingOrder(filteredBooks);

  readingList.forEach((book, position) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${position + 1}. ${book.title}</strong> — ${book.author}<br/><span class="muted">${book.discipline} · Score ${book.recommendationScore.toFixed(1)} · Why now: ${book.prereq.length ? `after ${book.prereq.join(', ')}` : 'foundation text'}</span>`;
    readingOrderElement.append(li);
  });
}

function render() {
  renderChips();
  const filteredBooks = getFilteredBooks();
  renderMap(filteredBooks);
  renderReadingOrder(filteredBooks);
}

searchInput.addEventListener('input', (event) => {
  state.search = event.target.value.trim();
  render();
});

subsetSizeInput.addEventListener('input', (event) => {
  state.subsetSize = Number(event.target.value);
  subsetValue.textContent = String(state.subsetSize);
  render();
});

renderSources();
render();

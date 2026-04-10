const SOURCES = [
  { id: 'thomas-aquinas', name: 'Thomas Aquinas College Syllabus', url: 'https://www.thomasaquinas.edu/a-liberating-education/syllabus' },
  { id: 'fs-blog', name: 'Farnam Street: Great Books', url: 'https://fs.blog/great-books/' },
  { id: 'bloom-list', name: 'Bloom / St. John\'s Great Books List', url: 'http://sonic.net/~rteeter/grtbloom.html' },
  { id: 'read-great-books', name: 'Read The Great Books', url: 'https://www.readthegreatbooks.com/' },
  { id: 'greatest-books', name: 'The Greatest Books', url: 'https://thegreatestbooks.org/' }
];

const BOOKS = [
  { title: 'Iliad', author: 'Homer', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 5, influence: 5, accessibility: 4, foundational: 4, prereq: [], summary: 'An epic on rage, honor, fate, and the tragic costs of war.', takeaways: ['Leadership failures often start with wounded pride.', 'Honor cultures can escalate conflict rapidly.', 'Mortality gives urgency to ethical choices.'] },
  { title: 'Odyssey', author: 'Homer', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 5, influence: 5, accessibility: 5, foundational: 4, prereq: ['Iliad'], summary: 'Odysseus struggles home through trials that test identity and loyalty.', takeaways: ['Cunning can outperform brute strength.', 'Homecoming requires moral as well as physical return.', 'Stories shape cultural ideals of character.'] },
  { title: 'Oresteia', author: 'Aeschylus', discipline: 'Literature', era: 'Ancient', tracks: ['Humanities'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: [], summary: 'A trilogy tracing vengeance to the birth of civic justice.', takeaways: ['Cycles of revenge need institutions to end.', 'Justice evolves from private retaliation to public law.', 'Tragedy clarifies social values through conflict.'] },
  { title: 'History', author: 'Herodotus', discipline: 'History', era: 'Ancient', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: [], summary: 'Inquiry-driven account of cultures, wars, and human motives.', takeaways: ['Curiosity is foundational to historical method.', 'Narrative can preserve multiple perspectives.', 'Power and hubris repeatedly reshape nations.'] },
  { title: 'Peloponnesian War', author: 'Thucydides', discipline: 'History', era: 'Ancient', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 4, prereq: ['History'], summary: 'A rigorous study of strategy, fear, and political breakdown.', takeaways: ['Great-power conflict often follows fear and miscalculation.', 'Democracy and empire generate internal tensions.', 'Crisis reveals the true character of institutions.'] },
  { title: 'Republic', author: 'Plato', discipline: 'Philosophy', era: 'Ancient', tracks: ['Philosophy', 'Politics'], sources: 5, influence: 5, accessibility: 3, foundational: 5, prereq: [], summary: 'Socratic dialogue on justice, education, and the ideal polis.', takeaways: ['Political order depends on moral education.', 'Justice can be understood as harmony of parts.', 'Images and myths can illuminate abstract truths.'] },
  { title: 'Nicomachean Ethics', author: 'Aristotle', discipline: 'Philosophy', era: 'Ancient', tracks: ['Philosophy'], sources: 4, influence: 5, accessibility: 3, foundational: 5, prereq: ['Republic'], summary: 'Virtue ethics centered on habit, reason, and flourishing.', takeaways: ['Character is built through repeated action.', 'Practical wisdom guides virtue in context.', 'The good life is social, not purely individual.'] },
  { title: 'Politics', author: 'Aristotle', discipline: 'Philosophy', era: 'Ancient', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 5, prereq: ['Nicomachean Ethics'], summary: 'Comparative analysis of constitutions and civic purpose.', takeaways: ['Regime type influences moral formation.', 'Middle classes stabilize political communities.', 'Law should serve the common good.'] },
  { title: 'Elements', author: 'Euclid', discipline: 'Mathematics', era: 'Ancient', tracks: ['Mathematics', 'Science'], sources: 5, influence: 5, accessibility: 2, foundational: 5, prereq: [], summary: 'Axiomatic geometry demonstrating proof as a method.', takeaways: ['Complex structures can emerge from simple axioms.', 'Proof disciplines thinking and communication.', 'Mathematical rigor underpins scientific reasoning.'] },
  { title: 'Almagest', author: 'Ptolemy', discipline: 'Science', era: 'Ancient', tracks: ['Science'], sources: 3, influence: 4, accessibility: 2, foundational: 4, prereq: ['Elements'], summary: 'Comprehensive ancient model of planetary motion and observation.', takeaways: ['Models can be useful even when later revised.', 'Measurement quality shapes theory quality.', 'Science advances through cumulative correction.'] },
  { title: 'Confessions', author: 'Augustine', discipline: 'Theology', era: 'Late Antiquity', tracks: ['Theology', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Republic'], summary: 'Spiritual autobiography on desire, memory, and conversion.', takeaways: ['Self-knowledge requires honest introspection.', 'Disordered loves distort judgment.', 'Narrative can become a tool of moral transformation.'] },
  { title: 'Divine Comedy', author: 'Dante', discipline: 'Literature', era: 'Medieval', tracks: ['Humanities', 'Theology'], sources: 4, influence: 5, accessibility: 3, foundational: 3, prereq: ['Confessions'], summary: 'Poetic journey through moral order and ultimate ends.', takeaways: ['Moral vision is clarified through symbolic imagination.', 'Choices create trajectories of character.', 'Beauty can carry philosophical and theological insight.'] },
  { title: 'Summa Theologica (Selections)', author: 'Thomas Aquinas', discipline: 'Theology', era: 'Medieval', tracks: ['Theology'], sources: 4, influence: 5, accessibility: 2, foundational: 5, prereq: ['Confessions'], summary: 'Systematic reasoning about God, ethics, law, and virtue.', takeaways: ['Careful distinctions reduce conceptual confusion.', 'Faith and reason can be mutually illuminating.', 'Natural law links ethics to human nature.'] },
  { title: 'Prince', author: 'Machiavelli', discipline: 'Politics', era: 'Renaissance', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Politics'], summary: 'Pragmatic handbook on power, statecraft, and political survival.', takeaways: ['Political realities can conflict with moral ideals.', 'Public perception is a strategic resource.', 'Institutions outlast charismatic rulers.'] },
  { title: 'Don Quixote', author: 'Miguel de Cervantes', discipline: 'Literature', era: 'Renaissance', tracks: ['Humanities'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Odyssey'], summary: 'A comic and tragic meditation on ideals versus reality.', takeaways: ['Imagination can ennoble and mislead.', 'Satire exposes social pretensions.', 'Friendship tempers fanaticism.'] },
  { title: 'Hamlet', author: 'William Shakespeare', discipline: 'Literature', era: 'Renaissance', tracks: ['Humanities', 'Philosophy'], sources: 5, influence: 5, accessibility: 4, foundational: 4, prereq: ['Oresteia'], summary: 'Tragedy of conscience, indecision, and political corruption.', takeaways: ['Delay can be rational but costly.', 'Language reveals psychological fracture.', 'Private grief can destabilize public order.'] },
  { title: 'Meditations on First Philosophy', author: 'Descartes', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy', 'Science'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Nicomachean Ethics'], summary: 'Methodic doubt seeking indubitable foundations for knowledge.', takeaways: ['Questioning assumptions can reset inquiry.', 'Clear definitions reduce philosophical drift.', 'Mind-body debates shape modern thought.'] },
  { title: 'Leviathan', author: 'Hobbes', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: ['Prince'], summary: 'Social contract theory grounded in security and sovereignty.', takeaways: ['Fear of chaos motivates political authority.', 'Stable order may require strong institutions.', 'Concepts of rights depend on political design.'] },
  { title: 'Second Treatise', author: 'Locke', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Leviathan'], summary: 'Argument for natural rights, consent, and limited government.', takeaways: ['Legitimate authority depends on consent.', 'Property theory influences economic systems.', 'Resistance can be justified against tyranny.'] },
  { title: 'Federalist Papers', author: 'Hamilton, Madison, Jay', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 5, accessibility: 4, foundational: 4, prereq: ['Second Treatise'], summary: 'Essays defending constitutional design and republican balance.', takeaways: ['Checks and balances moderate factional conflict.', 'Scale can strengthen republican governance.', 'Institutional incentives shape political behavior.'] },
  { title: 'Critique of Pure Reason (Selections)', author: 'Kant', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy'], sources: 3, influence: 5, accessibility: 1, foundational: 5, prereq: ['Meditations on First Philosophy'], summary: 'Investigation of the limits and structures of human cognition.', takeaways: ['Experience is filtered through conceptual frameworks.', 'Metaphysical claims require critical boundaries.', 'Reason has powers and limits.'] },
  { title: 'Wealth of Nations', author: 'Adam Smith', discipline: 'Economics', era: 'Modern', tracks: ['Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 4, prereq: ['Second Treatise'], summary: 'Foundational political economy of markets, labor, and institutions.', takeaways: ['Division of labor drives productivity.', 'Markets need legal and moral frameworks.', 'Policy should consider incentives and trade-offs.'] },
  { title: 'Origin of Species', author: 'Charles Darwin', discipline: 'Science', era: 'Modern', tracks: ['Science'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Elements'], summary: 'Theory of evolution by natural selection with evidential method.', takeaways: ['Small variations can produce large long-term changes.', 'Evidence beats intuition in scientific explanation.', 'Biology gains coherence through shared mechanisms.'] },
  { title: 'Democracy in America', author: 'Tocqueville', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 4, accessibility: 3, foundational: 3, prereq: ['Federalist Papers'], summary: 'Analysis of democratic culture, civic life, and equality.', takeaways: ['Civil associations sustain free societies.', 'Equality can coexist with soft despotism risks.', 'Habits of the heart shape institutions.'] },
  { title: 'Brothers Karamazov', author: 'Fyodor Dostoevsky', discipline: 'Literature', era: 'Modern', tracks: ['Humanities', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Confessions'], summary: 'Philosophical novel on faith, freedom, guilt, and redemption.', takeaways: ['Ideas have existential consequences.', 'Moral responsibility is deeply interpersonal.', 'Suffering can provoke compassion or despair.'] },
  { title: 'War and Peace', author: 'Leo Tolstoy', discipline: 'Literature', era: 'Modern', tracks: ['Humanities'], sources: 4, influence: 5, accessibility: 3, foundational: 3, prereq: ['History'], summary: 'Historical epic of war, family life, and meaning.', takeaways: ['History is shaped by countless ordinary actions.', 'Personal transformation unfolds over time.', 'Grand narratives can obscure lived experience.'] },
  { title: 'On Liberty', author: 'John Stuart Mill', discipline: 'Philosophy', era: 'Modern', tracks: ['Politics', 'Philosophy'], sources: 4, influence: 4, accessibility: 5, foundational: 3, prereq: ['Second Treatise'], summary: 'Defense of individual liberty and open debate.', takeaways: ['Free expression supports truth-seeking.', 'Paternalism must be tightly constrained.', 'Plurality strengthens social learning.'] },
  { title: 'Discourse on Method', author: 'René Descartes', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy', 'Science'], sources: 3, influence: 4, accessibility: 5, foundational: 3, prereq: ['Elements'], summary: 'Accessible statement of method, doubt, and rational inquiry.', takeaways: ['Method matters as much as conclusion.', 'Break difficult problems into parts.', 'Intellectual humility improves progress.'] },
  { title: 'Essay Concerning Human Understanding', author: 'John Locke', discipline: 'Philosophy', era: 'Modern', tracks: ['Philosophy'], sources: 3, influence: 5, accessibility: 3, foundational: 4, prereq: ['Meditations on First Philosophy'], summary: 'Empiricist account of ideas, knowledge, and personal identity.', takeaways: ['Experience shapes mental content.', 'Language can confuse as well as clarify.', 'Identity questions affect law and ethics.'] },
  { title: 'Social Contract', author: 'Jean-Jacques Rousseau', discipline: 'Politics', era: 'Modern', tracks: ['Politics', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Second Treatise'], summary: 'Classic theory of sovereignty and the general will.', takeaways: ['Freedom can be reframed as collective self-rule.', 'Legitimacy depends on civic participation.', 'Political equality can challenge elite capture.'] },
  { title: 'Spirit of the Laws', author: 'Montesquieu', discipline: 'Politics', era: 'Modern', tracks: ['Politics'], sources: 3, influence: 5, accessibility: 2, foundational: 4, prereq: ['Leviathan'], summary: 'Comparative constitutional theory of law, climate, and liberty.', takeaways: ['Separation of powers protects against abuse.', 'Institutions should fit social context.', 'Comparative analysis reveals hidden assumptions.'] },
  { title: 'Gulliver\'s Travels', author: 'Jonathan Swift', discipline: 'Literature', era: 'Modern', tracks: ['Humanities', 'Politics'], sources: 3, influence: 4, accessibility: 5, foundational: 2, prereq: ['Prince'], summary: 'Satirical voyages exposing political absurdity and human vanity.', takeaways: ['Satire can critique power safely and sharply.', 'Scale shifts perspective on social norms.', 'Rationality without empathy can become monstrous.'] },
  { title: 'Candide', author: 'Voltaire', discipline: 'Literature', era: 'Modern', tracks: ['Humanities', 'Philosophy'], sources: 3, influence: 4, accessibility: 5, foundational: 2, prereq: ['Discourse on Method'], summary: 'Fast-paced satire attacking naïve optimism and dogma.', takeaways: ['Skepticism should be paired with practical action.', 'Ideology can ignore human suffering.', 'Cultivate your garden: focus on meaningful work.'] },
  { title: 'The Communist Manifesto', author: 'Marx and Engels', discipline: 'Politics', era: 'Modern', tracks: ['Politics', 'Economics'], sources: 4, influence: 5, accessibility: 4, foundational: 3, prereq: ['Wealth of Nations'], summary: 'Programmatic critique of capitalism and class relations.', takeaways: ['Economic structures shape social life.', 'Political narratives mobilize collective action.', 'Industrialization transforms class dynamics.'] },
  { title: 'Capital (Vol. 1 Selections)', author: 'Karl Marx', discipline: 'Economics', era: 'Modern', tracks: ['Economics', 'Politics'], sources: 3, influence: 5, accessibility: 2, foundational: 4, prereq: ['The Communist Manifesto'], summary: 'Detailed analysis of commodities, labor, and accumulation.', takeaways: ['Systems-level analysis uncovers hidden dynamics.', 'Value theories influence policy debates.', 'Abstraction can illuminate structural inequality.'] },
  { title: 'Interpretation of Dreams', author: 'Sigmund Freud', discipline: 'Psychology', era: 'Modern', tracks: ['Science', 'Humanities'], sources: 3, influence: 4, accessibility: 2, foundational: 3, prereq: ['Confessions'], summary: 'Foundational psychoanalytic account of dreams and desire.', takeaways: ['Motivation is often partly unconscious.', 'Narratives can reveal latent concerns.', 'Theories of mind influence culture broadly.'] },
  { title: 'The Souls of Black Folk', author: 'W. E. B. Du Bois', discipline: 'History', era: 'Modern', tracks: ['Politics', 'Humanities'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Democracy in America'], summary: 'Essays on race, identity, education, and democratic promise.', takeaways: ['Double consciousness captures social contradiction.', 'Education is a civic and moral project.', 'Democracy is tested by exclusion.'] },
  { title: 'The Second Sex', author: 'Simone de Beauvoir', discipline: 'Philosophy', era: 'Contemporary', tracks: ['Philosophy', 'Politics'], sources: 4, influence: 5, accessibility: 3, foundational: 4, prereq: ['On Liberty'], summary: 'Existential and social analysis of gender and freedom.', takeaways: ['Social roles are historically constructed.', 'Freedom is constrained by institutions.', 'Personal experience can ground philosophical insight.'] },
  { title: 'Silent Spring', author: 'Rachel Carson', discipline: 'Science', era: 'Contemporary', tracks: ['Science', 'Politics'], sources: 4, influence: 5, accessibility: 5, foundational: 3, prereq: ['Origin of Species'], summary: 'Evidence-based warning about ecological harms from pesticides.', takeaways: ['Scientific communication can drive policy change.', 'Short-term gains can hide long-term risks.', 'Systems thinking is essential in environmental issues.'] },
  { title: 'Structure of Scientific Revolutions', author: 'Thomas Kuhn', discipline: 'Philosophy', era: 'Contemporary', tracks: ['Science', 'Philosophy'], sources: 4, influence: 5, accessibility: 4, foundational: 4, prereq: ['Discourse on Method'], summary: 'Account of paradigm shifts and non-linear scientific change.', takeaways: ['Progress is not always incremental.', 'Communities shape what counts as evidence.', 'Conceptual revolutions reframe old data.'] },
  { title: 'A Theory of Justice', author: 'John Rawls', discipline: 'Philosophy', era: 'Contemporary', tracks: ['Politics', 'Philosophy'], sources: 4, influence: 5, accessibility: 2, foundational: 4, prereq: ['Social Contract'], summary: 'Contractarian framework for fairness and basic institutions.', takeaways: ['Design institutions from an impartial perspective.', 'Liberty and equality require principled balancing.', 'Justice debates are fundamentally architectural.'] }
];

const state = {
  search: '',
  disciplines: new Set(),
  tracks: new Set(),
  subsetSize: 18
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
const bookModal = document.getElementById('bookModal');
const modalDiscipline = document.getElementById('modalDiscipline');
const modalTitle = document.getElementById('modalTitle');
const modalMeta = document.getElementById('modalMeta');
const modalSummary = document.getElementById('modalSummary');
const modalTakeaways = document.getElementById('modalTakeaways');
const closeModalButton = document.getElementById('closeModal');

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

function showBookModal(book) {
  modalDiscipline.textContent = book.discipline;
  modalTitle.textContent = book.title;
  modalMeta.textContent = `${book.author} · ${book.era} · Score ${book.recommendationScore.toFixed(1)}`;
  modalSummary.textContent = book.summary;
  modalTakeaways.innerHTML = '';
  book.takeaways.forEach((takeaway) => {
    const item = document.createElement('li');
    item.textContent = takeaway;
    modalTakeaways.append(item);
  });
  bookModal.showModal();
}

function wireBookInteractions(element, book) {
  element.addEventListener('click', () => showBookModal(book));
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showBookModal(book);
    }
  });
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
          wireBookInteractions(node, book);
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
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.innerHTML = `<strong>${position + 1}. ${book.title}</strong> — ${book.author}<br/><span class="muted">${book.discipline} · Score ${book.recommendationScore.toFixed(1)} · Why now: ${book.prereq.length ? `after ${book.prereq.join(', ')}` : 'foundation text'}</span>`;
    wireBookInteractions(li, book);
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

closeModalButton.addEventListener('click', () => bookModal.close());
bookModal.addEventListener('click', (event) => {
  if (event.target === bookModal) {
    bookModal.close();
  }
});

renderSources();
render();

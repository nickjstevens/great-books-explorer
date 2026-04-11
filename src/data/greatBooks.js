export const sources = [
  {
    id: 'tac',
    shortName: 'TAC',
    name: 'Thomas Aquinas College Great Books',
    url: 'https://www.thomasaquinas.edu/a-liberating-education/great-books',
    type: 'curriculum',
    note: 'Used as curriculum evidence for the classical spine and books assigned in whole or part.',
  },
  {
    id: 'fs',
    shortName: 'FS',
    name: 'Farnam Street, The Great Books',
    url: 'https://fs.blog/great-books/',
    type: 'editorial_list',
    note: 'Used for year-by-year sequence pressure and gateway framing.',
  },
  {
    id: 'bloom',
    shortName: 'Bloom',
    name: 'Bloom via Robert Teeter, The Western Canon',
    url: 'https://sonic.net/~rteeter/grtbloom.html',
    type: 'literary_canon',
    note: 'Used for literary-canon pressure so the atlas does not collapse into a purely curricular list.',
  },
  {
    id: 'rtgb',
    shortName: 'RTGB',
    name: 'Read The Great Books',
    url: 'https://www.readthegreatbooks.com/',
    type: 'reading_guide',
    note: 'Used as self-directed reading evidence and practical ordering support.',
  },
  {
    id: 'tgb',
    shortName: 'TGB',
    name: 'The Greatest Books',
    url: 'https://thegreatestbooks.org/the-greatest/classics/books/',
    type: 'aggregate_ranking',
    note: 'Used for broad consensus context and scale-out inclusion support.',
  },
]

export const territories = [
  {
    id: 'philosophy',
    name: 'Philosophy & Ethics',
    shortName: 'Philosophy',
    question: 'How should we think and live?',
    summary:
      'The territory of argument, virtue, self-command, and first principles: books that sharpen judgment before they sharpen systems.',
    color: '#b88b2d',
  },
  {
    id: 'politics',
    name: 'Politics & Law',
    shortName: 'Politics',
    question: 'How should we govern ourselves?',
    summary:
      'The territory of constitutions, civic order, liberty, and the claims political communities make on conscience.',
    color: '#c06b54',
  },
  {
    id: 'theology',
    name: 'Theology & Religion',
    shortName: 'Theology',
    question: 'What is ultimate reality, grace, and salvation?',
    summary:
      'The territory of revelation, metaphysics, sin, grace, and the attempt to reconcile reason with worship.',
    color: '#6f5aa5',
  },
  {
    id: 'mathematics',
    name: 'Mathematics & Logic',
    shortName: 'Mathematics',
    question: 'What follows necessarily?',
    summary:
      'The territory of proof, form, number, and the rigorous habits of mind that later science depends on.',
    color: '#3a8d8b',
  },
  {
    id: 'science',
    name: 'Natural Science',
    shortName: 'Science',
    question: 'How does nature work?',
    summary:
      'The territory of motion, matter, biology, cosmology, and the shift from ancient explanation to modern experiment.',
    color: '#6e9351',
  },
  {
    id: 'history',
    name: 'History & Historiography',
    shortName: 'History',
    question: 'What happened, and why?',
    summary:
      'The territory of memory, empire, witness, and the craft of explaining events without flattening them into slogans.',
    color: '#7b9777',
  },
  {
    id: 'literature',
    name: 'Literature & Fiction',
    shortName: 'Literature',
    question: 'What is a human life like from the inside?',
    summary:
      'The territory of inner life, social worlds, irony, conscience, and the long arc from romance to the modern novel.',
    color: '#8c77b2',
  },
  {
    id: 'drama',
    name: 'Drama & Epic',
    shortName: 'Drama & Epic',
    question: 'How do fate and conflict reveal character?',
    summary:
      'The territory of action under pressure: epic journeys, tragic reversals, political theater, and heroic memory.',
    color: '#bb718e',
  },
  {
    id: 'society',
    name: 'Society, Economics & Mind',
    shortName: 'Society',
    question: 'How do institutions, wealth, and psyche shape modern life?',
    summary:
      'The territory where markets, labor, ideology, psychology, and mass modernity start speaking to one another.',
    color: '#c18a32',
  },
]

const territoryCrossovers = {
  philosophy: ['politics', 'theology'],
  politics: ['philosophy', 'history'],
  theology: ['philosophy', 'literature'],
  mathematics: ['science', 'philosophy'],
  science: ['mathematics', 'history'],
  history: ['politics', 'literature'],
  literature: ['history', 'drama'],
  drama: ['literature', 'philosophy'],
  society: ['politics', 'history'],
}

const bestOfIds = new Set([
  'apology',
  'republic',
  'nicomachean-ethics',
  'meditations',
  'confessions',
  'the-prince',
  'leviathan',
  'the-federalist-papers',
  'democracy-in-america',
  'on-liberty',
  'hebrew-bible',
  'new-testament',
  'city-of-god',
  'summa-theologiae',
  'divine-comedy',
  'elements',
  'geometry',
  'principia-mathematica',
  'origin-of-species',
  'histories',
  'history-of-the-peloponnesian-war',
  'decline-and-fall-of-the-roman-empire',
  'don-quixote',
  'moby-dick',
  'war-and-peace',
  'the-brothers-karamazov',
  'the-iliad',
  'the-odyssey',
  'hamlet',
  'king-lear',
  'the-theory-of-moral-sentiments',
  'the-wealth-of-nations',
  'capital',
  'psychology-briefer-course',
  'the-interpretation-of-dreams',
  'the-souls-of-black-folk',
  'two-new-sciences',
  'beyond-good-and-evil',
])

const catalogSeed = [
  ['apology', 'Apology', 'Plato', -399, 'c. 399 BCE', 'philosophy', 'Starter', 'Socratic courage, civic duty, and the examined life', ['tac', 'fs', 'rtgb']],
  ['republic', 'Republic', 'Plato', -380, 'c. 380 BCE', 'philosophy', 'Moderate', 'justice, education, civic order, and the architecture of the soul', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['nicomachean-ethics', 'Nicomachean Ethics', 'Aristotle', -340, 'c. 340 BCE', 'philosophy', 'Starter', 'virtue, habit, flourishing, and practical reasoning', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['phaedo', 'Phaedo', 'Plato', -360, 'c. 360 BCE', 'philosophy', 'Moderate', 'death, immortality, argument, and the discipline of philosophical detachment', ['tac', 'fs', 'rtgb']],
  ['symposium', 'Symposium', 'Plato', -385, 'c. 385 BCE', 'philosophy', 'Moderate', 'eros, beauty, ascent, and the education of desire', ['tac', 'fs', 'rtgb']],
  ['meditations', 'Meditations', 'Marcus Aurelius', 180, 'c. 180 CE', 'philosophy', 'Starter', 'stoic self-command, mortality, and disciplined inward speech', ['fs', 'rtgb', 'tgb']],
  ['confessions', 'Confessions', 'Augustine', 397, '397 CE', 'philosophy', 'Starter', 'self-knowledge, conversion, memory, and desire under grace', ['tac', 'fs', 'bloom', 'rtgb']],
  ['consolation-of-philosophy', 'Consolation of Philosophy', 'Boethius', 524, 'c. 524 CE', 'philosophy', 'Moderate', 'fortune, suffering, providence, and philosophical steadiness', ['tac', 'rtgb', 'tgb']],
  ['discourse-on-method', 'Discourse on Method', 'René Descartes', 1637, '1637', 'philosophy', 'Starter', 'methodic doubt, clarity, and the modern turn to the thinking self', ['tac', 'fs', 'rtgb']],
  ['critique-of-pure-reason', 'Critique of Pure Reason', 'Immanuel Kant', 1781, '1781', 'philosophy', 'Challenging', 'knowledge, limits of reason, and the conditions of experience', ['fs', 'rtgb', 'tgb']],
  ['beyond-good-and-evil', 'Beyond Good and Evil', 'Friedrich Nietzsche', 1886, '1886', 'philosophy', 'Challenging', 'morality, power, genealogy, and the critique of inherited values', ['fs', 'rtgb', 'tgb']],

  ['politics', 'Politics', 'Aristotle', -350, 'c. 350 BCE', 'politics', 'Moderate', 'constitutions, citizenship, and the purpose of political association', ['tac', 'fs', 'rtgb']],
  ['the-prince', 'The Prince', 'Niccolò Machiavelli', 1513, '1513', 'politics', 'Starter', 'statecraft, necessity, reputation, and political realism', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['leviathan', 'Leviathan', 'Thomas Hobbes', 1651, '1651', 'politics', 'Moderate', 'sovereignty, fear, social contract, and order under scarcity', ['fs', 'rtgb', 'tgb']],
  ['second-treatise-of-government', 'Second Treatise of Government', 'John Locke', 1689, '1689', 'politics', 'Starter', 'rights, consent, property, and limited government', ['fs', 'rtgb', 'tgb']],
  ['the-social-contract', 'The Social Contract', 'Jean-Jacques Rousseau', 1762, '1762', 'politics', 'Moderate', 'general will, civic freedom, and democratic legitimacy', ['fs', 'rtgb', 'tgb']],
  ['the-spirit-of-laws', 'The Spirit of Laws', 'Montesquieu', 1748, '1748', 'politics', 'Moderate', 'separation of powers, climate, law, and comparative government', ['rtgb', 'tgb']],
  ['the-federalist-papers', 'The Federalist Papers', 'Hamilton, Madison, and Jay', 1788, '1787–1788', 'politics', 'Starter', 'faction, constitutional design, and republican durability', ['tac', 'fs', 'rtgb', 'tgb']],
  ['reflections-on-the-revolution-in-france', 'Reflections on the Revolution in France', 'Edmund Burke', 1790, '1790', 'politics', 'Moderate', 'tradition, reform, prudence, and revolutionary excess', ['fs', 'rtgb', 'tgb']],
  ['democracy-in-america', 'Democracy in America', 'Alexis de Tocqueville', 1835, '1835–1840', 'politics', 'Starter', 'democratic habits, equality, mores, and civil society', ['fs', 'rtgb', 'tgb']],
  ['on-liberty', 'On Liberty', 'John Stuart Mill', 1859, '1859', 'politics', 'Starter', 'individual freedom, harm, dissent, and experimentation in living', ['fs', 'rtgb', 'tgb']],
  ['the-souls-of-black-folk', 'The Souls of Black Folk', 'W. E. B. Du Bois', 1903, '1903', 'politics', 'Moderate', 'double consciousness, race, citizenship, and democratic failure', ['fs', 'rtgb', 'tgb']],

  ['hebrew-bible', 'Hebrew Bible', 'Various', -500, 'c. 1000–500 BCE', 'theology', 'Starter', 'covenant, law, prophecy, kingship, and sacred history', ['tac', 'fs', 'bloom', 'rtgb']],
  ['new-testament', 'New Testament', 'Various', 80, '1st century CE', 'theology', 'Starter', 'incarnation, gospel, grace, sacrifice, and apostolic witness', ['tac', 'fs', 'bloom', 'rtgb']],
  ['city-of-god', 'City of God', 'Augustine', 426, '426', 'theology', 'Moderate', 'history, providence, love, and the two cities', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['on-the-incarnation', 'On the Incarnation', 'Athanasius', 318, 'c. 318', 'theology', 'Moderate', 'divinity, redemption, and why incarnation matters', ['tac', 'rtgb', 'tgb']],
  ['proslogion', 'Proslogion', 'Anselm', 1077, '1077', 'theology', 'Moderate', 'faith seeking understanding and arguments for divine reality', ['tac', 'rtgb', 'tgb']],
  ['guide-for-the-perplexed', 'Guide for the Perplexed', 'Maimonides', 1190, 'c. 1190', 'theology', 'Challenging', 'revelation, reason, negative theology, and scriptural interpretation', ['fs', 'rtgb', 'tgb']],
  ['summa-theologiae', 'Summa Theologiae', 'Thomas Aquinas', 1270, '1265–1274', 'theology', 'Challenging', 'natural law, virtue, grace, and systematic theological reasoning', ['tac', 'fs', 'rtgb']],
  ['divine-comedy', 'Divine Comedy', 'Dante Alighieri', 1320, 'c. 1320', 'theology', 'Moderate', 'sin, pilgrimage, justice, beatitude, and cosmic order', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['paradise-lost', 'Paradise Lost', 'John Milton', 1667, '1667', 'theology', 'Moderate', 'fall, freedom, rebellion, and the drama of obedience', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['pensees', 'Pensées', 'Blaise Pascal', 1670, '1670', 'theology', 'Starter', 'belief, skepticism, misery, greatness, and the wager of faith', ['fs', 'rtgb', 'tgb']],
  ['fear-and-trembling', 'Fear and Trembling', 'Søren Kierkegaard', 1843, '1843', 'theology', 'Moderate', 'faith, paradox, sacrifice, and inward obedience', ['fs', 'rtgb', 'tgb']],

  ['arithmetic', 'Arithmetic', 'Nicomachus', 100, 'c. 100 CE', 'mathematics', 'Moderate', 'number, ratio, and the symbolic order of arithmetic', ['fs', 'rtgb', 'tgb']],
  ['elements', 'Elements', 'Euclid', -300, 'c. 300 BCE', 'mathematics', 'Starter', 'proof, deduction, axioms, and the architecture of geometry', ['tac', 'fs', 'rtgb', 'tgb']],
  ['organon', 'Organon', 'Aristotle', -350, 'c. 350 BCE', 'mathematics', 'Moderate', 'categories, propositions, and the formal grammar of logic', ['tac', 'fs', 'rtgb']],
  ['conics', 'Conics', 'Apollonius', -200, 'c. 200 BCE', 'mathematics', 'Challenging', 'curves, abstraction, and the geometry behind later science', ['fs', 'rtgb']],
  ['almagest', 'Almagest', 'Ptolemy', 150, 'c. 150 CE', 'mathematics', 'Challenging', 'astronomical calculation, models, and predictive mathematical order', ['fs', 'rtgb', 'tgb']],
  ['introduction-to-the-analytical-art', 'Introduction to the Analytical Art', 'François Viète', 1591, '1591', 'mathematics', 'Challenging', 'symbolic algebra and the bridge from rhetoric to notation', ['fs', 'rtgb']],
  ['geometry', 'Geometry', 'René Descartes', 1637, '1637', 'mathematics', 'Moderate', 'coordinate space, algebraic geometry, and analytical translation', ['fs', 'rtgb', 'tgb']],
  ['two-new-sciences', 'Two New Sciences', 'Galileo Galilei', 1638, '1638', 'mathematics', 'Moderate', 'motion, measurement, and mathematical reasoning about nature', ['tac', 'fs', 'rtgb', 'tgb']],
  ['principia-mathematica', 'Principia Mathematica', 'Isaac Newton', 1687, '1687', 'mathematics', 'Challenging', 'laws of motion, gravitation, and mathematical unification', ['tac', 'fs', 'rtgb', 'tgb']],
  ['theory-of-parallels', 'Theory of Parallels', 'Nikolai Lobachevsky', 1829, '1829', 'mathematics', 'Challenging', 'non-Euclidean space and the instability of intuitive geometry', ['fs', 'rtgb', 'tgb']],
  ['essay-on-the-theory-of-numbers', 'Essay on the Theory of Numbers', 'Richard Dedekind', 1888, '1888', 'mathematics', 'Challenging', 'number foundations, cuts, and the rigor of modern arithmetic', ['fs', 'rtgb', 'tgb']],

  ['physics', 'Physics', 'Aristotle', -350, 'c. 350 BCE', 'science', 'Moderate', 'motion, change, causation, and the vocabulary of natural explanation', ['tac', 'fs', 'rtgb']],
  ['on-the-heavens', 'On the Heavens', 'Aristotle', -350, 'c. 350 BCE', 'science', 'Moderate', 'cosmos, celestial order, and the structure of the world above', ['tac', 'fs', 'rtgb']],
  ['on-generation-and-corruption', 'On Generation and Corruption', 'Aristotle', -350, 'c. 350 BCE', 'science', 'Moderate', 'matter, elements, transformation, and becoming', ['tac', 'fs', 'rtgb']],
  ['de-anima', 'De Anima', 'Aristotle', -350, 'c. 350 BCE', 'science', 'Moderate', 'soul, sensation, life, and the powers of living beings', ['tac', 'fs', 'rtgb']],
  ['on-the-nature-of-things', 'On the Nature of Things', 'Lucretius', -50, 'c. 50 BCE', 'science', 'Starter', 'atomism, mortality, pleasure, and a material account of nature', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['motion-of-the-heart-and-blood', 'On the Motion of the Heart and Blood', 'William Harvey', 1628, '1628', 'science', 'Moderate', 'circulation, observation, and explanatory anatomy', ['fs', 'rtgb']],
  ['epitome-of-copernican-astronomy', 'Epitome of Copernican Astronomy', 'Johannes Kepler', 1620, '1618–1621', 'science', 'Challenging', 'planetary motion, heliocentrism, and mathematical astronomy', ['fs', 'rtgb', 'tgb']],
  ['treatise-on-light', 'Treatise on Light', 'Christiaan Huygens', 1690, '1690', 'science', 'Moderate', 'wave theory, optics, and the behavior of light', ['fs', 'rtgb', 'tgb']],
  ['elements-of-chemistry', 'Elements of Chemistry', 'Antoine Lavoisier', 1789, '1789', 'science', 'Moderate', 'chemical method, naming, and the reorganization of matter', ['fs', 'rtgb']],
  ['origin-of-species', 'On the Origin of Species', 'Charles Darwin', 1859, '1859', 'science', 'Starter', 'natural selection, variation, and deep biological change', ['fs', 'rtgb', 'tgb']],
  ['selected-papers', 'Selected Papers', 'Albert Einstein', 1905, '1905–1916', 'science', 'Challenging', 'relativity, light, and the conceptual revision of space and time', ['tac', 'fs', 'rtgb', 'tgb']],

  ['histories', 'Histories', 'Herodotus', -440, 'c. 440 BCE', 'history', 'Starter', 'inquiry, memory, empire, and the variety of cultures', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['history-of-the-peloponnesian-war', 'History of the Peloponnesian War', 'Thucydides', -431, 'c. 431 BCE', 'history', 'Starter', 'power, war, realism, and civic collapse under pressure', ['tac', 'fs', 'rtgb', 'tgb']],
  ['lives', 'Lives', 'Plutarch', 100, 'c. 100 CE', 'history', 'Moderate', 'character, comparison, and the moral uses of biography', ['tac', 'fs', 'rtgb', 'tgb']],
  ['history-of-rome', 'History of Rome', 'Livy', -27, 'c. 27 BCE', 'history', 'Moderate', 'founding myths, republican virtue, and historical scale', ['fs', 'rtgb', 'tgb']],
  ['annals', 'Annals', 'Tacitus', 117, 'c. 117 CE', 'history', 'Moderate', 'imperial power, corruption, and compressed historical judgment', ['fs', 'rtgb', 'tgb']],
  ['the-twelve-caesars', 'The Twelve Caesars', 'Suetonius', 121, 'c. 121 CE', 'history', 'Starter', 'emperors, scandal, personality, and anecdotal statecraft', ['rtgb', 'tgb']],
  ['decline-and-fall-of-the-roman-empire', 'The Decline and Fall of the Roman Empire', 'Edward Gibbon', 1776, '1776–1788', 'history', 'Challenging', 'civilization, religion, empire, and historical causation', ['fs', 'rtgb', 'tgb']],
  ['history-of-the-french-revolution', 'The French Revolution', 'Thomas Carlyle', 1837, '1837', 'history', 'Moderate', 'revolutionary momentum, rhetoric, and the violence of political renewal', ['fs', 'rtgb', 'tgb']],
  ['the-education-of-henry-adams', 'The Education of Henry Adams', 'Henry Adams', 1907, '1907', 'history', 'Starter', 'modernity, education, and the shock of accelerated history', ['rtgb', 'tgb']],
  ['a-history-of-the-english-speaking-peoples', 'A History of the English-Speaking Peoples', 'Winston Churchill', 1956, '1956–1958', 'history', 'Starter', 'civilizational continuity, narrative statecraft, and national memory', ['rtgb', 'tgb']],
  ['the-guns-of-august', 'The Guns of August', 'Barbara W. Tuchman', 1962, '1962', 'history', 'Starter', 'miscalculation, alliance systems, and the opening of industrial war', ['tgb']],

  ['canterbury-tales', 'The Canterbury Tales', 'Geoffrey Chaucer', 1400, 'c. 1400', 'literature', 'Moderate', 'voice, pilgrimage, class, and the mixed comedy of social life', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['don-quixote', 'Don Quixote', 'Miguel de Cervantes', 1605, '1605–1615', 'literature', 'Starter', 'illusion, dignity, genre, and the birth of the modern novel', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['gullivers-travels', "Gulliver's Travels", 'Jonathan Swift', 1726, '1726', 'literature', 'Starter', 'satire, scale, reason, and the absurdity of polite civilization', ['fs', 'rtgb', 'tgb']],
  ['pride-and-prejudice', 'Pride and Prejudice', 'Jane Austen', 1813, '1813', 'literature', 'Starter', 'courtship, judgment, wit, and moral perception in social life', ['fs', 'rtgb', 'tgb']],
  ['moby-dick', 'Moby-Dick', 'Herman Melville', 1851, '1851', 'literature', 'Challenging', 'obsession, labor, metaphysics, and the sea as total world', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['middlemarch', 'Middlemarch', 'George Eliot', 1871, '1871–1872', 'literature', 'Moderate', 'vocation, marriage, reform, and the moral cost of ordinary life', ['fs', 'rtgb', 'tgb']],
  ['war-and-peace', 'War and Peace', 'Leo Tolstoy', 1869, '1869', 'literature', 'Challenging', 'history, family, war, and the scale of human motive', ['fs', 'rtgb', 'tgb']],
  ['crime-and-punishment', 'Crime and Punishment', 'Fyodor Dostoevsky', 1866, '1866', 'literature', 'Moderate', 'guilt, rationalism, conscience, and the drama of confession', ['fs', 'rtgb', 'tgb']],
  ['the-brothers-karamazov', 'The Brothers Karamazov', 'Fyodor Dostoevsky', 1880, '1880', 'literature', 'Challenging', 'faith, freedom, patricide, and the moral trial of modernity', ['fs', 'rtgb', 'tgb']],
  ['heart-of-darkness', 'Heart of Darkness', 'Joseph Conrad', 1899, '1899', 'literature', 'Starter', 'empire, ambiguity, and the darkness that travels with power', ['fs', 'bloom', 'rtgb', 'tgb']],
  ['mrs-dalloway', 'Mrs Dalloway', 'Virginia Woolf', 1925, '1925', 'literature', 'Moderate', 'consciousness, time, society, and the city as interior weather', ['fs', 'rtgb', 'tgb']],
  ['ulysses', 'Ulysses', 'James Joyce', 1922, '1922', 'literature', 'Challenging', 'ordinary life, stylistic experiment, and epic scale in a single day', ['fs', 'bloom', 'rtgb', 'tgb']],

  ['the-iliad', 'The Iliad', 'Homer', -750, 'c. 8th century BCE', 'drama', 'Starter', 'rage, honor, mortality, and the cost of glory', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['the-odyssey', 'The Odyssey', 'Homer', -725, 'c. 8th century BCE', 'drama', 'Starter', 'homecoming, cunning, endurance, and the tests of identity', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['aeneid', 'Aeneid', 'Virgil', -19, '19 BCE', 'drama', 'Moderate', 'empire, destiny, loss, and the burden of founding', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['oresteia', 'Oresteia', 'Aeschylus', -458, '458 BCE', 'drama', 'Moderate', 'blood guilt, revenge, and the birth of civic justice', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['oedipus-rex', 'Oedipus Rex', 'Sophocles', -429, '429 BCE', 'drama', 'Starter', 'fate, knowledge, blindness, and tragic self-discovery', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['antigone', 'Antigone', 'Sophocles', -441, '441 BCE', 'drama', 'Starter', 'law, kinship, burial, and the collision of duties', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['hamlet', 'Hamlet', 'William Shakespeare', 1603, '1603', 'drama', 'Starter', 'conscience, revenge, hesitation, and performance', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['macbeth', 'Macbeth', 'William Shakespeare', 1606, '1606', 'drama', 'Starter', 'ambition, prophecy, violence, and moral corrosion', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['king-lear', 'King Lear', 'William Shakespeare', 1606, '1606', 'drama', 'Moderate', 'authority, love, madness, and the stripping away of illusion', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['the-tempest', 'The Tempest', 'William Shakespeare', 1611, '1611', 'drama', 'Starter', 'forgiveness, mastery, artifice, and the ethics of control', ['tac', 'fs', 'bloom', 'rtgb', 'tgb']],
  ['faust', 'Faust', 'Johann Wolfgang von Goethe', 1808, '1808 / 1832', 'drama', 'Challenging', 'striving, temptation, knowledge, and the modern pact with power', ['fs', 'rtgb', 'tgb']],

  ['the-theory-of-moral-sentiments', 'The Theory of Moral Sentiments', 'Adam Smith', 1759, '1759', 'society', 'Starter', 'sympathy, judgment, commerce, and moral feeling in social life', ['fs', 'rtgb', 'tgb']],
  ['the-wealth-of-nations', 'The Wealth of Nations', 'Adam Smith', 1776, '1776', 'society', 'Starter', 'markets, labor, incentives, and institutional wealth', ['fs', 'rtgb', 'tgb']],
  ['capital', 'Capital', 'Karl Marx', 1867, '1867', 'society', 'Challenging', 'labor, value, accumulation, and the logic of industrial capitalism', ['fs', 'rtgb', 'tgb']],
  ['political-and-economic-manuscripts-of-1844', 'Economic and Philosophic Manuscripts of 1844', 'Karl Marx', 1844, '1844', 'society', 'Moderate', 'alienation, labor, species-being, and estrangement', ['fs', 'rtgb', 'tgb']],
  ['the-german-ideology', 'The German Ideology', 'Karl Marx and Friedrich Engels', 1846, '1846', 'society', 'Moderate', 'material history, ideology, and social formation', ['fs', 'rtgb', 'tgb']],
  ['psychology-briefer-course', 'Psychology: Briefer Course', 'William James', 1892, '1892', 'society', 'Starter', 'attention, habit, consciousness, and practical psychology', ['fs', 'rtgb', 'tgb']],
  ['phenomenology-of-mind', 'Phenomenology of Mind', 'G. W. F. Hegel', 1807, '1807', 'society', 'Challenging', 'consciousness, recognition, history, and dialectical development', ['fs', 'rtgb', 'tgb']],
  ['introductory-lectures-on-psychoanalysis', 'Introductory Lectures on Psychoanalysis', 'Sigmund Freud', 1917, '1916–1917', 'society', 'Moderate', 'dreams, symptoms, and the structure of the unconscious', ['fs', 'rtgb', 'tgb']],
  ['the-interpretation-of-dreams', 'The Interpretation of Dreams', 'Sigmund Freud', 1900, '1900', 'society', 'Moderate', 'wish, symbol, repression, and dream meaning', ['fs', 'rtgb', 'tgb']],
  ['civilization-and-its-discontents', 'Civilization and Its Discontents', 'Sigmund Freud', 1930, '1930', 'society', 'Starter', 'culture, restraint, aggression, and the costs of order', ['fs', 'rtgb', 'tgb']],
  ['the-crisis-of-the-european-sciences', 'The Crisis of the European Sciences', 'Edmund Husserl', 1936, '1936', 'society', 'Challenging', 'science, lifeworld, meaning, and the crisis of modern rationality', ['fs', 'rtgb', 'tgb']],
]

const pathSeed = [
  {
    id: 'ethics-and-self-command',
    name: 'Ethics and self-command',
    description: 'Start with the language of virtue, then test it under pressure, conversion, and late critique.',
    whyThisPath: 'A strong first route for readers who want better judgment before they want an ideology.',
    territoryIds: ['philosophy', 'theology'],
    bookIds: [
      'apology',
      'nicomachean-ethics',
      'meditations',
      'confessions',
      'consolation-of-philosophy',
      'beyond-good-and-evil',
    ],
  },
  {
    id: 'justice-and-the-city',
    name: 'Justice and the city',
    description: 'Read politics as an argument about form, legitimacy, liberty, and civic endurance.',
    whyThisPath: 'This route helps readers move from ideals of rule to the messy architecture of modern democracy.',
    territoryIds: ['philosophy', 'politics'],
    bookIds: [
      'republic',
      'politics',
      'the-prince',
      'second-treatise-of-government',
      'the-federalist-papers',
      'democracy-in-america',
    ],
  },
  {
    id: 'god-grace-and-salvation',
    name: 'God, grace, and salvation',
    description: 'Follow revelation, conversion, and theological synthesis without collapsing faith into abstraction.',
    whyThisPath: 'A reader who wants the religious spine of the canon gets scripture, confession, and systematic thought in one sequence.',
    territoryIds: ['theology', 'philosophy'],
    bookIds: [
      'hebrew-bible',
      'new-testament',
      'confessions',
      'city-of-god',
      'summa-theologiae',
      'fear-and-trembling',
    ],
  },
  {
    id: 'proof-number-and-nature',
    name: 'Proof, number, and nature',
    description: 'Move from Euclidean proof to the mathematical habits that modern science inherits.',
    whyThisPath: 'This path is the cleanest way to see why mathematical structure matters beyond mathematics itself.',
    territoryIds: ['mathematics', 'science'],
    bookIds: [
      'elements',
      'arithmetic',
      'geometry',
      'two-new-sciences',
      'principia-mathematica',
      'origin-of-species',
    ],
  },
  {
    id: 'empire-and-historical-memory',
    name: 'Empire and historical memory',
    description: 'See how historians describe power, conflict, and civilizational decline across long spans.',
    whyThisPath: 'Readers who want historical scale can move from inquiry and war into empire and modern catastrophe.',
    territoryIds: ['history', 'politics'],
    bookIds: [
      'histories',
      'history-of-the-peloponnesian-war',
      'lives',
      'annals',
      'decline-and-fall-of-the-roman-empire',
      'the-guns-of-august',
    ],
  },
  {
    id: 'the-novel-and-the-modern-self',
    name: 'The novel and the modern self',
    description: 'Read fiction as a training ground for sympathy, judgment, obsession, and consciousness.',
    whyThisPath: 'A good modern-literature route for readers who want interiority, irony, and social texture rather than a simple prestige list.',
    territoryIds: ['literature'],
    bookIds: [
      'don-quixote',
      'pride-and-prejudice',
      'moby-dick',
      'the-brothers-karamazov',
      'mrs-dalloway',
      'ulysses',
    ],
  },
  {
    id: 'tragedy-and-destiny',
    name: 'Tragedy and destiny',
    description: 'Follow epic and tragic forms as they test honor, fate, kingship, and human limits.',
    whyThisPath: 'This route makes the dramatic imagination visible before it fragments into later forms.',
    territoryIds: ['drama'],
    bookIds: [
      'the-iliad',
      'the-odyssey',
      'oresteia',
      'oedipus-rex',
      'hamlet',
      'king-lear',
    ],
  },
  {
    id: 'society-labor-and-the-modern-mind',
    name: 'Society, labor, and the modern mind',
    description: 'Trace the conversation between moral sentiments, markets, alienation, and psychology.',
    whyThisPath: 'This path is the fastest way to move from social order into the modern crisis of work, desire, and mass life.',
    territoryIds: ['society', 'politics'],
    bookIds: [
      'the-theory-of-moral-sentiments',
      'the-wealth-of-nations',
      'capital',
      'psychology-briefer-course',
      'the-interpretation-of-dreams',
      'civilization-and-its-discontents',
    ],
  },
]

function createBook([id, title, author, sortYear, yearLabel, territoryId, difficulty, focus, sourceRefs]) {
  const territory = territories.find((item) => item.id === territoryId)
  const secondaryTerritories = territoryCrossovers[territoryId] ?? []
  const tags = focus.split(',').slice(0, 3).map((item) => item.trim())
  const sourceKinds = new Set(
    sourceRefs.map((sourceId) => sources.find((source) => source.id === sourceId)?.type),
  )
  const impactScore = Math.min(
    99,
    62 + sourceRefs.length * 7 + (bestOfIds.has(id) ? 8 : 0) + (sortYear < 0 ? 2 : 0),
  )
  const summary = `${title} is a ${yearLabel.toLowerCase()} ${territory.name.toLowerCase()} anchor on ${focus}.`
  const takeaways = [
    `Primary pressure: ${tags[0] ?? focus}.`,
    `Use it to answer: ${territory.question.replace('?', '').toLowerCase()}.`,
    `Read it here because it sharpens later work on ${focus.split(',').slice(-1)[0]?.trim() ?? focus}.`,
  ]
  const impactReason =
    sourceKinds.size >= 4
      ? 'Its reach across curriculum, editorial sequence, and aggregate canon lists makes it unusually durable in the tradition.'
      : sourceRefs.length >= 3
        ? 'It appears across multiple source families, so it carries more than one kind of canonical pressure.'
        : 'It is included here because it does real connective work inside the atlas even when the source footprint is narrower.'

  return {
    id,
    title,
    shortTitle: title,
    author,
    sortYear,
    yearLabel,
    eraLabel: toEraLabel(sortYear),
    territoryId,
    secondaryTerritories,
    tags,
    difficulty,
    focus,
    summary,
    takeaways,
    impactScore,
    impactReason,
    bestOf: bestOfIds.has(id),
    sourceRefs,
  }
}

function toEraLabel(year) {
  if (year < -1) return 'Ancient'
  if (year < 1500) return 'Late Antique / Medieval'
  if (year < 1800) return 'Early Modern'
  return 'Modern'
}

export const books = catalogSeed.map(createBook)

export const booksById = Object.fromEntries(books.map((book) => [book.id, book]))

export const paths = pathSeed.map((path) => ({
  ...path,
  starterId: path.bookIds[0],
  bestOf: true,
}))

export const links = buildLinks(paths)

function buildLinks(pathList) {
  const map = new Map()

  for (const path of pathList) {
    path.bookIds.forEach((bookId, index) => {
      const previous = path.bookIds[index - 1]
      const next = path.bookIds[index + 1]

      if (previous) {
        addLink(map, previous, bookId, 'prerequisite', 1, `Best approached after ${booksById[previous].title} on the ${path.name.toLowerCase()} path.`)
      }
      if (next) {
        addLink(map, bookId, next, 'read_next', 1, `Natural next step after ${booksById[bookId].title} on the ${path.name.toLowerCase()} path.`)
      }
    })
  }

  for (const territory of territories) {
    const territoryBooks = books
      .filter((book) => book.territoryId === territory.id)
      .sort((left, right) => right.impactScore - left.impactScore)

    territoryBooks.slice(0, 6).forEach((book, index) => {
      const neighbor = territoryBooks[index + 1]
      if (!neighbor) return
      addLink(
        map,
        book.id,
        neighbor.id,
        'adjacent',
        0.5,
        `Keeps the ${territory.shortName.toLowerCase()} conversation moving without turning it into a rigid order.`,
      )
    })
  }

  return [...map.values()]
}

function addLink(map, from, to, type, strength, reason) {
  const key = `${from}:${to}:${type}`
  if (!map.has(key)) {
    map.set(key, { id: key, from, to, type, strength, reason })
  }
}

export const territoryMap = Object.fromEntries(territories.map((territory) => [territory.id, territory]))
export const sourceMap = Object.fromEntries(sources.map((source) => [source.id, source]))

export const eras = [
  { id: 'all', label: 'All eras' },
  { id: 'Ancient', label: 'Ancient' },
  { id: 'Late Antique / Medieval', label: 'Late Antique / Medieval' },
  { id: 'Early Modern', label: 'Early Modern' },
  { id: 'Modern', label: 'Modern' },
]

export function getPathById(pathId) {
  return paths.find((path) => path.id === pathId) ?? paths[0]
}

export function getBookPathMembership(bookId) {
  return paths.filter((path) => path.bookIds.includes(bookId))
}

export function getPathRationale(pathId, bookId) {
  const path = getPathById(pathId)
  const index = path.bookIds.indexOf(bookId)

  if (index === -1) return 'This book is adjacent to the active route rather than a formal step inside it.'
  if (index === 0) return 'The path begins here because this book supplies the vocabulary that later steps keep revising or testing.'
  if (index === path.bookIds.length - 1) return 'The path ends here because this work absorbs the earlier steps and turns them into a larger verdict.'

  const previous = booksById[path.bookIds[index - 1]]
  return `It belongs here because ${previous.title} sets up the pressure that ${booksById[bookId].title} answers more directly.`
}

export function getRelatedBookIds(bookId) {
  const directLinks = links
    .filter((link) => link.from === bookId || link.to === bookId)
    .flatMap((link) => [link.from, link.to])
    .filter((candidate) => candidate !== bookId)

  const territoryPeers = books
    .filter((book) => book.territoryId === booksById[bookId].territoryId && book.id !== bookId)
    .sort((left, right) => right.impactScore - left.impactScore)
    .slice(0, 3)
    .map((book) => book.id)

  return [...new Set([...directLinks, ...territoryPeers])].slice(0, 6)
}

export function getSourceFootprint(book) {
  return book.sourceRefs.map((sourceId) => sourceMap[sourceId])
}

export function orderBooks(bookList, mode) {
  if (mode === 'chronological') {
    return [...bookList].sort((left, right) => left.sortYear - right.sortYear)
  }
  return [...bookList].sort((left, right) => right.impactScore - left.impactScore)
}

export function getVisibleBooks({
  searchQuery,
  selectedTerritory,
  selectedPathId,
  era,
  curatedOnly,
}) {
  const normalized = searchQuery.trim().toLowerCase()
  let pool = books

  if (curatedOnly) {
    pool = pool.filter((book) => book.bestOf)
  }

  if (selectedPathId !== 'all') {
    const path = getPathById(selectedPathId)
    const pathSet = new Set(path.bookIds)
    const territoryIds = new Set(path.territoryIds)
    pool = books.filter(
      (book) =>
        pathSet.has(book.id) ||
        (territoryIds.has(book.territoryId) && (book.bestOf || normalized.length > 0)),
    )
  }

  if (selectedTerritory !== 'all') {
    pool = pool.filter(
      (book) =>
        book.territoryId === selectedTerritory || book.secondaryTerritories.includes(selectedTerritory),
    )
  }

  if (era !== 'all') {
    pool = pool.filter((book) => book.eraLabel === era)
  }

  if (normalized) {
    pool = books.filter((book) => {
      const haystack = `${book.title} ${book.author} ${book.focus} ${book.tags.join(' ')}`.toLowerCase()
      return haystack.includes(normalized)
    })

    if (selectedTerritory !== 'all') {
      pool = pool.filter(
        (book) =>
          book.territoryId === selectedTerritory || book.secondaryTerritories.includes(selectedTerritory),
      )
    }
    if (era !== 'all') {
      pool = pool.filter((book) => book.eraLabel === era)
    }
  }

  return orderBooks(pool, normalized ? 'chronological' : 'conceptual')
}

export function getTerritoryCounts(bookList) {
  return territories.map((territory) => ({
    territory,
    books: bookList.filter((book) => book.territoryId === territory.id),
  }))
}

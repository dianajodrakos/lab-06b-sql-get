//change exports!!

const books = [
  {
    sku: 1,
    title: 'Good Work',
    author_id: 1,
    image: 'good-work.jpeg',
    description: 'A series of lectures on economics, intermediate technology, and human-centered industry.',
    pages: 223,
    year: 1979,
    language_id: 1,
    publisher: 'HarperCollins Publishers',
    isbn: '0060905611',
    category_id: 1,
    price: '2.06',
    stock: true,
  },

  {
    sku: 2,
    title: 'Labyrinths',
    author_id: 2,
    image: 'labyrinths.jpg',
    description: '',
    pages: 240,
    year: 1962,
    language_id: 1,
    publisher: 'New Directions',
    isbn: '0811216993',
    category_id: 2,
    price: '2.26',
    stock: true,
  },

  {
    sku: 3,
    title: 'Fermentation As Metaphor',
    author_id: 3,
    image: 'fermentation-as-metaphor.jpg',
    description: '',
    pages: 128,
    year: 2020,
    language_id: 1,
    publisher: 'Chelsea Green Publishing',
    isbn: '1645020215',
    category_id: 3,
    price: '25.00',
    stock: true,
  },

  {
    sku: 4,
    title: 'The Disposessed: An Ambiguous Utopia',
    author_id: 4,
    image: 'the-disposessed.jpg',
    description: '',
    pages: 387,
    year: 1974,
    language_id: 1,
    publisher: 'HarperCollins Publishers',
    isbn: '006051275X',
    category_id: 2,
    price: '5.49',
    stock: true,
  },

  {
    sku: 5,
    title: 'Simians, Cyborgs, and Women: The Reinvention of Nature',
    author_id: 5,
    image: 'simians-cyborgs-women.jpg',
    description: '',
    pages: 312,
    year: 1991,
    language_id: 1,
    publisher: 'Routledge',
    isbn: '0415903874',
    category_id: 1,
    price: '32.75',
    stock: true,
  },

  {
    sku: 6,
    title: 'Operating Manual for Spaceship Earth',
    author_id: 6,
    image: 'operating-spaceship-earth.jpg',
    description: '',
    pages: 152,
    year: 1969,
    language: 1,
    publisher: 'Lars Muller Publishers',
    isbn: '0935754016',
    category_id: 1,
    price: '6.00',
    stock: true,
  }
];

const authors = [
  { 
    author: 'E.F. Schumacher'
  },
  {
    author: 'Jorge Luis Borges'
  },
  {
    author: 'Sandor Ellix Katz'
  },
  {
    author: 'Ursula K. LeGuin',
  },
  {
    author: 'Donna Haraway'
  },
  {
    author: 'R. Buckminster Fuller'
  }
];

const categories = [
  {
    category: 'theory'
  },
  {
    category: 'fiction'
  }, 
  {
    category: 'foodways'
  }
];

const languages = [
  { 
    language: 'English' 
  }
];

module.exports = {
  authors, 
  books,
  categories,
  languages,
};
require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const books = [
  {
    sku: 1,
    title: 'Good Work',
    author: 'E. F. Schumacher',
    image: 'good-work.jpeg',
    description: 'A series of lectures on economics, intermediate technology, and human-centered industry.',
    pages: 223,
    year: 1979,
    language: 'English',
    publisher: 'HarperCollins Publishers',
    isbn: '0060905611',
    category: 'theory',
    price: '2.06',
    id: 1, 
    owner_id: 1,
    stock: true,
  },

  {
    sku: 2,
    title: 'Labyrinths',
    author: 'Jorge Luis Borges',
    image: 'labyrinths.jpg',
    description: '',
    pages: 240,
    year: 1962,
    language: 'English',
    publisher: 'New Directions',
    isbn: '0811216993',
    category: 'fiction',
    price: '2.26',
    id: 2,
    owner_id: 1,
    stock: true,
  },

  {
    sku: 3,
    title: 'Fermentation As Metaphor',
    author: 'Sandor Ellix Katz',
    image: 'fermentation-as-metaphor.jpg',
    description: '',
    pages: 128,
    year: 2020,
    language: 'English',
    publisher: 'Chelsea Green Publishing',
    isbn: '1645020215',
    category: 'foodways',
    price: '25.00',
    id: 3,
    owner_id: 1,
    stock: true,
  },

  {
    sku: 4,
    title: 'The Disposessed: An Ambiguous Utopia',
    author: 'Ursula K. LeGuin',
    image: 'the-disposessed.jpg',
    description: '',
    pages: 387,
    year: 1974,
    language: 'English',
    publisher: 'HarperCollins Publishers',
    isbn: '006051275X',
    category: 'fiction',
    price: '5.49',
    id: 4,
    owner_id: 1,
    stock: true,
  },

  {
    sku: 5,
    title: 'Simians, Cyborgs, and Women: The Reinvention of Nature',
    author: 'Donna Haraway',
    image: 'simians-cyborgs-women.jpg',
    description: '',
    pages: 312,
    year: 1991,
    language: 'English',
    publisher: 'Routledge',
    isbn: '0415903874',
    category: 'theory',
    price: '32.75',
    id: 5,
    owner_id: 1,
    stock: true,
  },

  {
    sku: 6,
    title: 'Operating Manual for Spaceship Earth',
    author: 'R. Buckminster Fuller',
    image: 'operating-spaceship-earth.jpg',
    description: '',
    pages: 152,
    year: 1969,
    language: 'English',
    publisher: 'Lars Muller Publishers',
    isbn: '0935754016',
    category: 'theory',
    price: '6.00',
    id: 6,
    owner_id: 1,
    stock: true,
  }
];

describe('get routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    test('returns books', async() => {
      const expectation = books;


      const data = await fakeRequest(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });

    test('returns book id 5', async() => {
      const expectation =   {
        id: 5,
        sku: 5,
        title: 'Simians, Cyborgs, and Women: The Reinvention of Nature',
        author: 'Donna Haraway',
        image: 'simians-cyborgs-women.jpg',
        description: '',
        pages: 312,
        year: 1991,
        language: 'English',
        publisher: 'Routledge',
        isbn: '0415903874',
        category: 'theory',
        price: '32.75',
        stock: true,
        owner_id: 1,
      };

      const data = await fakeRequest(app)
        .get('/books/5')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});

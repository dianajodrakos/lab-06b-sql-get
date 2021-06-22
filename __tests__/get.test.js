require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

const books = [
  {
      "sku": 3,
      "title": "Fermentation As Metaphor",
      "author_id": 3,
      "image": "fermentation-as-metaphor.jpg",
      "description": "",
      "pages": 128,
      "year": 2020,
      "language_id": 1,
      "publisher": "Chelsea Green Publishing",
      "isbn": "1645020215",
      "category_id": 3,
      "price": "25.00",
      "stock": true,
      "author": "Sandor Ellix Katz",
      "category": "foodways",
      "language": "English"
  },
  {
      "sku": 2,
      "title": "Labyrinths",
      "author_id": 2,
      "image": "labyrinths.jpg",
      "description": "",
      "pages": 240,
      "year": 1962,
      "language_id": 1,
      "publisher": "New Directions",
      "isbn": "0811216993",
      "category_id": 2,
      "price": "2.26",
      "stock": true,
      "author": "Jorge Luis Borges",
      "category": "fiction",
      "language": "English"
  },
  {
      "sku": 4,
      "title": "The Disposessed: An Ambiguous Utopia",
      "author_id": 4,
      "image": "the-disposessed.jpg",
      "description": "",
      "pages": 387,
      "year": 1974,
      "language_id": 1,
      "publisher": "HarperCollins Publishers",
      "isbn": "006051275X",
      "category_id": 2,
      "price": "5.49",
      "stock": true,
      "author": "Ursula K. LeGuin",
      "category": "fiction",
      "language": "English"
  },
  {
      "sku": 1,
      "title": "Good Work",
      "author_id": 1,
      "image": "good-work.jpeg",
      "description": "A series of lectures on economics, intermediate technology, and human-centered industry.",
      "pages": 223,
      "year": 1979,
      "language_id": 1,
      "publisher": "HarperCollins Publishers",
      "isbn": "0060905611",
      "category_id": 1,
      "price": "2.06",
      "stock": true,
      "author": "E.F. Schumacher",
      "category": "theory",
      "language": "English"
  },
  {
      "sku": 5,
      "title": "Simians, Cyborgs, and Women: The Reinvention of Nature",
      "author_id": 5,
      "image": "simians-cyborgs-women.jpg",
      "description": "",
      "pages": 312,
      "year": 1991,
      "language_id": 1,
      "publisher": "Routledge",
      "isbn": "0415903874",
      "category_id": 1,
      "price": "32.75",
      "stock": true,
      "author": "Donna Haraway",
      "category": "theory",
      "language": "English"
  },
  {
      "sku": 6,
      "title": "Operating Manual for Spaceship Earth",
      "author_id": 6,
      "image": "operating-spaceship-earth.jpg",
      "description": "",
      "pages": 152,
      "year": 1969,
      "language_id": 1,
      "publisher": "Lars Muller Publishers",
      "isbn": "0935754016",
      "category_id": 1,
      "price": "6.00",
      "stock": true,
      "author": "R. Buckminster Fuller",
      "category": "theory",
      "language": "English"
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
        author: 'Donna Haraway',
        category: 'theory',
        language: 'English'
      };

      const data = await fakeRequest(app)
        .get('/books/5')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
    });
  });
});

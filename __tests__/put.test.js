require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');



describe('put route', () => {
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

    test('/PUT route modifies existing data object', async() => {

      const expectation = {
        id: 2,
        sku: 2,
        title: 'Labyrinths',
        author_id: 2,
        image: 'labyrinths.jpg',
        description: 'Labyrinths is a collection of stories revolving--as the planets, the asteroids, et al, do around the sun--around the concept of the labyrinth, whether it be one of time or space or pure imagination.',
        pages: 240,
        year: 1962,
        language_id: 1,
        publisher: 'New Directions',
        isbn: '0811216993',
        category_id: 2,
        price: '2.72',
        stock: false,
        owner_id: 1,
        author: 'Jorge Luis Borges',
        category: 'fiction',
        language: 'English'
      };
  
      const sendData = {
        id: 2,
        sku: 2,
        title: 'Labyrinths',
        author_id: 2,
        image: 'labyrinths.jpg',
        description: 'Labyrinths is a collection of stories revolving--as the planets, the asteroids, et al, do around the sun--around the concept of the labyrinth, whether it be one of time or space or pure imagination.',
        pages: 240,
        year: 1962,
        language_id: 1,
        publisher: 'New Directions',
        isbn: '0811216993',
        category_id: 2,
        price: '2.72',
        stock: false,
        owner_id: 1
      };

      const data = await fakeRequest(app)
        .put('/books/2')
        .send(sendData)
        .expect('Content-Type', /json/)
        .expect(200);
  
      const newData = await fakeRequest(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);
  
      expect(data.body).toEqual(sendData);
      expect(newData.body).toContainEqual(expectation);
    });


  });
});
require('dotenv').config();

const { execSync } = require('child_process');
const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');



describe('post route', () => {
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


    test('/POST route adds new data object', async() => {

      const expectation = {
        id: 7,
        sku: 7,
        title: 'The Art of Fermentation',
        author: 'Sandor Ellix Katz',
        image: 'art-of-fermentation.jpeg',
        description: 'The bible for the D.I.Y set: detailed instructions for how to make your own sauerkraut, beer, yogurt and pretty much everything involving microorganisms.',
        pages: 498,
        year: 2012,
        language: 'English',
        publisher: 'Chelsea Green',
        isbn: '160358286X',
        category: 'foodways',
        price: '29.26',
        stock: true,
        owner_id: 1,
        author_id: 3,
        category_id: 3,
        language_id: 1,
      };


      const sendData = {
        id: 7,
        sku: 7,
        title: 'The Art of Fermentation',
        author_id: 3,
        image: 'art-of-fermentation.jpeg',
        description: 'The bible for the D.I.Y set: detailed instructions for how to make your own sauerkraut, beer, yogurt and pretty much everything involving microorganisms.',
        pages: 498,
        year: 2012,
        language_id: 1,
        publisher: 'Chelsea Green',
        isbn: '160358286X',
        category_id: 3,
        price: '29.26',
        stock: true,
        owner_id: 1,
      };

      const data = await fakeRequest(app)
        .post('/books')
        .send(sendData)
        .expect('Content-Type', /json/)
        .expect(200);

      const newData = await fakeRequest(app)
        .get('/books/7')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(sendData);
      expect(newData.body).toEqual(expectation);
    });


  });
});
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
        title: 'The Noma Guide to Fermentation',
        author: 'René Redzepi and David Zilber',
        image: 'noma-guide.jpeg',
        description: 'A series of lectures on economics, intermediate technology, and human-centered industry.',
        pages: 456,
        year: 2018,
        language: 'English',
        publisher: 'Artisan',
        isbn: '1579657184',
        category: 'foodways',
        price: '29.26',
        stock: false,
        owner_id: 1,
      };

      const data = await fakeRequest(app)
        .post('/books')
        .send({
          sku: 7,
          title: 'The Noma Guide to Fermentation',
          author: 'René Redzepi and David Zilber',
          image: 'noma-guide.jpeg',
          description: 'A series of lectures on economics, intermediate technology, and human-centered industry.',
          pages: 456,
          year: 2018,
          language: 'English',
          publisher: 'Artisan',
          isbn: '1579657184',
          category: 'foodways',
          price: '29.26',
          stock: false
        })
        .expect('Content-Type', /json/)
        .expect(200);

      const newData = await fakeRequest(app)
        .get('/books')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(data.body).toEqual(expectation);
      expect(newData.body).toContainEqual(expectation);
    });


  });
});
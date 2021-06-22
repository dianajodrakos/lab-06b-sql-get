// require('dotenv').config();

// const { execSync } = require('child_process');
// const fakeRequest = require('supertest');
// const app = require('../lib/app');
// const client = require('../lib/client');



// describe('delete route', () => {
//   describe('routes', () => {
//     let token;
    
//     beforeAll(async done => {
//       execSync('npm run setup-db');
    
//       client.connect();
    
//       const signInData = await fakeRequest(app)
//         .post('/auth/signup')
//         .send({
//           email: 'jon@user.com',
//           password: '1234'
//         });
        
//         token = signInData.body.token; // eslint-disable-line
    
//       return done();
//     });
    
//     afterAll(done => {
//       return client.end(done);
//     });


//     test('/DELETE route modifies existing data object', async() => {

//       const deletedItem = {
//         sku: 4,
//         title: 'The Disposessed: An Ambiguous Utopia',
//         author: 'Ursula K. LeGuin',
//         image: 'the-disposessed.jpg',
//         description: '',
//         pages: 387,
//         year: 1974,
//         language: 'English',
//         publisher: 'HarperCollins Publishers',
//         isbn: '006051275X',
//         category: 'fiction',
//         price: '5.49',
//         stock: true,
//       };
    
//       await fakeRequest(app)
//         .delete('/books/4')
//         .expect('Content-Type', /json/)
//         .expect(200);
    
//       const newData = await fakeRequest(app)
//         .get('/books')
//         .expect('Content-Type', /json/)
//         .expect(200);
    
//       expect(newData.body).not.toContainEqual(deletedItem);
//     });
  


//   });
// });
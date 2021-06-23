const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/categories', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        categories.id,
        categories.category
        FROM categories
      `);
    res.json(data.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/authors', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        authors.id,
        authors.author
        FROM authors
      `);
    res.json(data.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/languages', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        languages.id,
        languages.language
        FROM languages
      `);
    res.json(data.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/books', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        books.id,
        books.sku, 
        books.title, 
        books.author_id, 
        books.image, 
        books.description, 
        books.pages, 
        books.year, 
        books.language_id, 
        books.publisher, 
        books.isbn, 
        books.category_id, 
        books.price, 
        books.stock,
        books.owner_id,
        authors.author,
        categories.category,
        languages.language
        FROM books
      JOIN authors
      ON authors.id = books.author_id
      JOIN categories
      ON categories.id = books.category_id
      JOIN languages
      ON languages.id = books.language_id
      `);
    res.json(data.rows);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/books/:sku', async(req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        books.id,
        books.sku, 
        books.title, 
        books.author_id, 
        books.image, 
        books.description, 
        books.pages, 
        books.year, 
        books.language_id, 
        books.publisher, 
        books.isbn, 
        books.category_id, 
        books.price, 
        books.stock, 
        books.owner_id,
        authors.author,
        categories.category,
        languages.language
        FROM books
      JOIN authors
      ON authors.id = books.author_id
      JOIN categories
      ON categories.id = books.category_id
      JOIN languages
      ON languages.id = books.language_id
      WHERE sku = ${req.params.sku}
      `);
    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/books', async(req, res) => {
  try {
    const data = await client.query(`
      INSERT INTO books (
        sku, 
        title, 
        author_id, 
        image, 
        description, 
        pages, 
        year, 
        language_id, 
        publisher, 
        isbn, 
        category_id, 
        price, 
        stock, 
        owner_id
        )
      VALUES ($1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6, 
        $7, 
        $8, 
        $9, 
        $10, 
        $11, 
        $12, 
        $13, 
        1
        )
      RETURNING *`,
    [
      req.body.sku, 
      req.body.title, 
      req.body.author_id, 
      req.body.image, 
      req.body.description, 
      req.body.pages, 
      req.body.year, 
      req.body.language_id, 
      req.body.publisher, 
      req.body.isbn, 
      req.body.category_id, 
      req.body.price, 
      req.body.stock
    ]
    );
    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.delete('/books/:id', async(req, res) => {
  try {
    const data = await client.query(`
    DELETE from books
    WHERE id=$1`,
    [req.params.id]
    );
    res.json(data.rows[0]);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.put('/books/:id', async(req, res) => {
  try {
    const data = await client.query(`
      UPDATE books
      SET
        sku=$1,
        title=$2,
        author_id=$3,
        image=$4,
        description=$5,
        pages=$6,
        year=$7,
        language_id=$8,
        publisher=$9,
        isbn=$10,
        category_id=$11,
        price=$12,
        stock=$13
      WHERE
        id=$14
      RETURNING *`,
    [
      req.body.sku, 
      req.body.title, 
      req.body.author_id, 
      req.body.image, 
      req.body.description, 
      req.body.pages, 
      req.body.year, 
      req.body.language_id, 
      req.body.publisher, 
      req.body.isbn, 
      req.body.category_id, 
      req.body.price, 
      req.body.stock, 
      req.params.id
    ]
    );
    res.json(data.rows[0]);
  } catch(e) {
    
    res.status(500).json({ error: e.message });
  }
});



app.use(require('./middleware/error'));

module.exports = app;

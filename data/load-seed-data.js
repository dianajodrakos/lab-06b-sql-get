const client = require('../lib/client');
// import our seed data:
const { authors, books, categories, languages } = require('./data.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, hash)
                      VALUES ($1, $2)
                      RETURNING *;
                  `,
        [user.email, user.hash]);
      })
    );
      
    const user = users[0].rows[0];

    await Promise.all(
      authors.map(author => {
        return client.query(`
                    INSERT INTO authors (author)
                    VALUES ($1);
        `,
        [author.author]);
      })
    );

    await Promise.all(
      categories.map(category => {
        return client.query(`
                    INSERT INTO categories (category)
                    VALUES ($1);
        `,
        [category.category]);
      })
    );

    await Promise.all(
      languages.map(language => {
        return client.query(`
                    INSERT INTO languages (language)
                    VALUES ($1);
        `,
        [language.language]);
      })
    );

    await Promise.all(
      books.map(book => {
        return client.query(`
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
                    VALUES (
                      $1, 
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
                      $14
                      );`,
        [
          book.sku, 
          book.title, 
          book.author_id, 
          book.image, 
          book.description, 
          book.pages, 
          book.year, 
          book.language_id, 
          book.publisher, 
          book.isbn, 
          book.category_id, 
          book.price, 
          book.stock, 
          user.id
        ]);
      })
    );
    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}

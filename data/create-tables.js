const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL
                );           
                CREATE TABLE authors (
                    id SERIAL PRIMARY KEY NOT NULL,
                    author VARCHAR(256) NOT NULL
                );
                CREATE TABLE categories (
                    id SERIAL PRIMARY KEY NOT NULL,
                    category VARCHAR(256) NOT NULL
                );
                CREATE TABLE languages (
                    id SERIAL PRIMARY KEY NOT NULL,
                    language VARCHAR(256) NOT NULL
                );
                CREATE TABLE books (
                    id SERIAL PRIMARY KEY NOT NULL,
                    sku INTEGER NOT NULL,
                    title VARCHAR(256) NOT NULL,
                    author_id INTEGER NOT NULL REFERENCES authors(id),
                    image VARCHAR(256) NOT NULL,
                    description VARCHAR(512) NOT NULL,
                    pages INTEGER NOT NULL,
                    year INTEGER NOT NULL,
                    language_id INTEGER NOT NULL REFERENCES languages(id),
                    publisher VARCHAR(256) NOT NULL,
                    isbn VARCHAR(13) NOT NULL,
                    category_id INTEGER NOT NULL REFERENCES categories(id),
                    price DEC(10, 2) NOT NULL,
                    stock BOOL NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
                );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}

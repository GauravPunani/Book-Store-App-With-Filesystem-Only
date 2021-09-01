const express = require('express');
const app = express();
const books = require('./Routes/books');
const {getBooks, getBookById}  = require('./Controllers/books');
const session = require('express-session');
const { flash } = require('express-flash-message');

app.use(
    session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
    },
    })
);

app.use(flash({ sessionKeyName: 'flashMessage' }));

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/books', books);



app.get(['/','/books'], async (req, res) => {
    const books = await getBooks();
    const successMsg = await req.consumeFlash('success');    
    res.render('books/books', {books: books, success: successMsg});
});

app.get('/books/create', async(req, res) => {
    res.render('books/create-book');
});

app.get('/books/:id', async(req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    res.render('books/book', {book: book});
});

app.get('/books/:id/edit', async(req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    res.render('books/edit-book', {book: book});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
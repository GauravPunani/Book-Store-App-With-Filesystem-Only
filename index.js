const express = require('express');
const app = express();
const books = require('./Routes/books');
const {getBooks}  = require('./Controllers/books')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use('/api/books', books);

app.get('/', async (req, res) => {
    const books = await getBooks();
    res.render('books/books', {books: books, name: "testing variable"});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
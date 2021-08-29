const fs = require('fs');
const path = require('path');
const { stringify } = require('querystring');
const booksPath = path.resolve(__dirname, '../database/books.json');
const { v4: uuidv4 } = require('uuid'); 

const getBooks = async () => {
    const booksFile = await fs.readFileSync(booksPath);
    const booksString = booksFile.toString()
    const booksObject = JSON.parse(booksString);
    return booksObject;
}

const getBook = async (bookId) => {
    const data = await fs.readFileSync(booksPath);
    const books = JSON.parse(data);
    const book = books.find(function(book){
        return book.id === bookId
    });
    return book;
}

const addBook = async (bookData) => {
    try{
        const data = await fs.readFileSync(booksPath);
        data = JSON.parse(data);
        data.push(bookData);

        // write to the file
        fs.writeFileSync(booksPath, data, (data, err) => {
            if(err) throw err;
            return true;
        });

    }
    catch{
        return false;
    }
}

const deleteBook = async (bookId) => {
    try{
        const data = await fs.readFileSync(booksPath);
        const books = JSON.parse(data);

        const newBooks = books.filter(function(book){
            return book.id != bookId;
        });

        stringify_books = JSON.stringify(newBooks);

        fs.writeFileSync(booksPath, stringify_books);
        return true;
    }
    catch(error){
        return false;
    }
}

const updateBook = async (bookData) => {

    try{

        // get all books
        const data = await fs.readFileSync(booksPath);
        const books = JSON.parse(data);

        // find the index of the book which needs to be updated
        const bookIndex = books.findIndex(function(book){
            return book.id === bookData.id;
        });
        
        // update the book with new data
        books[bookIndex] = bookData;
        const bookString = JSON.stringify(books);

        // update the books database
        fs.writeFileSync(booksPath, bookString);
        return books[bookIndex];
    }
    catch(error){
        return false;
    }

}

const createBook = async (bookData) => {
    try{
        const bookID = uuidv4();
        bookData.id = bookID;

        const data = fs.readFileSync(booksPath);
        const books = JSON.parse(data);
        
        books.push(bookData);
        const newBooksString = JSON.stringify(books);
        
        fs.writeFileSync(booksPath, newBooksString);
        
        return bookData;
    }
    catch(error){
        return false;
    }
    
}

module.exports = {
    getBooks,
    getBook,
    addBook,
    deleteBook,
    updateBook,
    createBook
}
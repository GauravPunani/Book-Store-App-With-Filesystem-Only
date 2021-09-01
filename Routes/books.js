const express = require('express');
const fs = require('fs');
const Joi = require('joi');
const booksPath = '../database/books.json';
const path = require('path');
const { getBooks, createBook, getBook, addBook, deleteBook, updateBook, serachBook } = require('../Controllers/books');
const {createBookSchema, updateBookSchema} = require('../validationSchemas/books');



const router = express.Router();

router.get('/', async (req, res) => {
    const books = await getBooks();
    res.json(books);
});

router.get('/search/:searchkeyword', async (req,res) => {
    const searchKeyword = req.params.searchkeyword;
    const books = await serachBook(searchKeyword);
    res.json(books);
});

router.get('/:id', async (req, res) => {
    const bookId = req.params.id;
    const bookData = await getBook(bookId);
    if(bookData)
        res.json(bookData);
    else
        res.sendStatus(404);
        res.send('not found');
});

router.post('/', async (req, res) => {
    const { body } = req;
    const validationResults = createBookSchema.validate(body);

    const {value, error} = validationResults;
    if(error){
        res.sendStatus(422).json({
            message: "invalid request",
            status: "error",
        })
    }
    else{
        const bookData = await createBook(body);
        
        if(bookData){
            res.status(201);
            res.json({
                status: "success",
                messaage: "Book Created Successfully"
            });
        }
        else{
            res.sendStatus(500).json({
                message: "something went wrong, please try again later"
            });
        }
    }
});

router.put('/', async (req, res) => {

    const { body } = req;
    const validationResults = updateBookSchema.validate(body);

    const {value, error} = validationResults;

    if(error){
        res.status(422);
        res.json({
            status: "error",
            message: "invalid request",
        });
    }
    else{
        const bookData = await updateBook(body);

        if(bookData){
            await req.flash('success', 'Book updated successfully');
            res.status(200);
            res.json({
                message: "book updated successfully",
                status: "success",
            });
        }
        else{
            res.status(500);
            res.json({
                message: "something went wrong"
            })
        }
    }
});

router.delete('/:id', async (req, res) => {
    const bookId = req.params.id;
    const response = await deleteBook(bookId);

    if(response){
        res.status(200);
        res.json({
            status: "success",
            message: "book deleted"
        });
    }
    else{
        res.status(400);
        res.json({
            status: 'error',
            message: 'No book found'
        })
    }

});

module.exports = router;
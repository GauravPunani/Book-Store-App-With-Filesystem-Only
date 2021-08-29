const express = require('express');
const fs = require('fs');
const Joi = require('joi');
const booksPath = '../database/books.json';
const path = require('path');
const { getBooks, createBook, getBook, addBook, deleteBook, updateBook } = require('../Controllers/books');
const {createBookSchema, updateBookSchema} = require('../validationSchemas/books');

const router = express.Router();

router.get('/', async (req, res) => {
    const books = await getBooks();
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
            data: error 
        })
    }
    else{
        const bookData = await createBook(body);
        
        if(bookData){
            res.status(201);
            res.json({
                message: "success",
                data: bookData
            })
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
        return res.sendStatus(422).json({
            message: "invalid request",
            data: error 
        })
    }
    else{
        const bookData = await updateBook(body);

        if(bookData){

            res.status(200);
            res.json({
                message: "book updated successfully",
                data: bookData
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
        res.sendStatus(200);
        res.send('file deleted successfully');
    }
    else{
        res.sendStatus(400);
        res.send('no book found');
    }

});

module.exports = router;
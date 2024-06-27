const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const books = require('./books')

const app = express();

app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));
app.use(cors());



app.get('/books', (req,res) => {
    res.send(books)
})

app.get('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const getBook = books.find((book) => book.id === id)

    res.json(getBook)
})

app.post('/books', (req,res) => {
    const {id, title, author, year} = req.body

    const newBook = books.push({id: id, title: title, author: author, year: year}) 

    res.json({msg: "Libro creado correctamente"})
})

app.put('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const {title, author, year} = req.body

    const getBook = books.find((book) => book.id === id)

    getBook.title = title
    getBook.author = author
    getBook.year = year

    res.json({msg: "datos actualizados"})
})

app.delete('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const getBook = books.find((book) => book.id === id)

    const indexBook = books.indexOf(getBook)
    const deleteBook = books.splice(indexBook, 1);

    res.json({msg: 'Libro eliminado'})
})


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
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
    res.send(libros)
})

app.get('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const getBook = books.find((book) => book.id === id)

    res.json(getBook)
})


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const books = require('./books');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(morgan('dev'));
app.use(cors());



app.get('/books', (req,res) => {
    res.send(books)
    if(!books) {
        return res.status(404).json({msg: "Libro no encontrado"})
    }
})

app.get('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const getBook = books.find((book) => book.id === id)

    if(!getBook) {
        return res.status(404).json({msg: "Libro no encontrado"})
    }

    res.json(getBook)
})

app.post('/books', (req,res) => {
    const {id, title, author, year} = req.body

    const newBook = books.push({id: id, title: title, author: author, year: year}) 

    if(newBook === req.body) {
        return res.json({msg: "El libro ya existe"})
    }

    res.json({msg: "Libro creado correctamente"})
})

app.put('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const {title, author, year} = req.body

    const getBook = books.find((book) => book.id === id)

    if(!getBook) {
        return res.status(404).json({msg: "El libro no existe"})
    } 

    getBook.title = title
    getBook.author = author
    getBook.year = year

    res.json({msg: "datos actualizados"})
})

app.delete('/books/:id', (req,res) => {
    const id = parseInt(req.params.id)

    const getBook = books.find((book) => book.id === id)

    if(!getBook) {
        return res.status(404).json({msg: "El libro no existe"})
    }

    const indexBook = books.indexOf(getBook)
    const deleteBook = books.splice(indexBook, 1);

    res.json({msg: 'Libro eliminado'});
})


app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
const Book = require('../models/Book')
const creatNewBook = async (req, res) => {
    const { name, author, subject, category, notes, image } = req.body
    if (!name || !author || !subject || !category) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const book = await Book.create({ name, author, subject, category, notes, image })
    if (book) {
        return res.status(201).json({ message: 'new book created' })
    }
    res.status(400).json({ message: 'invalid book' })

}
const getAllBooks = async (req, res) => {
    const books = await Book.find().lean()
    if (!books?.length) {
        return res.status(400).json({ message: 'No books found' })
    }
    res.json(books)
}
const getBookById = async (req, res) => {
    const { id } = req.params
    const book = await Book.findById(id).lean()
    if (!book) {
        return res.status(400).json({ message: 'Book not found' })
    }
    res.json(book)
}
const getBookByName = async (req, res) => {
    const { name } = req.params
    const book = await Book.find({name}).lean()
    if (!book || book.length === 0) {
        return res.status(400).json({ message: 'book not exists' })
    }
    res.json(book)
}
const getBookByCategory = async (req, res) => {
    const { category } = req.params
    const book = await Book.find({category}).lean()
    if (!book) {
        return res.status(400).json({ message: 'book not exists' })
    }
    res.json(book)
}
const getBookBySubject = async (req, res) => {
    const { subject } = req.params
    const book = await Book.find({subject}).lean()
    if (!book) {
        return res.status(400).json({ message: 'book not exists' })
    }
    res.json(book)
}
const getBookByAuthor = async (req, res) => {
    const { author } = req.params
    const book = await Book.find({author}).lean()
    if (!book) {
        return res.status(400).json({ message: 'book not exists' })
    }
    res.json(book)
}
const updateBook = async (req, res) => {
    const { id, name, author, subject, category, notes, image } = req.body
    if (!id && (!name || !author, !subject, !category, !notes, !image)) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const book = await Book.findById(id).exec()
    if (!book) {
        return res.status(400).json({ message: 'book not found' })
    }
    book.name = name || book.name
    book.author = author || book.author
    book.subject = subject || book.subject
    book.category = category || book.category
    book.notes = notes || book.notes
    book.image = image || book.image

    const updatedBook = await book.save()
    res.json(`The details of '${updatedBook.name}' updated`)
}
const deleteBook = async(req,res)=>{
    const { id } = req.params
    const book = await Book.findById(id).exec()
    if (!book) {
        return res.status(400).json({ message: 'book not found' })
    }
    const result = await book.deleteOne()
    res.json(`'${book.name}' deleted`)
}
module.exports = {
    creatNewBook,
    getAllBooks,
    getBookById,
    getBookByName,
    getBookByCategory,
    getBookBySubject,
    getBookByAuthor,
    updateBook,
    deleteBook
}
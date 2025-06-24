const BookNeeded = require("../models/BookNeeded")
const creatNewBookNeeded = async (req, res) => {
    const { name, author, price } = req.body
    const bookNeeded = await BookNeeded.create({ name, author, price })
    if (bookNeeded) {
        return res.status(201).json({ message: 'new bookNeeded created' })
    }
    res.status(400).json({ message: 'invalid bookNeeded' })

}
const getAllBookNeeded = async (req, res) => {
    const booksNeeded = await BookNeeded.find().lean()
    res.json(booksNeeded)
}
const getBookNeededById = async (req, res) => {
    const { id } = req.params
    const bookNeeded = await BookNeeded.findById(id).lean()
    if (!bookNeeded) {
        return res.status(400).json({ message: 'bookNeeded not found' })
    }
    res.json(bookNeeded)
}
const getBookNeededByName = async (req, res) => {
    const { name } = req.params
    const bookNeeded = await BookNeeded.find({ name }).lean()
    if (!bookNeeded || bookNeeded.length === 0) {
        return res.status(400).json({ message: 'bookNeeded not exists' })
    }
    res.json(bookNeeded)
}
const getBookNeededByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query
    if (!minPrice || !maxPrice) {
        return res.status(400).json({ message: 'minPrice and maxPrice are required' })
    }
    const booksNeeded = await BookNeeded.find({
        price: { $gte: minPrice, $lte: maxPrice }
    }).lean()
    if (!booksNeeded || booksNeeded.length === 0) {
        return res.status(400).json({ message: 'No booksNeeded found in this price range' })
    }
    res.json(booksNeeded)
}
const updateBookNeeded = async (req, res) => {
    const { id, name, author, price } = req.body
    if (!id && (!name || !author || !price)) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const bookNeeded = await BookNeeded.findById(id).exec()
    if (!bookNeeded) {
        return res.status(400).json({ message: 'bookNeeded not found' })
    }
    bookNeeded.name = name || bookNeeded.name
    bookNeeded.author = author || bookNeeded.author
    bookNeeded.price = price || bookNeeded.price

    const updateBookNeeded = await bookNeeded.save()
    res.json(`The details of '${updateBookNeeded.name}' updated`)
}
const deleteBookNeeded = async (req, res) => {
    const { id } = req.params
    const bookNeeded = await BookNeeded.findById(id).exec()
    if (!bookNeeded) {
        return res.status(400).json({ message: 'bookNeeded not found' })
    }
    const result = await bookNeeded.deleteOne()
    res.json(`'${bookNeeded.name}' deleted`)
}
module.exports = {
    creatNewBookNeeded,
    getAllBookNeeded,
    getBookNeededById,
    getBookNeededByName,
    getBookNeededByPriceRange,
    updateBookNeeded,
    deleteBookNeeded
}
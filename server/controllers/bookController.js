const Book = require('../models/Book')
const creatNewBook = async (req, res) => {
    try {
        const { name, code, author, subject, category, notes, donor } = req.body
        const image = req.file ? req.file.filename : null
        
        console.log('Received book data:', { name, code, author, subject, category, notes, donor, image });
        
        if (!name || !code || !author || !subject || !category) {
            return res.status(400).json({ message: 'Required fields are missing' })
        }
 
        const existingBook = await Book.findOne({ code: parseInt(code) })
        if (existingBook) {
            return res.status(409).json({ message: 'Book with this code already exists' })
        }

        const book = await Book.create({
            name, 
            code: parseInt(code), 
            author, 
            subject, 
            category, 
            notes: notes || '', 
            image, 
            donor: donor || "לא נתרם" 
        })
        
        console.log('Book created successfully:', book);
        
        if (book) {
            return res.status(201).json({ 
                message: 'New book created successfully',
                book: book
            })
        }
        
        res.status(400).json({ message: 'Invalid book data' })
    } catch (error) {
        console.error('Error creating book:', error)
        res.status(500).json({ 
            message: 'Internal server error', 
            error: error.message 
        })
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().lean()
        if (!books?.length) {
            return res.status(200).json([])
        }
        res.json(books)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id).lean()
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching book:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookByName = async (req, res) => {
    try {
        const { name } = req.params
        const book = await Book.find({ name: new RegExp(name, 'i') }).lean()
        if (!book || book.length === 0) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching book:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookByCode = async (req, res) => {
    try {
        const { code } = req.params
        const book = await Book.find({ code: parseInt(code) }).lean()
        if (!book || book.length === 0) {
            return res.status(404).json({ message: 'Book not found' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching book:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const book = await Book.find({ category }).lean()
        if (!book || book.length === 0) {
            return res.status(404).json({ message: 'No books found in this category' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookBySubject = async (req, res) => {
    try {
        const { subject } = req.params
        const book = await Book.find({ subject: new RegExp(subject, 'i') }).lean()
        if (!book || book.length === 0) {
            return res.status(404).json({ message: 'No books found with this subject' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getBookByAuthor = async (req, res) => {
    try {
        const { author } = req.params
        const book = await Book.find({ author: new RegExp(author, 'i') }).lean()
        if (!book || book.length === 0) {
            return res.status(404).json({ message: 'No books found by this author' })
        }
        res.json(book)
    } catch (error) {
        console.error('Error fetching books:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const updateBook = async (req, res) => {
  try {
    const { id, name, code, author, subject, category, notes, donor } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!id) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.name = name || book.name;
    book.code = code || book.code;
    book.author = author || book.author;
    book.subject = subject || book.subject;
    book.category = category || book.category;
    book.notes = notes || book.notes;
    book.donor = donor || book.donor;
    if (image) book.image = image;

    const updated = await book.save();
    res.json({ message: `Book '${updated.name}' updated successfully`, book: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id).exec()
        if (!book) {
            return res.status(404).json({ message: 'Book not found' })
        }
        
        await book.deleteOne()
        res.json({ message: `'${book.name}' deleted successfully` })
    } catch (error) {
        console.error('Error deleting book:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    creatNewBook,
    getAllBooks,
    getBookById,
    getBookByName,
    getBookByCode,
    getBookByCategory,
    getBookBySubject,
    getBookByAuthor,
    updateBook,
    deleteBook
}
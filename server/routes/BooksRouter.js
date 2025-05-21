const express = require("express")
const BooksRouter = express.Router()
const bookController= require("../controllers/bookController")
BooksRouter.post("/",bookController.creatNewBook)
BooksRouter.get("/", bookController.getAllBooks)
BooksRouter.get("/:id", bookController.getBookById)
BooksRouter.get("/byName", bookController.getBookByName)
BooksRouter.get("/byCategory", bookController.getBookByCategory)
BooksRouter.get("/byAuthor", bookController.getBookByAuthor)
BooksRouter.put("/",bookController.updateBook)
BooksRouter.delete("/",bookController.deleteBook)

module.exports = BooksRouter
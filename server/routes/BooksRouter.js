const express = require("express")
const BooksRouter = express.Router()
const bookController= require("../controllers/bookController")
BooksRouter.post("/",bookController.creatNewBook)
BooksRouter.get("/", bookController.getAllBooks)
BooksRouter.get("/id/:id", bookController.getBookById)
BooksRouter.get("/name/:name", bookController.getBookByName)
BooksRouter.get("/category/:category", bookController.getBookByCategory)
BooksRouter.get("/subject/:subject", bookController.getBookBySubject)
BooksRouter.get("/author/:author", bookController.getBookByAuthor)
BooksRouter.put("/",bookController.updateBook)
BooksRouter.delete("/:id",bookController.deleteBook)

module.exports = BooksRouter
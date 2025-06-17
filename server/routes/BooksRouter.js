const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")
const BooksRouter = express.Router()
const bookController= require("../controllers/bookController")
const upload = require('../middleware/uploadImage');

BooksRouter.post("/", upload.single("image"), bookController.creatNewBook)
BooksRouter.get("/", bookController.getAllBooks)
BooksRouter.get("/id/:id", bookController.getBookById)
BooksRouter.get("/name/:name", bookController.getBookByName)
BooksRouter.get("/code/:code", bookController.getBookByCode)
BooksRouter.get("/category/:category", bookController.getBookByCategory)
BooksRouter.get("/subject/:subject", bookController.getBookBySubject)
BooksRouter.get("/author/:author", bookController.getBookByAuthor)
BooksRouter.put("/", upload.single("image"), bookController.updateBook)
BooksRouter.delete("/:id", bookController.deleteBook)

module.exports = BooksRouter
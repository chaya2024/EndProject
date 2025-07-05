const verifyJWT = require("../middleware/verifyJWT")
const express = require("express")
const BookNeededRouter = express.Router()
const bookNeededController= require("../controllers/bookNeededController")
BookNeededRouter.post("/",verifyJWT, bookNeededController.creatNewBookNeeded)
BookNeededRouter.get("/", bookNeededController.getAllBookNeeded)
BookNeededRouter.get("/id/:id", bookNeededController.getBookNeededById)
BookNeededRouter.get("/name/:name", bookNeededController.getBookNeededByName)
BookNeededRouter.get("/price", bookNeededController.getBookNeededByPriceRange)
BookNeededRouter.put("/",verifyJWT, bookNeededController.updateBookNeeded)
BookNeededRouter.delete("/:id",verifyJWT, bookNeededController.deleteBookNeeded)

module.exports = BookNeededRouter
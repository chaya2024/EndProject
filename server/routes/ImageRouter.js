const express = require("express");
const BooksRouter = express.Router();
const bookController = require("../controllers/bookController");
const upload = require("../middleware/uploadImage");

BooksRouter.post("/", upload.single("image"), bookController.creatNewBook);
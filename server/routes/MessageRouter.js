const verifyJWT =require('../middleware/verifyJWT')
const express = require("express")
const MessageRouter = express.Router()
const messageController= require("../controllers/messageController")
MessageRouter.post("/", messageController.creatNewMessage)
MessageRouter.get("/",verifyJWT, messageController.getAllMessages)
MessageRouter.get("/id/:id",verifyJWT, messageController.getMessageById)
MessageRouter.get("/subject/:subject",verifyJWT, messageController.getmessageBySubject)
MessageRouter.delete("/:id",verifyJWT,messageController.deleteMessage)

module.exports = MessageRouter 
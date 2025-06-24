const verifyJWT =require('../middleware/verifyJWT')
const express = require("express")
const MessageRouter = express.Router()
const messageController= require("../controllers/messageController")
MessageRouter.post("/",messageController.creatNewMessage)
MessageRouter.get("/",  messageController.getAllMessages)
MessageRouter.get("/id/:id", messageController.getMessageById)
MessageRouter.get("/subject/:subject", messageController.getmessageBySubject)
MessageRouter.delete("/:id",messageController.deleteMessage)

module.exports = MessageRouter 
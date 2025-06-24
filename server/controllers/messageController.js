const Message = require("../models/Message")
const creatNewMessage = async (req, res) => {
    const { name, subject, detail, numberPhone, notes } = req.body
    const message = await Message.create({ name, subject, detail, numberPhone, notes })
    if (message) {
        return res.status(201).json({ message: 'new message created' })
    }
    res.status(400).json({ message: 'invalid message' })
}
const getAllMessages = async (req, res) => {
    const message = await Message.find().lean()
    res.json(message)
}
const getMessageById = async (req, res) => {
    const { id } = req.params
    const message = await Message.findById(id).lean()
    if (!message) {
        return res.status(400).json({ message: 'message not found' })   
    }
    res.json(message)
}
const getmessageBySubject = async (req, res) => {
    const { subject } = req.params
    const message = await Message.find({ subject }).lean()
    if (!message || message.length === 0) {
        return res.status(400).json({ message: 'message not exists' })
    }
    res.json(message)
}
const updateMessage = async (req, res) => {
    const { id, name, subject, detail, numberPhone, notes } = req.body
    if (!id && (!name || !subject || !detail || !numberPhone || !notes)) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const message = await Message.findById(id).exec()
    if (!message) {
        return res.status(400).json({ message: 'message not found' })
    }
    message.name = name || message.name
    message.subject = subject || message.subject
    message.detail = detail || message.detail
    message.numberPhone = numberPhone || message.numberPhone
    message.notes = notes || message.notes

    const updatedMessage = await message.save()
    res.json(`The details of '${updatedMessage.name}' updated`)
}
const deleteMessage = async (req, res) => {
    const { id } = req.params
    const message = await Message.findById(id).exec()
    if (!message) {
        return res.status(400).json({ message: 'message not found' })
    }
    const result = await message.deleteOne()
    res.json(`'${message.name}' deleted`)
}
module.exports = {
    creatNewMessage,
    getAllMessages,
    getMessageById,
    getmessageBySubject,
    updateMessage,
    deleteMessage
}
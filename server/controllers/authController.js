const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const register = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(400).json({ message: 'name, password are required' })
    }
    const duplicate = await User.findOne({ name }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate name" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    res.send(hashedPassword);

    const userObject = { name, password: hashedPassword}
    const user = await User.create(userObject)
    if (user) { // Created
        return res.status(201).json({
            message: `New user ${user.name} created`,
            user
        })
    } else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}
const login = async (req, res) => {
    const { name, password } = req.body
    if (!name || !password) {
        return res.status(400).json({ message: 'name and password are required' })
    }
    const users = await User.find().lean()
    if (!users?.length) {
        return res.status(404).json({ message: 'No users found' })
    }
    const foundUser = await User.findOne({ name }).lean()
    const match = await bcrypt.compare(password, foundUser.password)

    if (!foundUser || match) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userInfo= {_id:foundUser._id,name:foundUser.name}
    const accessToken = jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
    res.send("Logged In")
}
module.exports = { register, login }
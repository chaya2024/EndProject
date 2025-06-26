const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'name and password are required' })
    }
    const foundUser = await User.findOne({ username }).lean()
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const userInfo = { _id: foundUser._id, name: foundUser.name, roles: foundUser.roles, username: foundUser.username, email: foundUser.email, phone: foundUser.phone }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
    // const users = await User.find().lean()
    // if (!users?.length) {
    //     return res.status(404).json({ message: 'No users found' })
    // }

    // if (!foundUser || !match) {
    //     return res.status(401).json({ message: 'Unauthorized' })
    // }

}
const register = async (req, res) => {
    const { name, username, password, email, phone } = req.body
    if (!name || !password || !username) {
        return res.status(400).json({ message: 'name, password are required' })
    }
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const userObject = { name, username, password: hashedPassword, email, phone }
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({ message: `New user ${user.name} created` })
    }
    else {
        return res.status(400).json({ message: 'Invalid user received' })
    }
}

module.exports = { register, login }
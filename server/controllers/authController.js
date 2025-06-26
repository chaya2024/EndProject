const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' })
    }
    
    try {
        const foundUser = await User.findOne({ username }).lean()
        if (!foundUser) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        
        const match = await bcrypt.compare(password, foundUser.password)
        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }
        
        const userInfo = { 
            _id: foundUser._id, 
            name: foundUser.name, 
            roles: foundUser.roles, 
            username: foundUser.username, 
            email: foundUser.email, 
            phone: foundUser.phone 
        }
        
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
        
        res.json({ 
            accessToken: accessToken,
            user: {
                username: foundUser.username,
                name: foundUser.name,
                roles: foundUser.roles
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const register = async (req, res) => {
    const { name, username, password, email, phone } = req.body
    
    if (!name || !password || !username) {
        return res.status(400).json({ message: 'Name, username, and password are required' })
    }
    
    try {
        const duplicate = await User.findOne({ username: username }).lean()
        if (duplicate) {
            return res.status(409).json({ message: "Username already exists" })
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const userObject = { name, username, password: hashedPassword, email, phone }
        const user = await User.create(userObject)
        
        if (user) {
            return res.status(201).json({ 
                message: `New user ${user.name} created successfully`,
                user: {
                    username: user.username,
                    name: user.name,
                    roles: user.roles
                }
            })
        } else {
            return res.status(400).json({ message: 'Invalid user data received' })
        }
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { register, login }
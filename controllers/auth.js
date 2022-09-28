import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'


async function register(req, res) {
  try {
    const user = await User.create(req.body)
    return res.status(201).json({ message: `Welcome ${user.username}` })
  } catch (err) {
    console.log(err)
  }
}

async function login(req, res, next) {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '48 hours' })
    
    return res.status(202).json({
      message: `Welcome Back ${userToLogin.username}!`,
      token, 
    })
  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
}
// const express = require('express')
// const authRouter = express.Router()
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

// //Signup
// authRouter.post('/server', (req, res, next) => {
//     User.findOne(
//         {username: req.body.username},
//         (err, user) => {
//             if(err) {
//                 res.status(500)
//                 return res.send(err)
//             }
//             if(user) {
//                 res.status(403)
//                 return res.send( new Error('This Username is already Taken'))
//             }
//             const newUser = new User(req.body)
//             newUser.save((err, savedUser) => {
//                 if(err) {
//                     res.status(403)
//                     return res.send(err)
//                 }
//                 const token = jwt.sign(savedUser.hidePersonal(),process.env.SECRET)
//                 return res.status(200).send({token, user: savedUser.hidePersonal()})
//             })

//         }

//     )
// })

// //Login
// authRouter.post('/', (req, res, next) => {
//     User.findOne(
//         {username: req.body.username.toLowercase()},
//         (err, user) => {
//             if(err) {
//                 res.status(500)
//                 return next(err)
//             }
//             if(!user) {
//                 res.status(500)
//                 return res.send('No user exists')
//             }
//             user.checkPassword(req.body.password, (err, isMatch) => {
//                 if(err) {
//                     res.status(500)
//                     return res.send('USERNAME or PASSWORD incorrect')
//                 }
//                 if(!isMatch) {
//                     res.status(500)
//                     return res.send('USERNAME or PASSWORD  is incorrect')
//                 }
//                 const token = jwt.sign(user.hidePersonal(), process.env.SECRET)
//                 return res.status(200).send({token, user: user.hidePersonal()})
//             })
//         }
//     )
// })

// module.exports = authRouter
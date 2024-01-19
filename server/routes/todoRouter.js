const express = require('express')
const todoRouter = express.Router()
const ToDo = require('../models/todo')
const todo = require('../models/todo')
require('dotenv').config()


//Get All
todoRouter.get('/', async (req, res, next) => {
    try{
        const response = await ToDo.find()
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})


//Get Users ToDo
todoRouter.get('/:userId', async (req, res, next) => {
    try{
        const response = await ToDo.find(
          { userId: req.params.username }
        )
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})

//Post ToDo
todoRouter.post('/:userId', async (req, res, next) => {
    console.log('req', req)
    req.body.userId = req.params.userId
    const newToDo = new ToDo(req.body)
    try{
       const todo =  await newToDo.save()
       res.status(200).send({todo})
       console.log('res', res)
    }
    catch(err) {
        next(err)
    }
})



// todoRouter.post('/:userId', (req, res, next) => {
// //    req.body.user = req.auth._id
//    const newTodo = new ToDo(req.body)
//    newTodo.save((err, savedTodo) => {
//     if(err) {
//         res.status(500)
//         return next(err)
//     }
//     return res.status(200).send(savedTodo)
//    })
// })

todoRouter.delete('/:userId', async (req, res, next) => {
    try{
        const response = await ToDo.findOneAndDelete({ userId: req.params.userId})
        console.log(response)
        res.status(200).send('Item was deleted')
    }
    catch(err) {
        console.log(err)
        res.status(500)
        next(err)
    }
})

// todoRouter.delete('/:userId', (req, res, next) => {
//     ToDo.findOneAndDelete(
//         { _id: req.params.userId },
//         (err, deletedToDo) => {
//             if(err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send('Item has Been Deleted')
//         }
//     )
// })

todoRouter.put('/:userId', async (req, res, next) => {
    try {
        const response = await ToDo.findOneAndUpdate(
            {_id: req.params.userId},
            req.body,
            {new: true}
        )
        res.status(200).send(response)
    }
    catch(err) {
        res.status(500)
        next(err)
    }
})
module.exports = todoRouter
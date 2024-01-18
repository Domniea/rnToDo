const express = require('express')
const todoRouter = express.Router()
const ToDo = require('../models/todo')
const todo = require('../models/todo')
require('dotenv').config()


// todoRouter.get('/', (req, res, next) => {
//     const response = ToDo.find(
//         (err, allToDo) => {
//             if(err) {
//                 res.status(500)
//                 return next(err)
//             }
//             return res.status(200).send(allToDo)
//         }
//     )
// })

todoRouter.get('/', async (req, res, next) => {
    try{
        const response = await ToDo.find()
        console.log(response.data.todo)
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})

todoRouter.post('/:username', async (req, res, next) => {
    const newToDo = new ToDo(req.body)
    try{
       const todo =  await newToDo.save()
       console.log(todo)
       res.status(200).send({todo})
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
        const response = await ToDo.findOneAndDelete({ _id: req.params.userId})
        console.log(response)
        res.status(200).send('Item was deleted')
    }
    catch(err) {
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
        console.log(response)
        res.status(200).send(response)
    }
    catch(err) {
        res.status(500)
        next(err)
    }
})
module.exports = todoRouter
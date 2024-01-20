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
          { userId: req.params.userId }
        )
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})

//Post ToDo
todoRouter.post('/:userId', async (req, res, next) => {
    req.body.userId = req.params.userId
    const newToDo = new ToDo(req.body)
    try{
       const todo =  await newToDo.save()
       res.status(200).send({todo})
    }
    catch(err) {
        next(err)
    }
})

//Edit Todo
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

//Delete ToDo
todoRouter.delete('/:todoid', async (req, res, next) => {
    try{
        const response = await ToDo.findOneAndDelete({ _id: req.params.todoid})
        res.status(200).send('Item was deleted')
    }
    catch(err) {
        console.log(err)
        res.status(500)
        next(err)
    }
})


module.exports = todoRouter
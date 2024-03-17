const express = require('express')
const todoRouter = express.Router()
const ToDo = require('../models/todo')
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
todoRouter.get('/:username', async (req, res, next) => {
    try{
        const response = await ToDo.find(
          { username: req.params.username }
        )
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})

//Post ToDo
todoRouter.post('/:username', async (req, res, next) => {
    req.body.username = req.params.username
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
todoRouter.delete('/:todoId', async (req, res, next) => {
    try{
        const response = await ToDo.findOneAndDelete({ _id: req.params.todoId})
        res.status(200).send('Item was deleted')
    }
    catch(err) {
        console.log(err)
        res.status(500)
        next(err)
    }
})

//Delete List---test
todoRouter.delete('/:username/:listName', async (req, res, next) => {
    try{
        const response = await ToDo.find(
          { username: req.params.username, list: req.params.listName}
        )
        res.status(200).send(response)
    }
    catch(err) {
        next(err)
    }

})

//Delete All Users ToDO
todoRouter.delete(`/delete/:username`, async (req, res, next) => {
    try {
        const resData = await ToDo.deleteMany({username: req.params.username})
        res.status(200).send('All USER DATA DELETED')
    }
    catch(err) {
        console.log(err)
        res.status(500)
        next(err.response)
    }
})




module.exports = todoRouter
const express = require('express')
const app = express()
const { expressjwt: jwt } = require('express-jwt')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

mongoose.set('strictQuery', false)

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(`${process.env.MONGO_URI}`)
    .then(console.log('Connected to DB'))

app.use(
    cors({
      origin: ["https://rntodo-production.up.railway.app/"],
      methods: ["GET", "POST", "PUT","DELETE"],
      credentials: true,
      origin: true,
    })
  );

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server')
})

app.use('/todo', require('./routes/todoRouter'))

// app.get('/auth', (req, res) => {
//     console.log(req)
//     res.status(200)
// })

app.use((err, req, res, next) => {
        if(err.name === 'Unauthorized'){
            res.status(err.status)
        }
        return res.send({errMsg: err.message})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT: ${process.env.PORT}`)
})

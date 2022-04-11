const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')

mongoose.connect('mongodb://localhost:27017/ex1')

const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})


app.post('/createUser', async (req, res) => {
    try {
        const user = req.body
        const newUser = new UserModel(user)
        await newUser.save()
        res.json(user)
    } catch (err) {
        res.send(err.message)
    }

})

const PORT = process.env.PORT || 5000
app.listen(PORT, (req, res) => {
    console.log('Server is running port ' + PORT)
})
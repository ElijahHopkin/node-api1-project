// BUILD YOUR SERVER HERE
const express = require('express');
const Users = require('./users/model')

const server = express()

server.use(express.json())

server.post('/api/users', (req, res) => {
    const {name, bio} = req.body
    if(!name ||!bio){
        res.status(400).json({message: "Please provide name and bio for the user"})
    }else{
        Users.insert(req.body)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({message:"There was an error while saving the user to the database"})
        })
    }
})
    
server.get('/api/users', (req, res) => {
        Users.find()
        .then(result=> {
        res.json(result)
    })
    .catch(result => {
        res.status(500).json({message: "the users information could not be retrieved"})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.findById(id)
    .then(result => {
        if(result==null){
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }else{
            res.json(result)
        }
    })
    .catch(result => {
        res.status(500).json({message:'the userinformation could not be retrieved'})
    })
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    Users.remove(id)
    .then(result => {
        if(result==null){
            res.status(404).json({message:'The user with the specified ID does not exist'})
        }else{
            res.json(result)
        }
    })
    .catch(err => {
        res.status(500).json({message:'the userinformation could not be retrieved'})
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}

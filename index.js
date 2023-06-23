const express = require('express')
let bodyParser = require('body-parser')
require("./models")
const userController = require("./controllers/userController")
const actorController = require("./controllers/actorController")
const movieController = require("./controllers/movieController")
const customerController = require("./controllers/customerController")
const playerController = require("./controllers/playerController")

const app = express()

const port = 8000

app.use(bodyParser.json())

// app.post('/api/v1/user/create', userController.addUser)
// app.get('/api/v1/user/all', userController.getAllUsers)
// app.get('/api/v1/user/:userId', userController.getUser)
// app.put('/api/v1/user/:userId', userController.updateUser)
// app.post('/api/v1/user/add-hobbies', userController.addUserHobbies)
// app.get('/api/v1/user/hobbies/all', userController.getUserHobbies)
// app.delete('/api/v1/user/delete', userController.deleteUser)
// app.post('/api/v1/user/restore', userController.restoreUser)


// app.post('/api/v1/actor/create', actorController.createActor)
// app.post('/api/v1/actor/assign-movie', actorController.assignMovieToActor)

// app.post('/api/v1/movie/create', movieController.createMovie)

// app.post('/api/v1/customer/m-n-associations', customerController.mnAssociationsCustomer)

app.post('/api/v1/player/m2m2m', playerController.m2m2mAssociationsPlayer)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
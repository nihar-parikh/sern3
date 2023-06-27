const express = require('express')
let bodyParser = require('body-parser')
require("./models")
const userController = require("./controllers/userController")
const actorController = require("./controllers/actorController")
const movieController = require("./controllers/movieController")
const customerController = require("./controllers/customerController")
const playerController = require("./controllers/playerController")
const imageController = require("./controllers/imageController")
const videoController = require("./controllers/videoController")
const commentController = require("./controllers/commentController")
const tagController = require("./controllers/tagController")

const app = express()

const port = 8000

app.use(bodyParser.json())

app.post('/api/v1/user/create', userController.addUser)
app.get('/api/v1/user/all', userController.getAllUsers)
app.get('/api/v1/user/:userId', userController.getUser)
app.put('/api/v1/user/:userId', userController.updateUser)
app.post('/api/v1/user/add-hobbies', userController.addUserHobbies)
app.get('/api/v1/user/hobbies/all', userController.getUserHobbies)
app.delete('/api/v1/user/delete', userController.deleteUser)
app.post('/api/v1/user/restore', userController.restoreUser)


app.post('/api/v1/actor/create', actorController.createActor)
app.post('/api/v1/actor/assign-movie', actorController.assignMovieToActor)
//Association scopes ->useful for resusable logic
app.post('/api/v1/actor/details', actorController.getActorDetails)

app.post('/api/v1/movie/create', movieController.createMovie)

app.post('/api/v1/customer/m-n-associations', customerController.mnAssociationsCustomer)

app.post('/api/v1/player/m2m2m', playerController.m2m2mAssociationsPlayer)

app.post('/api/v1/player/m2m2m', playerController.m2m2mAssociationsPlayer)

app.post('/api/v1/image/add', imageController.addImage)
app.get('/api/v1/image/all', imageController.getAllImages)


app.post('/api/v1/video/add', videoController.addVideo)
app.get('/api/v1/video/all', videoController.getAllVideos)


app.post('/api/v1/comment/add', commentController.addComment)
app.get('/api/v1/comment/all', commentController.getAllComments)

app.post('/api/v1/tag/add', tagController.addTag)
app.get('/api/v1/tag/all', tagController.getAllTags)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})
import * as UserController from "./user/userController"
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', UserController.getUsers);

app.get('/users', UserController.getUser)

app.post('/users', UserController.postUser)

app.delete('/users', UserController.deleteUser)

app.put('/users', UserController.putUser)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
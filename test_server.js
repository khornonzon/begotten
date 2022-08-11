const express = require('express')
const app = express()
const port = 3000

let id = 0;
let users = [];
app.use(express.json())

app.get('/', (req, res) => {
  res.send('sap dvach')
})



app.get('/users', (req, res)=>{
    res.send('hello, user!');
})

app.post('/users', (req, res)=>{
    let user = req.body;
    user.id = id;
    users.push(user);
    id++;
    console.log(users);
    res.send('user added');
})

app.delete('/users', (req, res)=>{
    let deleteOnID = req.body.id;
    console.log(deleteOnID); 
    let index = users.findIndex(u => u.id==deleteOnID);
    console.log(index);
    switch (index){
        case -1:
            res.send("there is no user with such id");
            break;
        default:
            users.splice(index, 1);
            res.send("user deleted");
    }
    console.log(users);
})

app.put('/users', (req, res)=>{
    let deleteOnID = req.body.id;
    console.log(deleteOnID); 
    let index = users.findIndex(u => u.id==deleteOnID);
    console.log(index);
    switch (index){
        case -1:
            res.send("there is no user with such id");
            break;
        default:
            users[index].name=req.body.name;
            users[index].surname=req.body.surname;
            res.send("user with this id updated");
    }
    console.log(users);

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
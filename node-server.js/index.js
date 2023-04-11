console.log()
const express = require ( 'express');
const cors= require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  console.log('Connected!');

}

const detailsSchema = new mongoose.Schema({
    username: String,
    password: String
  });

const User = mongoose.model('User', detailsSchema);

const server= express();

server.use(cors());
server.use(bodyParser.json())
server.listen();
let port= 3000;

server.post('/demo',async (req,res)=>{
    let user = new User();
    user.username= req.body.username;
    user.password=req.body.passwd;
    const doc= await user.save();
    console.log(req.body);
    console.log(doc);
    // res.json(req.body);
    res.json(doc);
});

server.get('/demo',async (req,res)=>{
    const docs= await User.find({})
    res.json(docs);
});

server.listen(port,()=> {
console.log('Server started');
});
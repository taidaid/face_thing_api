const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Gr3@tDB',
      database : 'smart-brain'
    }
  });

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const imagePut = require('./controllers/image');

const app = express();

// knex.select('*').from('users').then(data => {
//     console.log(data)
// });

app.use(bodyParser.json());
app.use(cors());

//can use an advanced setup, the (req, res) are piped into the signIn.handleSignIn
//app.post ('/signin', signIn.handleSignIn( knex, bcrypt))

app.get('/', (req, res) => { res.send('it is working') })

app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt)})

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, knex, bcrypt) }) 

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, knex) })

app.put('/image', (req, res) => { imagePut.handleImagePut(req, res, knex) })

app.post('/imageurl', (req, res) => { imagePut.handleApiCall(req, res) })

//should set PORT equal to env variable in order to be dynamic
//replace hard-coded 3000 with PORT
// const PORT = process.env.PORT;

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})






/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user

*/
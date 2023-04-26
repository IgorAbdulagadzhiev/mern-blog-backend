import express from 'express';

import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';

import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';


const PORT = 4444;
const URL =
  'mongodb+srv://admin:wwwwww@cluster0.jnk34.mongodb.net/blog?retryWrites=true&w=majority';

mongoose
  .connect(URL)
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/posts',checkAuth, postCreateValidation, PostController.create);

// auth
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/auth/login', loginValidation, UserController.login);

app.post('/auth/register', registerValidation, UserController.register);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

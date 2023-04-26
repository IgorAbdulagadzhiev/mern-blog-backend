import express from 'express';

import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';

import checkAuth from './utils/checkAuth.js';

import * as userController from './controllers/UserController.js';

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

app.get('/auth/me', checkAuth, userController.getMe);

app.post('/auth/login', userController.login);

app.post('/auth/register', registerValidation, userController.register);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

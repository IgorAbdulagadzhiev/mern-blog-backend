import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations/auth.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { postCreateValidation } from './validations/post.js';

import { UserController, PostController } from './controllers/index.js';
import { PORT, URL } from './utils/consts.js';

mongoose
  .connect(URL)
  .then(() => console.log('DB ok'))
  .catch(() => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

// posts
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

// auth
app.get('/auth/me', checkAuth, UserController.getMe);
app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  '/auth/register',
  registerValidation,
  handleValidationErrors,
  UserController.register
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

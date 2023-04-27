import express from 'express';
import multer from 'multer';

import mongoose from 'mongoose';

import { PORT, URL } from '#utils/consts.js';
import { postsRouter, authRouter } from '#routes/index.js';

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

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});
app.use('/uploads', express.static('uploads'));
// posts
app.use('/posts', postsRouter);

// auth
app.use('/auth', authRouter);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Server OK');
});

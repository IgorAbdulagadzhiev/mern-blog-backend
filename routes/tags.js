import express from 'express';
import { PostController } from '#controllers/index.js';

const tagsRouter = express.Router();

tagsRouter.get('/', PostController.getLastTags);

export default tagsRouter;

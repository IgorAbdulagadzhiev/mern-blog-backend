import express from 'express';
import { PostController } from '#controllers/index.js';
import { checkAuth, handleValidationErrors } from '#utils/index.js';
import { postCreateValidation } from '#validations/index.js';

const postsRouter = express.Router();

postsRouter.get('/', PostController.getAll);
postsRouter.get('/:id', PostController.getOne);
postsRouter.post(
  '/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.create
);
postsRouter.delete('/:id', checkAuth, PostController.remove);
postsRouter.patch(
  '/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostController.update
);

export default postsRouter;

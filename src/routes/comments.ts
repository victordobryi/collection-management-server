import { Router } from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  deleteAllComments,
  deleteComment,
} from '../controllers/comments';

const router = Router();

router.post('/', createComment);

router.get('/', getAllComments);

router.get('/:id', getCommentById);

router.delete('/:id', deleteComment);

router.delete('/', deleteAllComments);

export default router;

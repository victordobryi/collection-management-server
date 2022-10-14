import { Router } from 'express';
import {
  createComment,
  getAllComments,
  getCommentById,
  deleteAllComments,
} from '../controllers/comments';

const router = Router();

router.post('/', createComment);

router.get('/', getAllComments);

router.get('/:id', getCommentById);

router.delete('/', deleteAllComments);

export default router;

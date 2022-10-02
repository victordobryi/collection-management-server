import { Router } from 'express';
import { createComment, getAllComments, getCommentById } from '../controllers/comments';

const router = Router();

router.post('/', createComment);

router.get('/', getAllComments);

router.get('/:id', getCommentById);

export default router;

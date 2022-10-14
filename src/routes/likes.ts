import { Router } from 'express';
import {
  updateLike,
  getLikeById,
  getAllLikes,
  deleteLike,
  deleteAllLikes,
  addLike,
} from '../controllers/likes';

const router = Router();

router.post('/', addLike);

router.get('/', getAllLikes);

router.get('/:id', getLikeById);

router.put('/:id', updateLike);

router.delete('/:id', deleteLike);

router.delete('/', deleteAllLikes);

export default router;

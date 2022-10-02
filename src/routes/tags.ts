import { Router } from 'express';
import { createTag, getAllTags, getTagById } from '../controllers/tags';

const router = Router();

router.post('/', createTag);

router.get('/', getAllTags);

router.get('/:id', getTagById);

export default router;

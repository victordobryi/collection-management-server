import { Router } from 'express';
import { getFullData } from '../controllers/fullData';

const router = Router();

router.get('/', getFullData);

export default router;

import { Router } from 'express';
import { getfullData } from '../controllers/fullData';

const router = Router();

router.get('/', getfullData);

export default router;

import { Router } from 'express';
import {
  updateCollection,
  getCollectionById,
  createCollection,
  deleteAllCollections,
  deleteCollection,
  getAllCollections,
} from '../controllers/collections';

const router = Router();

router.post('/', createCollection);

router.get('/', getAllCollections);

router.get('/:id', getCollectionById);

router.put('/:id', updateCollection);

router.delete('/:id', deleteCollection);

router.delete('/', deleteAllCollections);

export default router;

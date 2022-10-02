import { Router } from 'express';
import {
  updateItem,
  getItemById,
  getAllItems,
  deleteItem,
  deleteAllItems,
  createItem,
} from '../controllers/items';

const router = Router();

router.post('/', createItem);

router.get('/', getAllItems);

router.get('/:id', getItemById);

router.put('/:id', updateItem);

router.delete('/:id', deleteItem);

router.delete('/', deleteAllItems);

export default router;

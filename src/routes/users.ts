import { Router } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteAllUsers,
} from '../controllers/users';

const router = Router();

router.post('/', createUser);

router.get('/', getAllUsers);

router.get('/:id', getUserById);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.delete('/', deleteAllUsers);

export default router;

import { RequestHandler } from 'express';
import { v4 } from 'uuid';

import { Users } from '../models/users';

export const createUser: RequestHandler = async (req, res, next) => {
  const user = await Users.create({ ...req.body, id: v4() });
  return res.status(200).json({ message: 'User created successfully', data: user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser: Users | null = await Users.findByPk(id);
  await Users.destroy({ where: { id } });
  return res.status(200).json({ message: `User ${id} deleted successfully`, data: deletedUser });
};

export const deleteAllUsers: RequestHandler = async (req, res, next) => {
  await Users.destroy({ where: {}, truncate: true });
  return res.status(200).json({ message: `All Users deleted successfully` });
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const allUsers: Users[] = await Users.findAll();
  return res.status(200).json({ message: 'Users fetched successfully', data: allUsers });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const user: Users | null = await Users.findByPk(id);
  return res.status(200).json({ message: `User fetched successfully`, data: user });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Users.update({ ...req.body }, { where: { id } });
  const updatedUser: Users | null = await Users.findByPk(id);
  return res.status(200).json({ message: `User ${id} updated successfully`, data: updatedUser });
};

import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { Users } from '../models/users';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await Users.create({
      ...req.body,
      id: v4(),
      isBlocked: false,
      isAdmin: false,
    });
    return res.status(200).json({ message: 'User created successfully', data: user });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the user.',
      });
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser: Users | null = await Users.findByPk(id);
    if (!deletedUser) {
      res.status(404).send({
        message: `Not found User with id ${id}.`,
      });
    } else {
      await Users.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: `User ${id} deleted successfully`, data: deletedUser });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete User with id ' + id,
    });
  }
};

export const deleteAllUsers: RequestHandler = async (req, res, next) => {
  try {
    await Users.destroy({ where: {}, truncate: true });
    return res.status(200).json({ message: `All Users deleted successfully` });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while removing all users.',
      });
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers: Users[] = await Users.findAll();
    return res.status(200).json({ message: 'Users fetched successfully', data: allUsers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving users.',
      });
  }
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user: Users | null = await Users.findByPk(id);
    if (!user) {
      res.status(404).send({
        message: `Not found User with id ${id}.`,
      });
    } else {
      return res.status(200).json({ message: `User fetched successfully`, data: user });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving User with id ' + id,
    });
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedUser: Users | null = await Users.findByPk(id);
    if (!updatedUser) {
      res.status(404).send({
        message: `Not found User with id ${id}.`,
      });
    } else {
      await Users.update({ ...req.body }, { where: { id } });
      const newUser: Users | null = await Users.findByPk(id);
      return res.status(200).json({ message: `User fetched successfully`, data: newUser });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error updating User with id ' + id,
    });
  }
};

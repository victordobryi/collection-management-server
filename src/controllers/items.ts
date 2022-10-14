import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { Items } from '../models/items';
import { Likes } from '../models/likes';

export const createItem: RequestHandler = async (req, res, next) => {
  try {
    const itemId = v4();
    const item = await Items.create({
      ...req.body,
      id: itemId,
    });
    const like = await Likes.create({
      likedUsers: '',
      id: v4(),
      count: 0,
      postId: itemId,
    });
    return res.status(200).json({ message: 'Item created successfully', data: { item, like } });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the item.',
      });
  }
};

export const deleteItem: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedItem: Items | null = await Items.findByPk(id);
    if (!deletedItem) {
      res.status(404).send({
        message: `Not found Item with id ${id}.`,
      });
    } else {
      await Items.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: `Item ${id} deleted successfully`, data: deletedItem });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete Item with id ' + id,
    });
  }
};

export const deleteAllItems: RequestHandler = async (req, res, next) => {
  try {
    await Items.destroy({ where: {}, truncate: true });
    return res.status(200).json({ message: `All Items deleted successfully` });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while removing all items.',
      });
  }
};

export const getAllItems: RequestHandler = async (req, res, next) => {
  try {
    const allItems: Items[] = await Items.findAll();
    return res.status(200).json({ message: 'Items fetched successfully', data: allItems });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving items.',
      });
  }
};

export const getItemById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const item: Items | null = await Items.findByPk(id);
    if (!item) {
      res.status(404).send({
        message: `Not found Item with id ${id}.`,
      });
    } else {
      return res.status(200).json({ message: `Item fetched successfully`, data: item });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Item with id ' + id,
    });
  }
};

export const updateItem: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedItem: Items | null = await Items.findByPk(id);
    if (!updatedItem) {
      res.status(404).send({
        message: `Not found Item with id ${id}.`,
      });
    } else {
      await Items.update({ ...req.body }, { where: { id } });
      const newItem: Items | null = await Items.findByPk(id);
      return res.status(200).json({ message: `Item fetched successfully`, data: newItem });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error updating Item with id ' + id,
    });
  }
};

import { RequestHandler } from 'express';
import { v4 } from 'uuid';
import { Collections } from '../models/collections';

export const createCollection: RequestHandler = async (req, res, next) => {
  try {
    const collection = await Collections.create({
      ...req.body,
      id: v4(),
    });
    return res.status(200).json({ message: 'Collection created successfully', data: collection });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the collection.',
      });
  }
};

export const deleteCollection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCollection: Collections | null = await Collections.findByPk(id);
    if (!deletedCollection) {
      res.status(404).send({
        message: `Not found Collection with id ${id}.`,
      });
    } else {
      await Collections.destroy({ where: { id } });
      return res
        .status(200)
        .json({ message: `Collection ${id} deleted successfully`, data: deletedCollection });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete Collection with id ' + id,
    });
  }
};

export const deleteAllCollections: RequestHandler = async (req, res, next) => {
  try {
    await Collections.destroy({ where: {}, truncate: true });
    return res.status(200).json({ message: `All Collections deleted successfully` });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while removing all collections.',
      });
  }
};

export const getAllCollections: RequestHandler = async (req, res, next) => {
  try {
    const allCollections: Collections[] = await Collections.findAll();
    return res
      .status(200)
      .json({ message: 'Collections fetched successfully', data: allCollections });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving collections.',
      });
  }
};

export const getCollectionById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const collection: Collections | null = await Collections.findByPk(id);
    if (!collection) {
      res.status(404).send({
        message: `Not found Collection with id ${id}.`,
      });
    } else {
      return res.status(200).json({ message: `Collection fetched successfully`, data: collection });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Collection with id ' + id,
    });
  }
};

export const updateCollection: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedCollection: Collections | null = await Collections.findByPk(id);
    if (!updatedCollection) {
      res.status(404).send({
        message: `Not found Collection with id ${id}.`,
      });
    } else {
      await Collections.update({ ...req.body }, { where: { id } });
      const newCollection: Collections | null = await Collections.findByPk(id);
      return res
        .status(200)
        .json({ message: `Collection fetched successfully`, data: newCollection });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error updating Collection with id ' + id,
    });
  }
};

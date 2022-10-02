import { RequestHandler } from 'express';
import { Tags } from '../models/tags';

export const createTag: RequestHandler = async (req, res, next) => {
  try {
    const tag = await Tags.create({ ...req.body });
    return res.status(200).json({ message: 'Tag created successfully', data: tag });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the tag.',
      });
  }
};

export const getAllTags: RequestHandler = async (req, res, next) => {
  try {
    const allTags: Tags[] = await Tags.findAll();
    return res.status(200).json({ message: 'Tags fetched successfully', data: allTags });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving tags.',
      });
  }
};

export const getTagById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const tag: Tags | null = await Tags.findByPk(id);
    if (!tag) {
      res.status(404).send({
        message: `Not found Tag with id ${id}.`,
      });
    } else {
      return res.status(200).json({ message: `Tag fetched successfully`, data: tag });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Tag with id ' + id,
    });
  }
};

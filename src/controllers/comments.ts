import { RequestHandler } from 'express';
import { Comments } from '../models/comments';

export const createComment: RequestHandler = async (req, res, next) => {
  try {
    const comment = await Comments.create({ ...req.body });
    return res.status(200).json({ message: 'Comment created successfully', data: comment });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the comment.',
      });
  }
};

export const getAllComments: RequestHandler = async (req, res, next) => {
  try {
    const allComments: Comments[] = await Comments.findAll();
    return res.status(200).json({ message: 'Comments fetched successfully', data: allComments });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving comments.',
      });
  }
};

export const getCommentById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment: Comments | null = await Comments.findByPk(id);
    if (!comment) {
      res.status(404).send({
        message: `Not found Comment with id ${id}.`,
      });
    } else {
      return res.status(200).json({ message: `Comment fetched successfully`, data: comment });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Comment with id ' + id,
    });
  }
};

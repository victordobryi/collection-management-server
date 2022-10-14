import { RequestHandler } from 'express';
import { Likes } from '../models/likes';

export const addLike: RequestHandler = async (req, res, next) => {
  try {
    const item = await Likes.create({
      ...req.body,
    });
    return res.status(200).json({ message: 'Like added successfully', data: item });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while add the like.',
      });
  }
};

export const deleteLike: RequestHandler = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deletedItem: Likes | null = await Likes.findByPk(postId);
    if (!deletedItem) {
      res.status(404).send({
        message: `Not found Like with id ${postId}.`,
      });
    } else {
      await Likes.destroy({ where: { postId } });
      return res
        .status(200)
        .json({ message: `Like ${postId} deleted successfully`, data: deletedItem });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Could not delete Like with id ' + postId,
    });
  }
};

export const deleteAllLikes: RequestHandler = async (req, res, next) => {
  try {
    await Likes.destroy({ where: {}, truncate: true });
    return res.status(200).json({ message: `All Likes deleted successfully` });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while removing all likes.',
      });
  }
};

export const getAllLikes: RequestHandler = async (req, res, next) => {
  try {
    const allLikes: Likes[] = await Likes.findAll();
    return res.status(200).json({ message: 'Likes fetched successfully', data: allLikes });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving likes.',
      });
  }
};

export const getLikeById: RequestHandler = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const like: Likes | null = await Likes.findByPk(postId);
    if (!like) {
      res.status(404).send({
        message: `Not found Like with id ${postId}.`,
      });
    } else {
      return res.status(200).json({ message: `Like fetched successfully`, data: like });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error retrieving Like with id ' + postId,
    });
  }
};

export const updateLike: RequestHandler = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const updatedItem: Likes | null = await Likes.findByPk(postId);
    if (!updatedItem) {
      res.status(404).send({
        message: `Not found Like with id ${postId}.`,
      });
    } else {
      await Likes.update({ ...req.body }, { where: { Likes } });
      const newLike: Likes | null = await Likes.findByPk(postId);
      return res.status(200).json({ message: `Item fetched successfully`, data: newLike });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Error updating Item with id ' + postId,
    });
  }
};

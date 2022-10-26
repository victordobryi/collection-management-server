import { RequestHandler } from 'express';
import { Comments } from '../models/comments';
import { Items } from '../models/items';
import { Likes } from '../models/likes';

interface FullData {
  data: Items | null;
  likes: Likes | null;
  comments: Comments[];
}

export const getfullData: RequestHandler = async (req, res, next) => {
  try {
    const allItems: Items[] = await Items.findAll();
    const fullData: FullData[] = [];
    await Promise.all(
      allItems.map(async ({ id }) => {
        const item: Items | null = await Items.findByPk(id);
        const likes: Likes | null = await Likes.findOne({ where: { postId: id } });
        const comments: Comments[] = await Comments.findAll({ where: { toItemId: id } });
        fullData.push({ data: item, likes, comments });
      })
    );
    return res.status(200).json({ message: 'Items fetched successfully', data: fullData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving items.',
      });
  }
};

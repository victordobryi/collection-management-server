import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import userRoutes from './routes/users';
import tagRoutes from './routes/tags';
import commentRoutes from './routes/comments';
import collectionRoutes from './routes/collections';
import itemRoutes from './routes/items';
import connection from './db/config';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { ServerSocket } from './socket';

dotenv.config();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 8000;
new ServerSocket(server);

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/tags', tagRoutes);
app.use('/comments', commentRoutes);
app.use('/collections', collectionRoutes);
app.use('/items', itemRoutes);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ message: err.message });
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

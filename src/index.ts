import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users';
import connection from './db/config';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use('/users', userRoutes);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

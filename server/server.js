import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/UserRoute.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to mongodb database.');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/user', router);

app.listen(PORT, () => {
  console.log(`connected to server at ${PORT}`);
});

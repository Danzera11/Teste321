import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middlewares/error.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Portal Nitro M365 API' });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API ouvindo na porta ${port}`);
});

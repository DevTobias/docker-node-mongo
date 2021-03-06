//* ------------------- DEPENDENCIES ------------------ *\\

//* Node modules
import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

//* Routes
import itemRouter from './routes/item.route';

//* ------------------ CONFIGURATION ------------------ *\\

dotenv.config({ path: './config/index.env' });

const PROTOCOL: string = process.env.PROTOCOL || 'http';
const HOST: string = process.env.HOST || 'localhost';
const PORT: string = process.env.PORT || '3000';

const app: Application = express();

//* ------------------- MIDDLEWARES ------------------- *\\

app.use(express.json());
app.use(cors());

//* --------------- DATABASE CONNECTION --------------- *\\

mongoose
  .connect(process.env.MONGO_URL || '', {
    authSource: 'admin',
    user: process.env.MONGO_USER || '',
    pass: process.env.MONGO_PASSWORD || '',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    console.info('mongo database connection established successfully')
  )
  .catch((error: Error) =>
    console.error('error connecting to database: ', error)
  );

//* --------------------- ROUTES ---------------------- *\\

//* User Authentification routes
app.use('/api/item', itemRouter);

//* Homepage route
app.get('/', (_req: Request, res: Response) =>
  res.status(200).json({ success: true, message: 'docker-node-mongo' })
);

//* Default page not found route
app.use((_req: Request, res: Response) =>
  res.status(404).json({ success: false, message: 'page not found' })
);

//* ------------------ START SERVER ------------------- *\\

app.listen(PORT, () =>
  console.info(`server listening on ${PROTOCOL}://${HOST}:${PORT}`)
);

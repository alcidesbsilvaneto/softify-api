import express from 'express';
import {AppRoutes} from './routes';

const app = express();

app.use(express.json());
app.use(AppRoutes());

export { app };


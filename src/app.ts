import express from 'express';
import ErrorHandler from './Middleware/ErrorHandler';
import carRoutes from './Routes/carRoute';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(ErrorHandler.handle);

export default app;

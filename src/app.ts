import express from 'express';
import ErrorHandler from './Middleware/ErrorHandler';
import carRoutes from './Routes/carRoute';
import motorcycleRoutes from './Routes/MotorcycleRoute';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(motorcycleRoutes);
app.use(ErrorHandler.handle);

export default app;

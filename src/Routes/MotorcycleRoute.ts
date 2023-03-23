import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleService from '../Services/MotorcycleService';

const motorcycleRoutes = Router();

const service = new MotorcycleService(
  new MotorcycleODM(),
);
const motorcycleController = new MotorcycleController(service);

motorcycleRoutes.post(
  '/motorcycles',
  (req, res, next) => motorcycleController.addNewVehicle(req, res, next),
);

motorcycleRoutes.get(
  '/motorcycles',
  (req, res, next) => motorcycleController.readAll(req, res, next),
);
motorcycleRoutes.get(
  '/motorcycles/:id',
  (req, res, next) => motorcycleController.readOne(req, res, next),
);

export default motorcycleRoutes;
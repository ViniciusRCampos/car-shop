import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

const carRoutes = Router();

const service = new CarService(
  new CarODM(),
);
const carController = new CarController(service);

carRoutes.get(
  '/cars',
  (req, res, next) => carController.readAll(req, res, next),
);

carRoutes.get(
  '/cars/:id',
  (req, res, next) => carController.readOne(req, res, next),
);

carRoutes.put(
  '/cars/:id',
  (req, res, next) => carController.updateCar(req, res, next),
);

carRoutes.post(
  '/cars',
  (req, res, next) => carController.addNewCar(req, res, next),
);

export default carRoutes;

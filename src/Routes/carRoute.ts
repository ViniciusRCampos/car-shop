import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarODM from '../Models/CarODM';
import CarService from '../Services/CarService';

const routes = Router();

const service = new CarService(
  new CarODM(),
);
const carController = new CarController(service);

routes.post(
  '/cars',
  (req, res, next) => carController.addNewCar(req, res, next),
);

export default routes;

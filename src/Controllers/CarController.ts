import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';

class CarController {
  private service: CarService;

  constructor(service: CarService) {
    this.service = service;
  }

  public async addNewCar(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await this.service.addNewCar(req.body);
      return res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;
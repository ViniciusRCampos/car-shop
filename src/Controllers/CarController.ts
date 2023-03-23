import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../Error/NotFoundError';
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

  public async readAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const carData = await this.service.readAll();
      return res.status(200).json(carData);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const carData = await this.service.readOne(id);
      if (!carData) throw new NotFoundError('Car not found');
      return res.status(200).json(carData);
    } catch (error) {
      next(error);
    }
  }

  public async updateCar(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const carData = await this.service.updateCar(id, req.body);
      if (!carData) throw new NotFoundError('Car not found');
      return res.status(200).json(carData);
    } catch (error) {
      next(error);
    }
  }
}

export default CarController;
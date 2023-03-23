import { NextFunction, Request, Response } from 'express';
import NotFoundError from '../Error/NotFoundError';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private service: MotorcycleService;

  constructor(service: MotorcycleService) {
    this.service = service;
  }

  public async addNewVehicle(req: Request, res:Response, next:NextFunction) {
    try {
      const newVehicle = await this.service.addNewVehicle(req.body);
      return res.status(201).json(newVehicle);
    } catch (error) {
      next(error);
    }
  }

  public async readAll(_req: Request, res:Response, next:NextFunction) {
    try {
      const data = await this.service.readAll();
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async readOne(req: Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.readOne(id);
      if (!data) throw new NotFoundError('Motorcycle not found');
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  public async updateMotorcycle(req: Request, res:Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const data = await this.service.updateMotorcycle(id, req.body);
      if (!data) throw new NotFoundError('Motorcycle not found');
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
import { NextFunction, Request, Response } from 'express';
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
}

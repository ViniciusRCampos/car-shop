import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import ValidationError from '../Error/ValidationError';
import IMotorcycles from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private motorcycleODM: MotorcycleODM;
        
  constructor(motorcycleODM: MotorcycleODM) {
    this.motorcycleODM = motorcycleODM;
  }
  private createNewVehicle(motorcycle: IMotorcycles | null) {
    if (motorcycle) return new Motorcycle(motorcycle);
    return null;
  }

  public async addNewVehicle(vehicle: IMotorcycles) {
    const newVehicle = await this.motorcycleODM.create(vehicle);
    return this.createNewVehicle(newVehicle);
  }

  public async readAll() {
    const results = await this.motorcycleODM.findAll();
    const data = results.map((result) => this.createNewVehicle(result));
    return data;
  }

  public async readOne(id: string) {
    if (!isValidObjectId(id)) throw new ValidationError();
    const result = await this.motorcycleODM.findOne(id);
    const data = this.createNewVehicle(result);
    return data;
  }

  public async updateMotorcycle(id: string, obj: IMotorcycles) {
    if (!isValidObjectId(id)) throw new ValidationError();
    const result = await this.motorcycleODM.update(id, obj);
    if (result) {
      const data = { id, ...obj };
      return this.createNewVehicle(data);
    }
    return null;
  }
}

export default MotorcycleService;
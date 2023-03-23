import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ValidationError from '../Error/ValidationError';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private carODM: CarODM;
      
  constructor(carODM: CarODM) {
    this.carODM = carODM;
  }
  private createNewCar(car: ICar | null) {
    if (car) {
      return new Car(
        car,
      );
    }
    return null;
  }
    
  public async addNewCar(car: ICar) {
    const newCar = await this.carODM.create(car);
    return this.createNewCar(newCar);
  }

  public async readAll() {
    const results = await this.carODM.findAll();
    const data = results.map((result) => this.createNewCar(result));
    return data;
  }

  public async readOne(id: string) {
    if (!isValidObjectId(id)) throw new ValidationError();
    const result = await this.carODM.findOne(id);
    const data = this.createNewCar(result);
    return data;
  }

  public async updateCar(id: string, car: ICar) {
    if (!isValidObjectId(id)) throw new ValidationError();
    const result = await this.carODM.update(id, car);
    if (result) {
      const data = { id, ...car };
      return this.createNewCar(data);
    }
    return null;
  }
}
export default CarService;
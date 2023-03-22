import Car from '../Domains/Car';
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
}
export default CarService;
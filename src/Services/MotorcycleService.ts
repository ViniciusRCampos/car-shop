import Motorcycle from '../Domains/Motorcycle';
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
}

export default MotorcycleService;
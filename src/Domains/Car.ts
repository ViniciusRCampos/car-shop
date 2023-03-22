import ICar from '../Interfaces/ICar';

class Car {
  public id: string | undefined;
  protected model: string;
  public year: number;
  public color: string;
  public status: boolean | undefined;
  public buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor({ id, model, year, color, status, buyValue, doorsQty, seatsQty }: ICar) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }
  
  public setDoorsQty(doorsQty: number) {
    this.doorsQty = doorsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }
  public setSeatsQty(seatsQty: number) {
    this.seatsQty = seatsQty;
  }
}

export default Car;
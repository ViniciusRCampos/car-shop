import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';
import CarODM from '../../../src/Models/CarODM';

describe('Testing Car Service', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testing readAll, to get all cars', async function () {
    // Arrange
    const outputMock: Car[] = [new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 })];
    
    sinon.stub(Model, 'find').resolves(outputMock);
    // Action

    const service = new CarService(new CarODM());
    const result = await service.readAll();

    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });
  it('Testing readOne, with a valid ID', async function () {
    // Arrange
    const inputMock = {
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    const outputMock = {
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };
    sinon.stub(Model, 'findById').resolves(outputMock);
    // Action

    const service = new CarService(new CarODM());
    const result = await service.readOne(inputMock.id);

    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Testing readOne, with a invalid ID', async function () {
    // Arrange
    sinon.stub(Model, 'findById').resolves(null);
    let error;

    // Action
    try {
      const service = new CarService(new CarODM());
      await service.readOne('ERROR');
    } catch (err) {
      error = err as Error;
    }
    // Assertion
    expect(error?.message).to.be.equal('Invalid mongo id');
  });
  it('Testing addNewCar with a valid Car', async function () {
    // Arrange
    const inputMock = {
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    const outputMock = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 });

    sinon.stub(Model, 'create').resolves(outputMock);

    // Action
    const service = new CarService(new CarODM());
    const result = await service.addNewCar(inputMock);

    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });
  it('Testing addNewCar with a invalid param', async function () {
    // Arrange
    const inputMock = {
      model: '',
      year: 1977,
      color: '',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    sinon.stub(Model, 'create').resolves();

    // Action
    const service = new CarService(new CarODM());
    const result = await service.addNewCar(inputMock);

    // Assertion
    expect(result).to.be.equal(null);
  });

  it('Testing updateCar, with a invalid ID', async function () {
    // Arrange

    const inputMock = {
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    
    let error;

    // Action
    try {
      const service = new CarService(new CarODM());
      await service.updateCar('ERROR', inputMock);
    } catch (err) {
      error = err as Error;
    }
    // Assertion
    expect(error?.message).to.be.equal('Invalid mongo id');
  });

  it('Testing updateCar, with a valid ID', async function () {
    // Arrange

    const inputMock = {
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    const outputMock = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMock);

    // Action
    const service = new CarService(new CarODM());
    const result = await service.updateCar('634852326b35b59438fbea2f', inputMock);
    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Testing updateCar, with a valid ID but do not find a car', async function () {
    // Arrange

    const inputMock = {
      model: 'Fusca',
      year: 1977,
      color: 'Brown',
      status: true,
      buyValue: 14.900,
      doorsQty: 2,
      seatsQty: 5 };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    // Action
    const service = new CarService(new CarODM());
    const result = await service.updateCar('634852326b35b59438fbea2f', inputMock);
    // Assertion
    expect(result).to.be.equal(null);
  });
});

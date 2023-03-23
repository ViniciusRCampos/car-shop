import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';

describe('Testing Motorcycle Service', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Testing readAll, to get all Motorcycles', async function () {
    // Arrange
    const outputMock: Motorcycle[] = [new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 })];
    sinon.stub(Model, 'find').resolves(outputMock);
    // Action

    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.readAll();

    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });
  it('Testing readOne, with a valid ID', async function () {
    // Arrange
    const inputMock = {
      id: '634852326b35b59438fbea2f',
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    const outputMock = {
      id: '634852326b35b59438fbea2f',
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };
    sinon.stub(Model, 'findById').resolves(outputMock);
    // Action

    const service = new MotorcycleService(new MotorcycleODM());
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
      const service = new MotorcycleService(new MotorcycleODM());
      await service.readOne('ERROR');
    } catch (err) {
      error = err as Error;
    }
    // Assertion
    expect(error?.message).to.be.equal('Invalid mongo id');
  });
  it('Testing addNewMotorcycle with a valid Motorcycle', async function () {
    // Arrange
    const inputMock = {
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    const outputMock = new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 });

    sinon.stub(Model, 'create').resolves(outputMock);

    // Action
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.addNewVehicle(inputMock);

    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });
  it('Testing addNewMotorcycle with a invalid param', async function () {
    // Arrange
    const inputMock = {
      model: '',
      year: 2023,
      color: '',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    sinon.stub(Model, 'create').resolves();

    // Action
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.addNewVehicle(inputMock);

    // Assertion
    expect(result).to.be.equal(null);
  });

  it('Testing updateMotorcycle, with a invalid ID', async function () {
    // Arrange

    const inputMock = {
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
    let error;

    // Action
    try {
      const service = new MotorcycleService(new MotorcycleODM());
      await service.updateMotorcycle('ERROR', inputMock);
    } catch (err) {
      error = err as Error;
    }
    // Assertion
    expect(error?.message).to.be.equal('Invalid mongo id');
  });

  it('Testing updateMotorcycle, with a valid ID', async function () {
    // Arrange

    const inputMock = {
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    const outputMock = new Motorcycle({
      id: '634852326b35b59438fbea2f',
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMock);

    // Action
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.updateMotorcycle('634852326b35b59438fbea2f', inputMock);
    // Assertion
    expect(result).to.be.deep.equal(outputMock);
  });

  it('Testing updateMotorcycle, with a valid ID but do not find a Motorcycle', async function () {
    // Arrange

    const inputMock = {
      model: 'Hayabusa',
      year: 2023,
      color: 'Black',
      status: true,
      buyValue: 124.000,
      category: 'Street',
      engineCapacity: 1.340 };

    sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

    // Action
    const service = new MotorcycleService(new MotorcycleODM());
    const result = await service.updateMotorcycle('634852326b35b59438fbea2f', inputMock);
    // Assertion
    expect(result).to.be.equal(null);
  });
});

import { Model, models, Schema, UpdateQuery, model } from 'mongoose';
  
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
  
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[modelName] || model(modelName, this.schema);
  }
  
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }
  
  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findOne(id: string) {
    return this.model.findById(id);
  }
}
  
export default AbstractODM;
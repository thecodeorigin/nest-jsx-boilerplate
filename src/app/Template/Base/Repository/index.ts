import { replace } from 'lodash'
import { FindOneOptions, Repository } from "typeorm"

export class BaseRepository<T> extends Repository<T> {
  public entityName = replace(this.constructor.name, 'Repository', '');

  async findOneWithOptions(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.findOne(options)
    return entity
  }

  async findManyWithOptions(options: FindOneOptions<T>): Promise<T[]> {
    const entity = await this.find(options)
    return entity
  }
  
  async findOneById(id: number): Promise<T> {
    return this.findOneWithOptions({
      where: { id }
    })
  }

  async findManyByIds(ids: Array<number>): Promise<T[]> {
    const entities = await this.findByIds(ids)
    return entities    
  }

  /**
   * Check duplication in property separately
   */
  async isDuplicated(options: any): Promise<boolean> {
    const orQueryArray = []
    for (const prop in options) orQueryArray.push({ [prop]: options[prop] })

    const count = await this.count({ 
      where: orQueryArray, 
      withDeleted: true 
    })
    return count > 0
  }

  async isDuplicatedInAllProps(options: any): Promise<boolean> {
    const count = await this.count({ 
      where: {...options}, 
      withDeleted: true 
    })
    return count > 0
  }
}

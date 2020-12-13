import { ConflictException, NotFoundException } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { TreeBaseRepository } from "../Repository";
import { pickBy, isEmpty, identity } from "lodash"
import { FindOneOptions } from "typeorm";

export class TreeBaseService<T> extends TypeOrmCrudService<T> {
  constructor(
    public repo : TreeBaseRepository<T>
  ) { super(repo) }

  async findOneOrFail(options: FindOneOptions<T>): Promise<T> {
    const found = await this.repo.findOne(options)
    if (!found)
      throw new NotFoundException(`${this.repo.entityName} not found`)
    return found
  }

  async findOneByIdOrFail(id: number): Promise<T> {
    return this.findOneOrFail({ 
      where: { id } 
    })
  }

  async findManyByIdsOrFail(ids: Array<number>): Promise<T[]> {
    const entities = await this.repo.findManyByIds(ids)
    if (!entities || entities.length === 0)
      throw new NotFoundException(`${this.repo.entityName}(s) not found`)
    return entities
  }
  
  /**
   * This method will return "false" if one 
   * of the condition was found on the database
   */
  async failIfDuplicated(conditions: any): Promise<void> {
    conditions = pickBy(conditions, identity)
    if (isEmpty(conditions)) return
    
    const isDuplicated = await this.repo.isDuplicated(conditions)
    if (isDuplicated) throw new ConflictException(`${this.repo.entityName} duplicated`)
  }

  /**
   * When you already query the entity from 
   * database, just pass entity and dto to update 
   */
  async updateOneQueriedEntity(entity: T, dto: any): Promise<T> {
    /* Replace entity's properties by dto */
    for (const prop in dto) {
      if (entity[prop] !== dto[prop]) {
        entity[prop] = dto[prop]
      }
    }
    return this.repo.save(entity)
  }

  /**
   * Pass the "findOptions" to find the entity
   * then update it base on the "dto" we passed
   */
  async updateOneWithFindOptionsOrFail(findOptions: FindOneOptions, dto: any): Promise<T> {
    const entity = await this.findOne(findOptions)
    if (!entity) throw new NotFoundException(`${this.repo.entityName} not found`)

    return this.updateOneQueriedEntity(entity, dto)
  }
    
  async getManyTree(): Promise<T[]> {
    return this.repo.findTrees()
  }

  async getTreeOne(id: number): Promise<T> {
    const entity = await this.findOne(id)
    return this.repo.findDescendantsTree(entity)
  }

  async getManyRoots(): Promise<T[]> {
    return this.repo.findRoots()
  }
  
  async getTreeChildren(id: number): Promise<T> {
    const current = await this.findOneByIdOrFail(id)
    return this.repo.findDescendantsTree(current)
  }

  async getOneClosestParent(id: number): Promise<any> {
    const current = await this.repo.findOneRawByIdOrFail(id)
    const parent = await this.repo.findOneRawById(current.parentId)
    return parent
  }
}

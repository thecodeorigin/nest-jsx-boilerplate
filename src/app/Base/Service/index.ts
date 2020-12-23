import { ConflictException, NotFoundException } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ErrorMessage } from "src/common/enums/error-message.enum";
import { DeepPartial, FindManyOptions, FindOneOptions, IsNull, Not, UpdateResult } from "typeorm";
import { BaseRepository } from "../Repository";
import { pickBy, identity, isEmpty } from 'lodash'
import { PaginateQueryOptions } from "@common/dto/paginate-query-options";

export class BaseService<T> extends TypeOrmCrudService<T> {
  constructor(
    public repo : BaseRepository<T>
  ) { super(repo) }

  /*
  * "findOneOrFail" is the extended version of the 
  * already defined method "findOne" but less params option
  */
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

  async createOne(req: CrudRequest, dto: any): Promise<T> {
    const entity = this.repo.create(dto as DeepPartial<T>)
    return this.repo.save(entity)
  }

  async softDeleteOne(id: any): Promise<any> {
    if (!(await this.repo.isDuplicated({ id }))) 
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND)
    const result: UpdateResult = await this.repo.softDelete(id)
    return { affectedRow: result.affected | result.raw.affectedRows | NaN }
  }

  async hardDeleteOne(id: any): Promise<any> {
    if (!(await this.repo.isDuplicated({ id }))) 
      throw new NotFoundException(ErrorMessage.USER_NOT_FOUND)
    const result = await this.repo.delete(id)
    return { affectedRow: result.affected | result.raw.affectedRows | NaN }
  }

  async restoreOne(id: any): Promise<any> {
    const result: UpdateResult = await this.repo.restore(id)
    return { affectedRow: result.affected | result.raw.affectedRows | NaN }
  }

  async getManyTrashed(paginateOptions: PaginateQueryOptions): Promise<any> {
    let { limit, page } = paginateOptions
    page = page > 0 ? page : 1
    limit = limit > 0 ? limit : 10
    const offset = (page - 1) * limit

    /* Get array of entities */
    const data = await this.find({ 
      withDeleted: true, 
      where: { deletedAt: Not(IsNull()) },
      take: limit,
      skip: offset
    })
    /* Get the pagination info in shape */
    const paginationInfo = await this.getPaginationInfo(
      data, 
      { withDeleted: true, where: { deletedAt: Not(IsNull()) }},
      limit,
      page
    )
    /* Returns similar to nestjsx-crud */
    return { data, ...paginationInfo }
  }

  async getPaginationInfo(
    data: Array<T>, 
    findOptions: FindManyOptions<T>, 
    limit: number, 
    page: number
  ): Promise<any> {
    const count = data.length
    const total = await this.count(findOptions)
    const pageCount = (total >= limit) ? Math.ceil(total/limit) : 1
    
    return { count, total, page, pageCount }
  }
}

import { getManager, TreeRepository } from "typeorm";
import { replace } from "lodash"
import { isEmpty } from "lodash"
import { NotFoundException } from "@nestjs/common";

export class TreeBaseRepository<T> extends TreeRepository<T> {
  public entityName = replace(this.constructor.name, 'Repository', '');
  
  async findManyByIds(ids: Array<number>): Promise<T[]> {
    const entities = await this.findByIds(ids)
    return entities    
  }

  async findOneRawById(id: number): Promise<any> {
    const manager = getManager();
    const rawData = await manager
      .query(`SELECT * FROM ${this.metadata.givenTableName} WHERE id = ${id}`)
    return rawData[0]
  }

  async findOneRawBySlug(slug: string): Promise<any> {
    const manager = getManager();
    const rawData = await manager
      .query(`SELECT * FROM ${this.metadata.givenTableName} WHERE slug = "${slug}"`)
    return rawData[0]
  }

  async findOneRawByIdOrFail(id: number): Promise<any> {
    const manager = getManager();
    const rawData = await manager
      .query(`SELECT * FROM ${this.metadata.givenTableName} WHERE id = ${id}`)
    if (isEmpty(rawData))
      throw new NotFoundException(`${this.entityName} not found`)
    return rawData[0]
  }

  async findOneRawBySlugOrFail(slug: string): Promise<any> {
    const manager = getManager();
    const rawData = await manager
      .query(`SELECT * FROM ${this.metadata.givenTableName} WHERE slug = "${slug}"`)
    if (isEmpty(rawData))
      throw new NotFoundException(`${this.entityName} not found`)
    return rawData[0]
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

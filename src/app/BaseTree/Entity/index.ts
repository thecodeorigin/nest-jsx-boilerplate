import { BaseEntityChild } from '@base/Entity/index.entity';
import { IsOptional, IsInt } from 'class-validator';

export abstract class TreeBase extends BaseEntityChild {
  @IsOptional()
  @IsInt()
  parentId: number;
}

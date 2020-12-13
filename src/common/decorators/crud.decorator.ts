import { applyDecorators } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { merge } from 'lodash';

export function UseCrud(entity: any, options?: any) {
  return applyDecorators(
    Crud(
      merge(
        {
          model: {
            type: entity
          },
          query: {
            limit: 10,
            maxLimit: 50,
            alwaysPaginate: true
          },
          routes: {
            exclude: [
              'createManyBase',
              'replaceOneBase'
            ]
          }
        },
        options
      )
    )
  );
}

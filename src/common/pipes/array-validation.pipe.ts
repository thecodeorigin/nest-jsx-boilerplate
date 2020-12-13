import { ArgumentMetadata, mixin, PipeTransform, Type, ValidationPipe } from '@nestjs/common';
import { memoize } from 'lodash';

/**
 * @Usage Apply class-validator to every single object in a object[] array.
 * `Example: @Body(ArrayValidationPipe(User)) users: User[]`
 */
export const ArrayValidationPipe: <T>(itemType: Type<T>) => Type<PipeTransform> = memoize(createArrayValidationPipe);

function createArrayValidationPipe<T>(itemType: Type<T>): Type<PipeTransform> {
  class MixinArrayValidationPipe extends ValidationPipe implements PipeTransform {

    transform(values: T[], metadata: ArgumentMetadata): Promise<any[]> {
      if (!Array.isArray(values)) {
        return values;
      }

      return Promise.all(values.map(value => super.transform(value, { ...metadata, metatype: itemType })));
    }
  }

  return mixin(MixinArrayValidationPipe);
}

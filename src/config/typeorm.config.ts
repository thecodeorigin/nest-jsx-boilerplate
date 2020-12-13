import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  RDS_DB_TYPE,
  TYPEORM_SYNC,
  RDS_DB_CONNECTION_STRING
} from '@common/environments'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: <any>RDS_DB_TYPE,
  url: RDS_DB_CONNECTION_STRING,
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: TYPEORM_SYNC,

  /**
   * Optional for development
   */
  // ssl: {
  //   rejectUnauthorized: false
  // }
}

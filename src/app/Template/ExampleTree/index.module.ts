import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeExampleController } from './controller';
import { TreeExampleRepository } from './repository';
import { TreeExampleService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TreeExampleRepository])
  ],
  controllers: [TreeExampleController],
  providers: [TreeExampleService],
  exports: [TreeExampleService]
})
export class TreeExampleModule {}

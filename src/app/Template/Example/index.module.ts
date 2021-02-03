import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleController } from './controller';
import { ExampleRepository } from './repository';
import { ExampleService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExampleRepository])
  ],
  controllers: [ExampleController],
  providers: [ExampleService]
})
export class ExampleModule {}

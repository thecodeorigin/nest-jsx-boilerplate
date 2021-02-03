import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExampleSlugController } from './controller';
import { ExampleSlugRepository } from './repository';
import { ExampleSlugService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExampleSlugRepository])
  ],
  controllers: [ExampleSlugController],
  providers: [ExampleSlugService]
})
export class ExampleSlugModule {}

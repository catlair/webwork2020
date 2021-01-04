import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentsEntity]),UsersModule],
  providers: [CommentsService],
  exports:[CommentsService]
})
export class CommentsModule {}

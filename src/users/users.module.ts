import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  //加了下面内容使用jwtService会报错,因为app.module中有了
  // controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';

//如果数据库出现auth问题,可以使用mysql2代替mysql包
const NestMySqlModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'dzy',
  //导致无法连接数据库的原因是下面这个属性
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
});

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    NestMySqlModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

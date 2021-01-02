import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'username' })
  @IsNotEmpty()
  @Length(2, 18, { message: '用户名长度为2-18' })
  @IsString()
  username: string;

  @ApiProperty({ description: '用户密码', example: '123456' })
  @Length(6, 18, { message: '密码长度为6-18' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: '用户邮箱', example: 'demo@qq.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: '用户住址', example: '北京市海淀区' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: '用户生日', example: '2021-01-01' })
  @IsNotEmpty()
  @IsString()
  birthday: string;
}

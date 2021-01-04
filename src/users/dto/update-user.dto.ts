import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: '用户新密码', example: '123456' })
  @IsString()
  @Length(6, 18, { message: '密码长度为6-18' })
  password: string;

  @ApiProperty({ description: '用户原密码', example: '123456' })
  oPassword?: string;

  @ApiProperty({ description: '用户邮箱', example: 'demo@qq.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '用户住址', example: '北京市海淀区' })
  @IsString()
  address: string;

  @ApiProperty({ description: '用户生日', example: '2021-01-01' })
  @IsString()
  birthday: string;
}

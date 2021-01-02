import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({description: '用户密码', example: '123456'})
  @IsString()
  @MaxLength(18)
  @MinLength(6)
  password: string;

  @ApiProperty({description: '用户邮箱', example: 'demo@qq.com'})
  @IsEmail()
  email: string;

  @ApiProperty({description: '用户住址', example: '北京市海淀区'})
  @IsString()
  address: string;

  @ApiProperty({description: '用户生日', example: '2021-01-01'})
  @IsString()
  birthday: string;
}

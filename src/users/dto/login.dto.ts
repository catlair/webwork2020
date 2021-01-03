import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
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
}

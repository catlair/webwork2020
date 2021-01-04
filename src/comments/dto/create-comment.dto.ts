import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsInt, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '评论内容', example: '你好啊' })
  @Length(1, 255, { message: '长度为1-255' })
  @IsNotEmpty()
  @IsString()
  content: string;
}

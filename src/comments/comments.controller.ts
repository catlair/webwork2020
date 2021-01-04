import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/users.decorator';

@ApiTags('评论')
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('')
  @ApiOperation({ summary: '获取所有评论' })
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: '获取用户的所有评论' })
  async findByUserId(@Param('userId') user_id: number) {
    return this.commentsService.findByUserId(user_id);
  }

  @Post('')
  @ApiOperation({ summary: '创建一个评论' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(@Body() createCommentDto: CreateCommentDto, @User() user) {
    return this.commentsService.create({ ...createCommentDto, user_id: user.user_id });
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除一条评论' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async delete(@Param('id') id: string, @User() user) {
    const com = await this.commentsService.findById(id);
    if (!com) {
      throw new BadRequestException('评论不存在');
    }
    if (com.user_id === +user.user_id || user.user_id === 1) {
      return this.commentsService.delete(id);
    }
    throw new UnauthorizedException('没有权限');
  }

  @Put(':id')
  @ApiOperation({ summary: '审核一条评论' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async verify(@Param('id') id: string, @User() user) {
    if (user.user_id === 1) {
      return this.commentsService.verify(id);
    }
    throw new UnauthorizedException('该用户没有审核权限');
  }
}

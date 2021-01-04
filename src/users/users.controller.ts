import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import {UniqueExceptionFilter} from "../unique.filter";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  @Get('')
  @ApiOperation({ summary: '获取所有用户信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async findAll(@User() user) {
    if (user.user_id === 1) {
      return await this.userService.findAll();
    }
    throw new UnauthorizedException('没有权限操作');
  }

  @Get(':id')
  @ApiOperation({ summary: '通过id获取一个用户的信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async findOneById(
    @Param('id')
      id: number,
    @User() user,
  ) {
    if (user.user_id === 1 || user.user_id === +id) {
      return await this.userService.findOneById(id);
    }
    throw new UnauthorizedException('没有权限操作');
  }

  @Put(':id')
  @ApiOperation({ summary: '更新一个用户的信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async update(
    @Param('id')
      id: number,
    @Body()
      updateUserDto: UpdateUserDto,
    @User() user,
  ) {
    if (user.user_id === 1 || user.user_id === +id) {
      return await this.userService.update(id, updateUserDto, user.user_id);
    }
    throw new UnauthorizedException('没有权限操作');
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '删除一个用户' })
  async remove(
    @Param('id')
      id: number,
    @User() user,
  ) {
    if (user.user_id === 1 || user.user_id === +id) {
      return this.userService.remove(id);
    }
    throw new UnauthorizedException('没有权限操作');
  }

  @Post('')
  // @UseFilters(UniqueExceptionFilter) //处理名字重复的报错
  @ApiOperation({ summary: '创建一个用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('auth')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '校验token是否有效' })
  async authToken() {
    return true;
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '登录' })
  // 使用上面的local策略后,返回的user会在req中
  //@User是自定义的,返回req.user
  login(@Body() loginDto: LoginDto, @User() user) {
    const username = user.username;
    const token = this.jwtService.sign({
      user_id: user.user_id,
    });
    return {
      user_id: user.user_id,
      username,
      token,
    };
  }
}

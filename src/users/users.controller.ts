import {Body, Controller, Delete, Get, Param, Post, Put, UseFilters} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
// import {UniqueExceptionFilter} from "../unique.filter";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(private readonly userService: UsersService
  ) {
  }

  @Get('')
  @ApiOperation({summary: '获取所有用户信息'})
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: '通过id获取一个用户的信息'})
  async findOneById(@Param('id')
                      id: number
  ) {
    return this.userService.findOneById(id)
  }

  @Put(':id')
  @ApiOperation({summary: '更新一个用户的信息'})
  async update(
    @Param('id')
      id: number,
    @Body()
      updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({summary: '删除一个用户'})
  async remove(@Param('id')
                 id: number
  ) {
    return this.userService.remove(id);
  }

  @Post('')
  // @UseFilters(UniqueExceptionFilter) //处理名字重复的报错
  @ApiOperation({summary: '创建一个用户'})
  async create(@Body() createUserDto: CreateUserDto
  ) {
    return this.userService.create(createUserDto);
  }

}

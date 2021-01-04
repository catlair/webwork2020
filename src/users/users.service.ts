import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
  }

  async findAll() {
    const data = await this.usersRepository.find();
    return data.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOneById(user_id: number) {
    const data = await this.usersRepository.findOne({ user_id });
    if (data) delete data.password;
    return data;
  }

  async findOneByIdHasPwd(user_id: number) {
    return await this.usersRepository.findOne({ user_id });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({ username });
  }

  async update(user_id: number, updateUserDto: UpdateUserDto, token_user_id: number) {
    const user = await this.findOneByIdHasPwd(user_id);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    if (token_user_id !== 1 && user.password !== updateUserDto.oPassword) {
      console.log(user.password, user.password !== updateUserDto.oPassword);
      throw new BadRequestException('请确认旧密码');
    }
    delete updateUserDto.oPassword;
    if (updateUserDto.email) {
      const emailUser = await this.findOneByEmail(updateUserDto.email);

      if (emailUser?.user_id && emailUser.user_id !== +user_id) {
        throw new BadRequestException('邮箱已存在');
      }
    }

    //如果要修改密码需要旧密码
    return await this.usersRepository.update({ user_id }, updateUserDto);
  }

  async remove(user_id: number) {
    if (user_id == 1) {
      throw new BadRequestException('不能删除id为1的用户');
    }
    return await this.usersRepository.delete({ user_id });
  }

  async create(createUserDto: CreateUserDto) {
    let user = await this.findOneByUsername(createUserDto.username || '');
    if (user?.user_id) {
      throw new BadRequestException('用户已存在');
    }
    user = await this.findOneByEmail(createUserDto.email || '');
    if (user?.user_id) {
      throw new BadRequestException('邮箱已存在');
    }
    const { username, password, email, address, birthday } = createUserDto;
    const data = await this.usersRepository.save({ username, password, email, address, birthday });
    delete data.password;
    return data;
  }
}

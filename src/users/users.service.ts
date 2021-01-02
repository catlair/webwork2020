import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Users} from "./entities/users.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {
  }

  async findAll() {
    const data = await this.usersRepository.find();
    return {
      statusCode: 200,
      data: data.map(user => {
        delete user.password
        return user
      })
    }
  }

  async findOneById(user_id: number) {
    const data = await this.usersRepository.findOne({user_id});
    delete data.password
    return {
      statusCode: 200,
      data
    }
  }

  async findOneHasPwd(username: string) {
    return await this.usersRepository.findOne({username});
  }

  async update(user_id: number, updateUserDto: UpdateUserDto) {
    const data = await this.usersRepository.update({user_id}, updateUserDto)
    return {
      statusCode: 200,
      data
    };
  }

  async remove(user_id: number) {
    const data = await this.usersRepository.delete({user_id});
    return {
      statusCode: 200,
      data
    }
  }

  async create(createUserDto: CreateUserDto) {
    const data = await this.usersRepository.save(createUserDto)
    delete data.password;
    return {
      statusCode: 200,
      data
    }
  }
}

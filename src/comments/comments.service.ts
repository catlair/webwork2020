import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity) private commentRepository: Repository<CommentsEntity>,
    private usersService: UsersService,
  ) {
  }

  async findAll() {
    const data = await this.commentRepository.createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .orderBy('comments.created_time', 'DESC')
      .getMany();

    return data.map(el => {
      delete el?.user.password;
      // delete el?.user.address;
      delete el?.user.email;
      return el;
    });
  }

  async findByUserId(user_id: number) {
    const data = await this.commentRepository.find({ user_id });
    const { username } = await this.usersService.findOneById(user_id);
    return {
      user_id,
      username,
      comments: data,
    };
  }

  async findById(id: string) {
    return this.commentRepository.findOne({ id });
  }

  async create(dto: { user_id: number, content: string }) {
    const { user_id, content } = dto;
    try {
      const user = await this.usersService.findOneById(+user_id);
      if (user) {
        const data = await this.commentRepository.save({ user_id, content, isVerify: 0 });
        data['username'] = user.username;
        return data;
      }
    } catch (err) {
    }
    throw new BadRequestException('用户id不存在');
  }

  async delete(id: string) {
    return await this.commentRepository.delete({ id });
  }

  async verify(id: string) {
    return this.commentRepository.update({ id }, { isVerify: 1 });
  }
}

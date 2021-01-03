import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new BadRequestException('用户名或密码错误');
    }
    if (password !== user.password) {
      throw new BadRequestException('用户名或密码错误');
    }

    return {
      user_id: user.user_id,
      username: user.username,
    };
  }
}

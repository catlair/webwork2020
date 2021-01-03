import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
//Strategy 这个一定是jwt中的,不要因为复制粘贴用到了local的,导致不报错但是验证失败
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'asdfjlkajkhsdfgasdh',
    } as StrategyOptions);
  }

  async validate(user): Promise<any> {
    return await this.usersService.findOneById(user.user_id);
  }
}

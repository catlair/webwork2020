import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dto/login.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {

  constructor(
    private readonly jwtService: JwtService,
  ) {
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '管理员登录' })
  async login(
    @Body() loginDto: LoginDto, @User() user
  ) {
    if (user.user_id === 1) {
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
    throw new UnauthorizedException('该账号不是管理员');
  }
}

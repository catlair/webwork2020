import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'asdfjlkajkhsdfgasdh',
      signOptions: { expiresIn: '660s' },
    }),
    UsersModule,
    PassportModule,
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {
}

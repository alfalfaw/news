import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'

import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './strategies/local.strategy'

import { JwtModule } from '@nestjs/jwt'
import { jwtConstants, validateService } from './constants'
import { JwtStrategy } from './strategies/jwt.strategy'

import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    UsersModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

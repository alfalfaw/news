import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { jwtConstants } from '../constants'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,表示不会忽略有效期，已到期令牌会直接报401
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret
    })
  }
  // 通常，每种策略的 validate() 方法的惟一显著差异是如何确定用户是否存在和是否有效。例如，在 JWT 策略中，根据需求，我们可以评估解码令牌中携带的 userId 是否与用户数据库中的记录匹配，或者是否与已撤销的令牌列表匹配。

  async validate(payload: any) {
    //字典名必须是真实数据库字段，模型字段，这里进行数据库查询，看看用户是否到期

    // 根据username找到该用户
    const user = await this.authService.findUserByName(payload.username)

    if (!user) {
      //用户不存在抛出异常
      throw new UnauthorizedException()
    }
    const current_time = new Date().getTime() / 1000

    if (current_time < payload.exp) {
      // token有效期内
      await this.authService.refreshExpireTime(payload.id)
      return { id: payload.sub, username: payload.username }
    } else if (current_time < user.expire_time) {
      // 超过token有效期，没有超过 expire_time
      await this.authService.refreshExpireTime(payload.id)
      // 生成新token
      const token = await this.authService.generateToken(user)
      return { id: payload.sub, username: payload.username, token: token }
    }
    // 超过 expire_time，抛出异常，让用户重新登录
    else throw new UnauthorizedException()
  }
}

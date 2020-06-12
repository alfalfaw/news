import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

// 使用@UseGuards(LocalAuthGuard)装饰器时会调用它
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super()
  }
  // validate方法是必须实现
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      //用户不存在必须抛出异常
      throw new UnauthorizedException()
    }
    // 登录成功后刷新登录过期时间
    await this.authService.refreshExpireTime(user.id)
    return user
  }
}

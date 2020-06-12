import { Injectable, Inject } from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  // 登录是否合法
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByName(username)
    // 后续改进：将数据库中加密后密码与用户提交密码的加密版本相比较确定用户是否合法  bcrypt
    if (user && user.password === password) {
      const { password, ...result } = user
      return result
    }
    return null
  }
  // 按照id查找用户
  async findUserByName(username: string): Promise<any> {
    // findOne 找不到时返回undefined
    const user = await this.usersService.findUserByName(username)
    if (user) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  //  刷新expire_time
  async refreshExpireTime(id: number) {
    await this.usersService.updateExpireTime(id)
  }

  // 生成token
  async generateToken(user: any) {
    // exp为超时时间，sub作为用户id的名称是符合JWT标准的
    const payload = { username: user.username, sub: user.id }

    return 'Bearer ' + this.jwtService.sign(payload)
  }
}

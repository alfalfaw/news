import { Controller, Post, Request, UseInterceptors, UploadedFile, UseGuards, Body } from '@nestjs/common'

import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger'
import { LocalAuthGuard } from './auth/guards/local-auth.guard'
import { AuthService } from './auth/auth.service'

export class LoginDTO {
  @ApiProperty({ example: 'admin', description: '用户名' })
  username: string
  @ApiProperty({ example: '1234', description: '密码' })
  password: string
}
@ApiTags('通用')
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '登陆' })
  async login(@Request() req, @Body() loginDTO: LoginDTO) {
    // 用req.user中中用户名和id获得jwt
    return {
      token: await this.authService.generateToken(req.user)
    }
  }
}

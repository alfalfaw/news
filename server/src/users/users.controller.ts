import { Controller, Get, Request, UseGuards, Post, UseInterceptors, UploadedFile, Param, Res } from '@nestjs/common'
import { User } from './user.entity'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Crud, CrudController } from '@nestjsx/crud'
import { UsersService } from './users.service'
import { FileInterceptor } from '@nestjs/platform-express'
@Crud({
  model: {
    type: User
  }
  // dto: {
  //   create: GoodDTO,
  //   update: GoodDTO,
  // },
  //表示查询外键
  // query: {
  //   join: {
  //     application: { eager: true },
  //   },
  // },
})
@ApiTags('用户')
@Controller('users')
export class UsersController implements CrudController<User> {
  constructor(public service: UsersService) {}

  @Post('upload')
  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '上传' })
  async upload(@UploadedFile() file) {
    // global.console.log(file['filename'])
    return { url: `http://127.0.0.1:3000/api/private/v1/users/uploads/${file['filename']}` }
  }

  @Get('uploads/:id')
  @ApiOperation({ summary: '获得头像' })
  async getAvater(@Param('id') id, @Res() res): Promise<any> {
    // global.console.log(id)
    res.sendFile(id, { root: 'uploads' })
  }
}

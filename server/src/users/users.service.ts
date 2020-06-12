import { Injectable } from '@nestjs/common'
import { User } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo)
  }

  // 在数据库中验证该用户是否存在，这个service必须export出去，因为我们会在其他地方用到
  async findUserByName(username: string): Promise<User | undefined> {
    return await this.repo.findOne({ username: username })
  }

  // 刷新expire_time
  async updateExpireTime(id: number) {
    const new_time = new Date().getTime() / 1000 + 60 * 60 * 24 * 7
    // condition value
    await this.repo.update({ id: id }, { expire_time: new_time })
  }
}

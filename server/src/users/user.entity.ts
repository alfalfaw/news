import { Entity, Column } from 'typeorm'
import { BaseEntity } from 'src/base.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum UserStatus {
  ENABLE = 2,
  DISABLE = 1
}
export enum UserGender {
  Male = 1,
  Female = 2,
  Unknown = 3
}
export enum UserRole {
  Admin = 1,
  User = 2
}

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ example: '用户1', description: '姓名' })
  @Column({ type: 'varchar', width: 20 })
  username: string

  @ApiProperty({ example: '12345', description: '密码' })
  @Column({ type: 'varchar', width: 255 })
  password: string

  @ApiProperty({ example: 'http://...img', description: '头像' })
  @Column({ type: 'varchar', width: 255, nullable: true })
  avater: string

  @ApiProperty({ example: 1, description: '性别' })
  @Column({
    type: 'int',
    default: UserGender.Male
  })
  gender: number

  @ApiProperty({ example: 12345678901, description: '手机号' })
  @Column({ type: 'int', width: 11, nullable: true })
  mobile: number

  @ApiProperty({ example: '727338@qq.com', description: '邮箱' })
  @Column({ type: 'varchar', width: 40, nullable: true })
  email: string

  @ApiProperty({ example: 2, description: '角色' })
  @Column({ type: 'int', default: UserRole.User })
  role_id: number

  @ApiProperty({ example: 121323, description: '过期时间' })
  @Column({ type: 'bigint', nullable: true })
  expire_time: number

  @ApiProperty({ example: 2, description: '账号状态' })
  @Column({
    type: 'int',
    default: UserStatus.ENABLE
  })
  status: number
}

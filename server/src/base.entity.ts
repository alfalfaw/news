import { PrimaryGeneratedColumn, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

export abstract class BaseEntity {
  @ApiProperty({ example: 123, description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: '2018-12-12', description: '创建时间' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: string

  @ApiProperty({ example: '2018-12-12', description: '更新时间' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: string
}

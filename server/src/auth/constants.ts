import { UsersService } from '../users/users.service'
export const jwtConstants = {
  secret: 'secretKey'
}

export const validateService = UsersService

// 警告
// 请勿公开暴露此密钥。我们在这里这样做是为了清楚代码在做什么，但是在生产系统中，必须使用适当的措施（例如密钥库，环境变量或配置服务）
// 保护此密钥

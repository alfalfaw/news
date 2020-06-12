import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  // 设置全局接口前缀
  app.setGlobalPrefix('api/private/v1')
  const options = new DocumentBuilder()
    .setTitle('新闻')
    .setDescription('新闻API')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(3000)
}
bootstrap()

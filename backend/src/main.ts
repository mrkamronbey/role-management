import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module.js'

const app = await NestFactory.create(AppModule)
const config = app.get(ConfigService)

app.setGlobalPrefix('api')
app.enableCors({ origin: config.getOrThrow<string>('CORS_ORIGIN') })
app.enableShutdownHooks()

await app.listen(config.get('PORT') ?? 3000)

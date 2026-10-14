import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js'
import { ResponseInterceptor } from './common/interceptors/response.interceptor.js'
import { validationPipe } from './common/pipes/validation.pipe.js'
import { validateEnv } from './config/env.validation.js'
import { AccessRequestsModule } from './modules/access-requests/access-requests.module.js'
import { AnalyticsModule } from './modules/analytics/analytics.module.js'
import { AuthModule } from './modules/auth/auth.module.js'
import { PaymentsModule } from './modules/payments/payments.module.js'
import { ReportsModule } from './modules/reports/reports.module.js'
import { RolesModule } from './modules/roles/roles.module.js'
import { UsersModule } from './modules/users/users.module.js'
import { PrismaModule } from './prisma/prisma.module.js'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PaymentsModule,
    ReportsModule,
    AccessRequestsModule,
    AnalyticsModule,
  ],
  providers: [
    { provide: APP_PIPE, useValue: validationPipe },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}

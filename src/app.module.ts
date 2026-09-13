import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';
import { OperationModule } from './operation/operation.module.js';
import { UserModule } from './user/user.module.js';
import { AnalyzeModule } from './analyze/analyze.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'mlh-hackaton-app-backend',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('MONGODB_URI'),
      }),
    }),

    AuthModule,

    OperationModule,

    UserModule,

    AnalyzeModule,
  ],
  providers: [AppService],
})
export class AppModule {}
``;

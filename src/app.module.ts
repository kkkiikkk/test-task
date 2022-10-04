// Core
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { DatabaseModule } from './tools/database/database.module';
import { TransactionModule, UserModule } from './services'

// Controllers
import { TransactionController } from './controllers/transaction.controller'
import { UserController } from './controllers/user.controller'

// Middlewares
import { AppLoggerMiddleware } from './tools/middlewares/AppLoggerMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    TransactionModule
  ],
  controllers: [
    TransactionController,
    UserController
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

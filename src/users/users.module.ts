import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { UsersController } from './controllers/users/users.controller';
import { ExampleMiddleware } from './middlewares/example/example.middleware';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/typeorm/entities/User';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(ExampleMiddleware).forRoutes({
      path: 'users',
      method: RequestMethod.GET
    },
    {
      path: 'users/:id',
      method: RequestMethod.GET
    })
    .apply()
  }
}

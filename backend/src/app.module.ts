import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'node:path';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { configProvider } from './app.config.provider';
import { FilmSchema } from './films/schemas/film.schema';
import { OrderSchema } from './order/schemas/order.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      serveRoot: '/content/afisha',
    }),
    MongooseModule.forRoot(
      process.env.DATABASE_URL || 'mongodb://localhost:27017/films',
    ),
    MongooseModule.forFeature([
      { name: 'Film', schema: FilmSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  controllers: [FilmsController, OrderController],
  providers: [FilmsService, OrderService, configProvider],
})
export class AppModule {}

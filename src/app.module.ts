import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { ConfigModule } from '@nestjs/config';
import { HelloController } from './hello/hello.controller';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Book,User],
      synchronize: true, // ⚠️ solo en desarrollo synchronize: true crea las tablas automáticamente según tus entidades. En producción se recomienda desactivarlo y usar migraciones.

    }),
    UsersModule,
    AuthModule,

  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule {}

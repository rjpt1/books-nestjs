import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let jwtService: JwtService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    jwtService = moduleFixture.get<JwtService>(JwtService);
  });

  it('/books (GET)', async () => {
    // Generamos un token "falso" pero válido para la app
    const testToken = jwtService.sign({ sub: 1, email: 'test@test.com' });
    return request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${testToken}`)
      .expect(200);
  });
});

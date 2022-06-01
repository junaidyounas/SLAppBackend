import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import mongoose from 'mongoose';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(() => {
    mongoose.connect(process.env.MONGO_URI_LOCAL_TEST,
        function() {
            mongoose.connection.db.dropDatabase();
        }
    )
  });

  afterAll(() => {
      mongoose.disconnect();
  })

  const user = {
      name: 'Junaid Younas',
      email: 'junaid1@email.com',
      password: '12345678',
      phone: '12345678'
  }

  it('(Post) ==> register a new user', () => {
      return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(201)
      .then(res => {
          expect(res.body.token).toBeDefined()
      });
  })
});

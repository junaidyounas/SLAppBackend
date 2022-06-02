import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
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

  afterAll(() => {
      mongoose.disconnect();
  })

  const user = {
    name: 'Junaid Younas',
    email: 'junaid1@email210.com',
    password: '12345678',
    phone: '12345678'
}

  const post = {
    "title": "Post",
    "description": "Post Description",
    "price": 20,
    "condition": "New",
    "images": ["image"],
    "location": "Lahore, Pakistan",
    "category": "6295c3c226ca550f27f7eb55",
    "subCategory": "Mobiles"
  }

  let token = '';
  let postId = '';

  // test for create new user
  it('(Post) ==> register a new user for post', () => {
    return request(app.getHttpServer())
    .post('/auth/signup')
    .send(user)
    .expect(201)
    .then(res => {
        expect(res.body.name).toBeDefined();
        expect(res.body.phone).toBeDefined()
        expect(res.body.email).toBeDefined()
        expect(res.body.password).toBeDefined()
        });
    });

  // test for login
  it('(Post) ==> Login a new user for post', () => {
    return request(app.getHttpServer())
    .post('/auth/login')
    .send(user)
    .expect(201)
    .then(res => {
        expect(res.body.token).toBeDefined();
        token = res.body.token;
    });
  });

  // test for login
  it('(Post) ==> Create Post', () => {
    return request(app.getHttpServer())
    .post('/posts')
    .set('Authorization', 'Bearer '+ token)
    .send(post)
    .expect(201)
    .then(res => {
        expect(res.body.title).toBeDefined();
        postId = res.body._id
    });
  });
  // test for login
  it('(Patch) ==> Patch Post Data', () => {
    return request(app.getHttpServer())
    .patch(`/posts/${postId}`)
    .set('Authorization', 'Bearer '+ token)
    .send(post)
    .expect(200)
    .then(res => {
        expect(res.body.title).toBeDefined();
    });
  });

  // Get single post data
  it('(Get) ==> Single Post Data', () => {
    return request(app.getHttpServer())
    .get(`/posts/${postId}`)
    .send(post)
    .expect(200)
    .then(res => {
        expect(res.body).toBeDefined();
    });
  });

  // Get all post data
  it('(Get) ==> Get all Post Data', () => {
    return request(app.getHttpServer())
    .get(`/posts`)
    .send(post)
    .expect(200)
    .then(res => {
        expect(res.body).toBeDefined();
    });
  });
});

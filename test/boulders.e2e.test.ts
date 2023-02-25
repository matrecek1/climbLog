import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';
import { getConnection } from 'typeorm';

describe('BouldersController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_TESTNAME,
          autoLoadEntities: true,
          synchronize: true
        })]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close()
  })

  describe('POST /boulders', () =>{
    it('should successfully save a boulder', async () =>{
      const { body } = await request.agent(app.getHttpServer())
      .post('/boulders')
      .send({
        boulderInput:{
          name:'name',
          grade:'7C',
          description:"this is a boulder"
        }
      })
      .expect(201)

      expect(body).toStrictEqual({ message:"successfully created Boulder", newBoulder:{
        name: "name",
        grade: "7C",
        description: "this is a boulder",
        id:1,
      }})
    })
  })

  describe('GET /boulders', () => {
    it('should return of boulders', async () => {
      const { body } = await request.agent(app.getHttpServer())
        .get('/boulders')
        .expect(200);

      expect(body).toEqual({
        boulders: [{
          name: "name",
          grade: "7C",
          description: "this is a boulder",
          id: 1,
        }
      ]});
    });
  });
  describe('GET /boulders/:id', () => {
    it('should return a boulder by id', async () => {
      const { body } = await request.agent(app.getHttpServer())
        .get('/boulders/1')
        .expect(200);
    });
  });
  describe('DELETE /boulders', () =>{
    it('should successfully delete aboulder by id', async () =>{
      const { body } = await request.agent(app.getHttpServer())
        .delete('/boulders/1')
        .expect(200)
      expect(body).toStrictEqual({ message: "Boulder deletion successfull!" })
    })
  })
});

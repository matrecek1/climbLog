import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';



describe('BouldersController (e2e)', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close()
    })

    describe('POST /boulders', () => {
        const boulderInput = {
            boulderInput: {
                name: 'name',
                grade: '7C',
                description: "this is a boulder"
            }
        }
        it('should successfully insert a boulder', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .post('/boulders')
                .send(boulderInput)
                .expect(201)

            expect(body).toStrictEqual({
                message: "successfully created Boulder", newBoulder: {
                    name: "name",
                    grade: "7C",
                    description: "this is a boulder",
                    id: 1,
                }
            })
        })
        it('should fail to validate input: improper grade', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .post('/boulders')
                .send({
                    boulderInput: {
                        ...boulderInput.boulderInput,
                        grade: '7'
                    }
                })
                .expect(400)
        })
        it('should fail to validate input: improper name', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .post('/boulders')
                .send({
                    boulderInput: {
                        ...boulderInput.boulderInput,
                        name: 'a'
                    }
                })
                .expect(400)
        })
        it('should fail to validate input: improper description', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .post('/boulders')
                .send({
                    boulderInput: {
                        ...boulderInput.boulderInput,
                        description: ''
                    }
                })
                .expect(400)
        })
    })

    describe('GET /boulders', () => {
        it('should return [] of boulders', async () => {
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
                ]
            });
        });
    });
    describe('GET /boulders/:id', () => {
        it('should return a boulder by id', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .get('/boulders/1')
                .expect(200);
        });
        it('should not find boulder and throw err', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .get('/boulders/2')
                .expect(404);
        });
    });

    describe('PATCH /boulders', () => {
        const update = {
            boulderUpdateInput: {
                name: 'test',
                grade: '8A'
            }
        }
        it('should successfully patch aboulder by id', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .patch('/boulders/1')
                .send(update)
                .expect(200)
            expect(body).toStrictEqual({
                message: "Boulder update successfull!",
                updatedBoulder: {
                    id: 1,
                    name: "test",
                    grade: "8A",
                    description: "this is a boulder"
                }
            })
        })

        it('should not find boulder and throw err', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .patch('/boulders/2')
                .send(update)
                .expect(404)
        })
    })

    describe('DELETE /boulders', () => {
        it('should successfully delete aboulder by id', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .delete('/boulders/1')
                .expect(200)
            expect(body).toStrictEqual({ message: "Boulder deletion successfull!" })
        })
        it('should not find boulder and throw err', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .delete('/boulders/1')
                .expect(404)
        })
    })
})
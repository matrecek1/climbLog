import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ClimberUpdateDto, CreateClimberDto } from 'src/climbers/climbers.types';


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

    describe('POST /climbers', () => {
        const climberInput: { climberInput: CreateClimberDto } = {
            climberInput: {
                firstName: "Tom",
                lastName: "Dom",
                surname: "TomDom"
            }
        }
        it('should successfully insert a climber', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .post('/climbers')
                .send(climberInput)
                .expect(201);
        })
        it('should fail to insert climber: improper name', async () => {
            climberInput.climberInput.firstName = ''
            const { body } = await request.agent(app.getHttpServer())
                .post('/climbers')
                .send(climberInput)
                .expect(400);
        })
    })

    describe('GET /climbers', () => {
        it('should return [] of climbers', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .get('/climbers')
                .expect(200);
            expect(body).toStrictEqual({
                climbers: [{
                    firstName: "Tom",
                    lastName: "Dom",
                    surname: "TomDom",
                    id: 1
                }]
            })
        })
    })

    describe('GET /Climbers', () => {
        it('should return one climber', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .get('/climbers/1')
                .expect(200)
            expect(body).toStrictEqual({
                climber: {
                    firstName: "Tom",
                    lastName: "Dom",
                    surname: "TomDom",
                    id: 1
                }
            })
        })
        it('should fail to find climber: invalid id', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .get('/climbers/2')
                .expect(404)
        })
    })

    describe('PATCH /climbers', () => {
        const patch: { climberUpdateInput: ClimberUpdateDto } = {
            climberUpdateInput: {
                firstName: "Lom",
                surname: "LomDom"
            }
        }
        it('should update climber', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .patch('/climbers/1')
                .send(patch)
                .expect(200)
            expect(body).toStrictEqual({
                message: "Climber Updated!", updatedClimber: {
                    id: 1,
                    firstName: 'Lom',
                    lastName: "Dom",
                    surname: 'LomDom'
                }
            })
        })
        it('should fail to patch climber: id not found', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .patch('/climbers/2')
                .send(patch)
                .expect(404)
        })
        it('should fail to patch climber: improper input', async () => {
            patch.climberUpdateInput.surname = ''
            const { body } = await request.agent(app.getHttpServer())
                .patch('/climbers/1')
                .send(patch)
                .expect(400)
        })
    })

    describe('DELETE /climbers', () => {
        it('should successfully delete a climber by id', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .delete('/climbers/1')
                .expect(200)
            expect(body).toStrictEqual({ message: "Climber deleted!" })
        })
        it('should not find climber and throw err', async () => {
            const { body } = await request.agent(app.getHttpServer())
                .delete('/climbers/1')
                .expect(404)
        })
    })
})

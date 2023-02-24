import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Climber } from './climbers.entity';
import { ClimbersService } from './climbers.service';
import { CreateClimberDto } from './climbers.types';

describe('climbersService', () => {
    let service: ClimbersService;
    let climbersRepository: Repository<Climber>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClimbersService,
                {
                    provide: getRepositoryToken(Climber),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn()
                    }
                },
            ],
        }).compile();
        service = module.get<ClimbersService>(ClimbersService);
        climbersRepository = module.get<Repository<Climber>>(getRepositoryToken(Climber))
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Climber depository should be defined.', () => {
        expect(climbersRepository).toBeDefined()
    })

    describe("Insert climber", () => {
        const climber:CreateClimberDto = {
            firstName: "tom",
            lastName: "dom",
            surname: "tomdom"
        }
        it("should call climberRepository.save with correct params", async () => {
            await service.insert(climber)
            expect(climbersRepository.save).toHaveBeenCalledWith({
                firstName: "tom",
                lastName: "dom",
                surname: "tomdom",
            })
        })
    })
    describe('findAll', () => {
        it('should get all climbers', async () => {
            jest.spyOn(climbersRepository, 'find').mockReturnValueOnce(
                Promise.resolve([{
                   firstName: "tom",
                   lastName:"dom",
                   surname:"tomdom",
                   id:1,
                   climbLogs: []
                }])
            )
            const climbers = await service.findAll()
            expect(climbers).toStrictEqual([{
                firstName: "tom",
                lastName: "dom",
                surname: "tomdom",
                id: 1,
                climbLogs: []
            }])
        })
    })
    describe('findOne', () => {
        it("should get climber", async () => {
            jest.spyOn(climbersRepository, 'findOneBy').mockReturnValue(Promise.resolve({
                firstName: "tom",
                lastName: "dom",
                surname: "tomdom",
                id: 1,
                climbLogs: []
            }))
            const climber = await service.findOne(1)
            expect(climber).toStrictEqual(
                {
                    firstName: "tom",
                    lastName: "dom",
                    surname: "tomdom",
                    id: 1,
                    climbLogs: []
                }
            )
            expect(climbersRepository.findOneBy).toHaveBeenCalledWith({id:1})
        })
    })
    describe('patch', () => {
        it('returns patched climber', async () => {
            jest.spyOn(service, 'findOne').mockReturnValueOnce(Promise.resolve(
                {
                    firstName: "tom",
                    lastName: "dom",
                    surname: "tomdom",
                    id: 1,
                    climbLogs: []
                }))
            await service.patch(1, {
                firstName:'theman'
            })
            expect(climbersRepository.save).toHaveBeenCalledWith({
                firstName: "theman",
                lastName: "dom",
                surname: "tomdom",
                id: 1,
                climbLogs: []
            })
            expect(service.findOne).toHaveBeenCalledWith(1)
        })
    })
})
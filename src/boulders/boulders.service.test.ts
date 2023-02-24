import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boulder } from './boulders.entity';
import { BouldersService } from './boulders.service';

describe('BouldersService', () => {
    let service: BouldersService;
    let bouldersRepository: Repository<Boulder>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BouldersService,
                {
                    provide: getRepositoryToken(Boulder),
                    useValue: {
                        create: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn(),
                        findOneBy: jest.fn()
                    }
                },
            ],
        }).compile();
        service = module.get<BouldersService>(BouldersService);
        bouldersRepository = module.get<Repository<Boulder>>(getRepositoryToken(Boulder))
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Boulder depository should be defined.', () => {
        expect(bouldersRepository).toBeDefined()
    })

    describe("Insert boulder", () => {
        it("should insert a boulder", async () => {
            await service.insert({
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder"
            })
        })
        it("should call boulderRepository.create with correct params", async () => {
            await service.insert({
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder"
            })
            expect(bouldersRepository.create).toHaveBeenCalledWith({
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder"
            })
        })
        it("should call boulderRepository.save with correct params", async () => {
            jest.spyOn(bouldersRepository, 'create').mockReturnValueOnce({
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder",
                id: 1,
                climbLogs: []
            })
            await service.insert({
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder"
            })
            expect(bouldersRepository.save).toHaveBeenCalledWith({
                id: 1,
                name: "testboulder",
                grade: "7C",
                description: "this is a boulder",
                climbLogs: []
            })
        })
    })

    describe('getBoulders', () => {
        it('should get all boulders', async () => {
            jest.spyOn(bouldersRepository, 'find').mockReturnValueOnce(
                Promise.resolve([{
                    name: 'testboulder',
                    grade: '7C',
                    description: "a boulder",
                    id: 1,
                    climbLogs: []
                }])
            )
            const boulders = await service.findAll()
            expect(boulders).toStrictEqual([{
                name: 'testboulder',
                grade: '7C',
                description: "a boulder",
                id: 1,
                climbLogs: []
            }])
        })
    })
    describe('getBoulder', () => {
        it("mock get boulder", async () => {
            jest.spyOn(bouldersRepository, 'findOneBy').mockReturnValue(Promise.resolve({
                name: 'testboulder',
                grade: '7C',
                description: "a boulder",
                id: 1,
                climbLogs: []
            }))
            const boulder = await service.findOne(1)
            expect(boulder).toStrictEqual(
                {
                    name: 'testboulder',
                    grade: '7C',
                    description: "a boulder",
                    id: 1,
                    climbLogs: []
                }
            )
        })
    })
    describe('patchBoulder', () =>{
        it('returns patched boulder', async () =>{
            jest.spyOn(service, 'findOne').mockReturnValueOnce(Promise.resolve({
                name:"bname",
                grade:"8A",
                description:"this is desc",
                id:1,
                climbLogs:[]
            }))
            const patchedBoulder = await service.patch(1, {
                name:"newName",
                grade:"6B+",
                description:"patched"
            })
            expect(bouldersRepository.save).toHaveBeenCalledWith({
                name: "newName",
                grade: "6B+",
                description: "patched",
                id:1,
                climbLogs:[]
            })
        })
    })
})
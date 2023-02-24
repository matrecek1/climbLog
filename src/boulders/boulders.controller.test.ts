import { Test, TestingModule } from '@nestjs/testing';
import { Boulder } from './boulders.entity';
import { BouldersController } from './boulders.controller';
import { BouldersService } from './boulders.service';
import { BoulderUpdateDto, CreateBoulderDto } from './boulders.types';

describe('BouldersController', () => {
    let bouldersController: BouldersController;

    const mockBouldersService = {
        insert: jest.fn(boulderInput => {
            return {
                ...boulderInput,
                climbLogs: [],
                id: 1
            }
        }),
        findOne: jest.fn(_ => {
            return {
                id: 1,
                name: 'boulder1',
                grade: '6C',
                description: 'a boulder'
            }
        }),
        findAll: jest.fn(() => {
            return [{
                id: 1,
                name: 'boulder1',
                grade: '6C',
                description: 'a boulder'
            }, {
                id: 2,
                name: 'boulder2',
                grade: '6B',
                description: 'a boulder2'
            }]
        }),
        patch: jest.fn((id, patch) => {
            const boulder = {
                id: 2,
                name: 'boulder2',
                grade: '6B',
                description: 'a boulder2'
            }
            return {
                ...boulder,
                ...patch
            }
        }),
        remove: jest.fn(),
    }
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [BouldersController],
            providers: [BouldersService],
        }).overrideProvider(BouldersService).useValue(mockBouldersService).compile();

        bouldersController = module.get<BouldersController>(BouldersController);
    });


    it('Controller is defined', () => {
        expect(bouldersController).toBeDefined()
    })


    describe('addBoulder', () => {
        const boulderInput: CreateBoulderDto = { grade: "7C", name: 'boulder1', description: "a boulder" }
        it('should successfully return message and new boulder', async () => {
            expect(await bouldersController.addBoulder(boulderInput)).toStrictEqual({
                message: "successfully created Boulder", newBoulder: {
                    ...boulderInput,
                    id: expect.any(Number),
                    climbLogs: []
                }
            });
        });
        it('should call mockBoudlersService.insert once', () => {
            expect(mockBouldersService.insert).toBeCalledTimes(1)
        })
        it('should call mockBouldersService.insert with correct params', () => {
            expect(mockBouldersService.insert).toHaveBeenCalledWith(boulderInput)
        })
    });

    describe('getBoulders', () => {
        it('should return an array of boulders', async () => {
            const mockResult = [{
                id: 1,
                name: 'boulder1',
                grade: '6C',
                description: 'a boulder'
            }, {
                id: 2,
                name: 'boulder2',
                grade: '6B',
                description: 'a boulder2'
            }]
            expect(await bouldersController.getBoulders()).toStrictEqual({ boulders: mockResult });
        });
        it('should call mockBoudlersService.findAll once', () => {
            expect(mockBouldersService.findAll).toHaveBeenCalledTimes(1)
        })
    });
    describe('getBoulder', () => {
        const mockResult = {
            id: 1,
            name: 'boulder1',
            grade: '6C',
            description: 'a boulder'
        }
        it('should return a boulder', async () => {
            expect(await bouldersController.getBoulder(1)).toStrictEqual({
                boulder: mockResult
            })
        })
        it('should call mockBouldersService.findOne with right params', () => {
            expect(mockBouldersService.findOne).toHaveBeenCalledWith(1)
        })
        it('should call mockBouldersService.findOne once', () => {
            expect(mockBouldersService.findOne).toHaveBeenCalledTimes(1)
        })
        it('should return from mockBouldersService.findOne right object', () => {
            expect(mockBouldersService.findOne).toHaveReturnedWith(mockResult)
        })
    })
    describe('patchBoulder', () => {
        const mockUpdate: BoulderUpdateDto = {
            name: "BigBoulder",
            grade: "8A"
        }
        const mockResult = {
            id: 2,
            name: "BigBoulder",
            grade: "8A",
            description: 'a boulder2'
        }
        it('should return a message and patched boulder', async () => {
            expect(await bouldersController.patchBoulder(2, mockUpdate)).toStrictEqual({
                message: "Boulder update successfull!",
                updatedBoulder: mockResult
            })
        })
        it('should return from service.patch valid obj', () => {
            expect(mockBouldersService.patch).toHaveReturnedWith(mockResult)
        })
        it('should call service.patch with right params', () => {
            expect(mockBouldersService.patch).toHaveBeenCalledWith(expect.any(Number), mockUpdate)
        })
    })
    describe('deleteBoulder', () => {
        it('should return message of deletion', async () => {
            expect(await bouldersController.deleteBoulder(1)).toStrictEqual({
                message: "Boulder deletion successfull!"
            })
        })
        it('should should call service.delete', () => {
            expect(mockBouldersService.remove).toHaveBeenCalledTimes(1)
        })
        it('should should call service.delete with right id', ()=>{
            expect(mockBouldersService.remove).toHaveBeenCalledWith(1)
        })
    })
})

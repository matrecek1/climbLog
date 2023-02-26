import { Test, TestingModule } from '@nestjs/testing';
import { ClimbersController } from './climbers.controller';
import { ClimbersService } from './climbers.service';
import { ClimberUpdateDto, CreateClimberDto } from './climbers.types';

describe('ClimbersController', () => {
    let climbersController: ClimbersController;

    const mockClimbersService = {
        insert: jest.fn(climberInput => {
            return {
                ...climberInput,
                climbLogs: [],
                id: 1
            }
        }),
        findOne: jest.fn((_) => {
            return {
                id: 1,
                firstName:"Tom",
                lastName:"Dom",
                surname:"TomDom"
            }
        }),
        findAll: jest.fn(() => {
            return [{
                id: 1,
                firstName: "Tom",
                lastName: "Dom",
                surname: "TomDom"
            }, {
                id: 2,
                firstName: "test",
                lastName: "test",
                surname: "test"
            }]
        }),
        patch: jest.fn((id, patch) => {
            const boulder = {
                id: 1,
                firstName: "Tom",
                lastName: "Dom",
                surname: "TomDom"
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
            controllers: [ClimbersController],
            providers: [ClimbersService],
        }).overrideProvider(ClimbersService).useValue(mockClimbersService).compile();

        climbersController = module.get<ClimbersController>(ClimbersController);
    });


    it('Controller is defined', () => {
        expect(climbersController).toBeDefined()
    })


    describe('addClimber', () => {
        const climberInput: CreateClimberDto = {
            firstName: "Tom",
            lastName: "Dom",
            surname: "TomDom" 
        }
        it('should successfully return message and new climber', async () => {
            expect(await climbersController.addClimber(climberInput)).toStrictEqual({
                message: "Climber created!", climber: {
                    ...climberInput,
                    id: 1,
                    climbLogs: []
                }
            });
        });
        it('should call mockClimbersService.insert once', () => {
            expect(mockClimbersService.insert).toBeCalledTimes(1)
        })
        it('should call mockClimbersService.insert with correct params', () => {
            expect(mockClimbersService.insert).toHaveBeenCalledWith(climberInput)
        })
    });

    describe('getClimbers', () => {
        it('should return an array of climbers', async () => {
            const mockResult = [{
                id: 1,
                firstName: "Tom",
                lastName: "Dom",
                surname: "TomDom"
            }, {
                id: 2,
                firstName: "test",
                lastName: "test",
                surname: "test"
            }]
            expect(await climbersController.getClimbers()).toStrictEqual({ climbers: mockResult });
        });
        it('should call mockClimbersService.findAll once', () => {
            expect(mockClimbersService.findAll).toHaveBeenCalledTimes(1)
        })
    });
    describe('getClimber', () => {
        const mockResult = {
            id: 1,
            firstName: "Tom",
            lastName: "Dom",
            surname: "TomDom"
        }
        it('should return a climber', async () => {
            expect(await climbersController.getClimber(1)).toStrictEqual({
                climber: mockResult
            })
        })
        it('should call mockClimbersService.findOne with right params', () => {
            expect(mockClimbersService.findOne).toHaveBeenCalledWith(1)
        })
        it('should call mockClimbersService.findOne once', () => {
            expect(mockClimbersService.findOne).toHaveBeenCalledTimes(1)
        })
        it('should return from mockClimbersService.findOne right object', () => {
            expect(mockClimbersService.findOne).toHaveReturnedWith(mockResult)
        })
    })
    describe('patchClimber', () => {
        const mockUpdate: ClimberUpdateDto = {
            firstName:"Don",
            lastName:"Jon"
        }
        const mockResult = {
            firstName:"Don",
            lastName:"Jon",
            surname:"TomDom",
            id:1
        }
        it('should return a message and patched climber', async () => {
            expect(await climbersController.patchClimber(2, mockUpdate)).toStrictEqual({
                message: "Climber Updated!",
                updatedClimber: mockResult
            })
        })
        it('should return from service.patch valid obj', () => {
            expect(mockClimbersService.patch).toHaveReturnedWith(mockResult)
        })
        it('should call service.patch with right params', () => {
            expect(mockClimbersService.patch).toHaveBeenCalledWith(expect.any(Number), mockUpdate)
        })
    })
    describe('deleteClimber', () => {
        it('should return message of deletion', async () => {
            expect(await climbersController.deleteClimber(1)).toStrictEqual({
                message: "Climber deleted!"
            })
        })
        it('should should call service.delete', () => {
            expect(mockClimbersService.remove).toHaveBeenCalledTimes(1)
        })
        it('should should call service.delete with right id', () => {
            expect(mockClimbersService.remove).toHaveBeenCalledWith(1)
        })
    })
})
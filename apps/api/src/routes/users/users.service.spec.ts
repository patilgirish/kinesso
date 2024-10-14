import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UsersService } from './users.service';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockReturnValue(mockUser),
            constructor: jest.fn().mockReturnValue(mockUser),
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    jest.spyOn(model, 'create').mockResolvedValueOnce(mockUser as never);
    const result = await service.create(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should find all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce([mockUser]),
    } as never);
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should find a user by id', async () => {
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as never);
    const result = await service.findOne('a-user-id');
    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as never);
    const result = await service.update('a-user-id', mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should remove a user', async () => {
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as never);
    const result = await service.remove('a-user-id');
    expect(result).toEqual(mockUser);
  });
});

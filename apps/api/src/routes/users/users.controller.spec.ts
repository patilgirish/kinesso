import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockUser),
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findOne: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
            remove: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = mockUser;
    expect(await controller.create(dto)).toBe(mockUser);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should get all users', async () => {
    expect(await controller.findAll()).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a user', async () => {
    expect(await controller.findOne('1')).toBe(mockUser);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const dto: UpdateUserDto = { name: 'Jane Doe' };
    expect(await controller.update('1', dto)).toBe(mockUser);
    expect(service.update).toHaveBeenCalledWith('1', dto);
  });

  it('should remove a user', async () => {
    expect(await controller.remove('1')).toBe(mockUser);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});

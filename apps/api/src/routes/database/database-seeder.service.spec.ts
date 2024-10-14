import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { DatabaseSeederService } from './database-seeder.service';

jest.mock('axios');

describe('DatabaseSeederService', () => {
  let service: DatabaseSeederService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseSeederService,
        {
          provide: getModelToken(User.name),
          useValue: {
            countDocuments: jest.fn(),
            insertMany: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DatabaseSeederService>(DatabaseSeederService);
    model = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should seed users when database is empty', async () => {
    const mockUsers = [
      { name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
      { name: 'Jane Doe', email: 'jane@example.com', phone: '0987654321' },
    ];

    (model.countDocuments as jest.Mock).mockResolvedValue(0);
    (axios.get as jest.Mock).mockResolvedValue({ data: mockUsers });

    await service.seedUsers();

    expect(model.insertMany).toHaveBeenCalledWith(mockUsers);
  });

  it('should not seed users when database is not empty', async () => {
    (model.countDocuments as jest.Mock).mockResolvedValue(5);

    await service.seedUsers();

    expect(model.insertMany).not.toHaveBeenCalled();
  });
});

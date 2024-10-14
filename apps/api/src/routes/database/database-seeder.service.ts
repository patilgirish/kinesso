import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';

@Injectable()
export class DatabaseSeederService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async onModuleInit() {
    await this.seedUsers();
  }

  async seedUsers() {
    const count = await this.userModel.countDocuments();
    if (count > 0) {
      console.log('Database already seeded. Skipping seeding process.');
      return;
    }

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      const users = response.data.map((user) => ({
        name: user.name,
        email: user.email,
        phone: user.phone,
      }));

      await this.userModel.insertMany(users);
      console.log('Database seeded successfully.');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  }
}

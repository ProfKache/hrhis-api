import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUserResponse,
  UserInterface,
} from 'src/core/interfaces/user.interface';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  users: UserInterface[] = [];

  getUsers(): UserInterface[] {
    return this.users;
  }

  getUser(id: string): UserInterface {
    const user = this.users.find((user) => user.id === id);

    if (user) return user;
    throw new Error(`User with id: ${id} not found`);
  }

  getUserById(id: string): UserInterface {
    return this.users.find((user) => user.id === id);
  }

  // createUser(payload: UserInterface): UserInterface {
  //     return payload;
  // }
  async createUser(payload: UserInterface): Promise<UserInterface> {
    // check if user exists;
    if (!this.getUserById(payload.id)) {
      // this.users = [...this.users, payload]; // Avoids mutation of the array by creating a copy of it.
      // return { payload, message: 'Created' };
      const newUser = this.userRepository.create(payload);
      return await this.userRepository.save(newUser);
    }
    throw new Error('User Alread Exists!');
  }

  createUserWithMessage(payload: UserInterface): CreateUserResponse {
    this.users = [...this.users, payload];
    return { payload, message: 'Created' };
  }

  updateUser(id: string, payload: UserInterface): { message: string } {
    const user = this.getUserById(id);
    if (user) {
      const updatedUser: UserInterface = { ...user, ...payload };

      const index: number = this.users.findIndex(
        (user) => user.id === updatedUser.id,
      );

      this.users[index] = updatedUser;

      return { message: 'User Updated Successful!' };
    }
    throw new Error('User with ${id} not updated!');
  }

  deleteUser(id: string): { message: string } {
    const user = this.getUserById(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
      return { message: 'User Deleted Successful' };
    }
    throw new Error('User with ${id} Could not be deleted!');
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto, updateUserDto } from './user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alexander',
      email: 'heinzosesrunge@gmail.com',
    },
    {
      id: 2,
      name: 'Joachim',
      email: 'yoaoses@gmail.com',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(requestedId: number) {
    const position = this.findPosition(requestedId);
    return this.users[position];
  }

  create(data: createUserDto) {
    const newUser = {
      ...data,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  deleteUser(requestedId: number) {
    this.users.splice(this.findPosition(requestedId), 1);
    return {
      message: 'User Deleted',
    };
  }

  update(requestedId: number, changes: updateUserDto) {
    const position = this.findPosition(requestedId);
    const modifiedUser = {
      ...this.users[position],
      ...changes,
    };
    this.users[position] = modifiedUser;

    return modifiedUser;
  }

  private findPosition(requestedId: number) {
    const position = this.users.findIndex((user) => user.id === Number(requestedId));
    console.log('position: ', position);
    if (position === -1) {
      throw new NotFoundException(`Error, usuario con id ${requestedId} no existe`);
    }
    return position;
  }
}

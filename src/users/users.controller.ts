import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { createUserDto } from './user.dto';

interface User {
  id: number;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
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

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') requestedUserId: number) {
    const user = this.users.find((user) => user.id === requestedUserId);
    if (!user) {
      throw new NotFoundException(`Error, usuario con id ${requestedUserId} no existe`);
    }
    return user;
  }

  @Post()
  createUser(@Body() body: createUserDto) {
    const newUser = {
      ...body,
      id: this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id') userToDelete: number) {
    const position = this.users.findIndex((user) => user.id == userToDelete);
    if (position === -1) {
      throw new NotFoundException(`Error, usuario con id ${userToDelete} no existe`);
    }
    this.users.splice(position, 1);
    return {
      message: 'User Deleted',
    };
  }

  @Put(':id')
  modifyUser(@Param('id') userToModify: number, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id == userToModify);
    if (position === -1) {
      throw new NotFoundException(`Error, usuario con id ${userToModify} no existe`);
    }
    const email = changes?.email;
    if (email && !email.includes('@')) {
      throw new UnprocessableEntityException(`Email no es válido`);
    }
    const modifiedUser = {
      ...this.users[position],
      ...changes,
    };
    this.users[position] = modifiedUser;

    return modifiedUser;
  }
}

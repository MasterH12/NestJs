import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id', ParseIntPipe) requestedUserId: number) {
    const user = this.usersService.findOne(requestedUserId);
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = this.usersService.create(body);
    return newUser;
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) userToDelete: number) {
    return this.usersService.deleteUser(userToDelete);
  }

  @Put(':id')
  modifyUser(@Param('id', ParseIntPipe) userToModify: number, @Body() changes: UpdateUserDto) {
    return this.usersService.update(userToModify, changes);
  }
}

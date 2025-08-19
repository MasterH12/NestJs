import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto, updateUserDto } from './user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({});
  }

  async findOne(requestedId: number) {
    return await this.findIfExists(requestedId);
  }

  async create(data: createUserDto) {
    try{
      const newUser = await this.usersRepository.save(data);
      return newUser;
    } catch (error){
      throw new BadRequestException('Error creating user');
    }
    
  }

  async deleteUser(requestedId: number) {
    this.usersRepository.delete({id: requestedId});
    return {
      message: 'User Deleted',
    };
  }

  async update(requestedId: number, changes: updateUserDto) {
    const user  = await this.findIfExists(requestedId);
    const modifiedUser = await this.usersRepository.merge( user, changes );
    return await this.usersRepository.save(modifiedUser);
  }

  private async findIfExists(requestedId: number) {
    const user = await this.usersRepository.findOneBy({id: requestedId});
    if (!user) {
      throw new NotFoundException(`Error, usuario con id ${requestedId} no existe`);
    }
    return user;
  }
}

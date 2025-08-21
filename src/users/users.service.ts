import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      relations: ['profile']
    });
  }

  async findOne(requestedId: number) {
    return await this.findIfExists(requestedId);
  }

  async create(data: CreateUserDto) {
    try{
      const createdUser = await this.usersRepository.create(data);
      const newUser = await this.usersRepository.save(createdUser);
      return newUser;
    } catch (error){
      console.log("Error: ", error);
      throw new BadRequestException('Error creating user');
    }
    
  }

  async deleteUser(requestedId: number) {
    this.usersRepository.delete({id: requestedId});
    return {
      message: 'User Deleted',
    };
  }

  async update(requestedId: number, changes: UpdateUserDto) {
    const user  = await this.findIfExists(requestedId);
    const modifiedUser = await this.usersRepository.merge( user, changes );
    return await this.usersRepository.save(modifiedUser);
  }

  private async findIfExists(requestedId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: requestedId },
      relations: [ 'profile' ],
    });
    if (!user) {
      throw new NotFoundException(`Error, usuario con id ${requestedId} no existe`);
    }
    return user;
  }

  async getUserByEmail(requestedEmail : string){
    return this.usersRepository.findOne({where: {email: requestedEmail}})
  }
}

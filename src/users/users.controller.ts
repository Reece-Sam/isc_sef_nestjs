import { Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe} from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // get all users (/users) or /users?role=value
  getAllUsers(@Query('priority') priority?: 'HIGH' | 'MEDIUM' | 'LOW') {
    return this.usersService.findAll(priority);
  }

  @Get(':id') // get user by id
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findone(id);
  }

  @Post() // create a new user
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // get user by id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdateDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdateDto);
  }

  @Delete(':id') // delete user by id
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

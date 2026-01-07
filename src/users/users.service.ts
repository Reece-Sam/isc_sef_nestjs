import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      trophy: 'carabao cup',
      club: 'chelsea',
      priority: 'low',
    },
    {
      id: 2,
      trophy: 'fa cup',
      club: 'chelsea',
      priority: 'medium',
    },
    {
      id: 3,
      trophy: 'premier league',
      club: 'chelsea',
      priority: 'high',
    },
    {
      id: 4,
      trophy: 'champions league',
      club: 'chelsea',
      priority: 'high',
    },
    {
      id: 5,
      trophy: 'super cup',
      club: 'chelsea',
      priority: 'hign',
    },
  ];

  findAll(priority?: 'HIGH' | 'MEDIUM' | 'LOW') {
    if (priority) {
      const rolesArray = this.users.filter((user) => user.priority === priority);
      if (rolesArray.length === 0) throw new NotFoundException('No users with this priority');
      return rolesArray;  
    }
    return this.users;
  }

  findone(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findone(id);
  }

  delete(id: number) {
    const removedUser = this.findone(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}

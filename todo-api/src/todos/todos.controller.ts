import { Controller, Get, Post, Patch, Delete, Param, Body,} from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body('title') title: string) {
    return this.todosService.create(title);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('completed') completed: boolean) {
    return this.todosService.update(Number(id), completed);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.todosService.delete(Number(id));
    return { message: 'Todo deleted' };
  }
}

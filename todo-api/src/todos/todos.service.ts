import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodosService {
  private todos: Todo[] = [];

  create(title: string): Todo {
    const todo: Todo = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  update(id: number, completed: boolean): Todo {
    const todo = this.findOne(id);
    if (todo) {
      todo.completed = completed;
    }
    return todo;
  }

  delete(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

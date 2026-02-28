import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);

  tasks = signal<Task[]>([]);
  private todoUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

  loadTasks(){
    this.http.get<Task[]>(this.todoUrl)
    .subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Error loading tasks', err) 
    });
  }

  addTask(task : Task){
    this.tasks.update(current => [task, ...current]);
  }

  deleteTask(id: number){
    this.tasks.update(current => current.filter(t => t.id !== id));
  }

  toggleTask(id : number){
    this.tasks.update(current => current.map(task=>
      task.id === id ? {...task, completed : !task.completed} : task
    ))
  }
}

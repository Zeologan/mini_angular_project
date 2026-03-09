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
    const stored = localStorage.getItem('tasks');

    if(stored){
      this.tasks.set(JSON.parse(stored));
      return;
    }

    this.http.get<Task[]>(this.todoUrl).subscribe(data => {
      this.tasks.set(data);
      localStorage.setItem('tasks', JSON.stringify(data));
    })
  }

  addTask(task : Task){
    // this.tasks.update(current => [task, ...current]);
    this.tasks.update(current => {
      const updated = [task, ...current];
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    })
  }

  deleteTask(id: number){
    // this.tasks.update(current => current.filter(t => t.id !== id));
    this.tasks.update(current => {
      const updated = current.filter(t => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updated));
      return updated;
    });
  }

  toggleTask(id : number){
    this.tasks.update(current => current.map(task=>
      task.id === id ? {...task, completed : !task.completed} : task
    ))
  }
}

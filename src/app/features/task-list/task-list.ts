import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  taskService = inject(TaskService);
  // tasks : any;

  ngOnInit(): void {
    this.taskService.loadTasks();
  }

  getTasks(){
    return this.taskService.tasks();
  }

  delete(id: number){
    this.taskService.deleteTask(id);
  }

  toggle(id: number){
    this.taskService.toggleTask(id);
  }

  trackById(index: number, task: any){
    return task.id;
  }
}

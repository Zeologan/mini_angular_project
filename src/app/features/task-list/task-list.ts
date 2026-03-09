import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FilterPipe } from '../../shared/filter-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FilterPipe, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  filter: string = "all";
  searchText: string = "";
  taskService = inject(TaskService);
  // tasks : any;

  ngOnInit(): void {
    if (this.taskService.tasks().length === 0) {
      this.taskService.loadTasks();
    };
  }

  getTasks() {
    return this.taskService.tasks();
  }

  delete(id: number) {
    this.taskService.deleteTask(id);
  }

  toggle(id: number) {
    this.taskService.toggleTask(id);
  }

  trackById(index: number, task: any) {
    return task.id;
  }

  get filteredTasks() {
    return this.getTasks().filter((t: any) =>
      t.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}

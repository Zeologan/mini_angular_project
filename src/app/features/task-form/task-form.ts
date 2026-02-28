import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb  = inject(FormBuilder);
  private taskService = inject(TaskService);

  form = this.fb.group({
    title: [''],
  });


  addTask() {
    const newTask = {
      id: Date.now(),
      title: this.form.value.title!,
      completed: false,
    };
    this.taskService.addTask(newTask);
    this.form.reset();
  }
}

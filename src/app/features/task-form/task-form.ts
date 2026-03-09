import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
  });


  submit() {
    if (this.taskForm.invalid) return;

    const newTask = {
      id: Date.now(),
      title: this.taskForm.value.title!,
      completed: false,
    };

      this.taskService.addTask(newTask);
      this.taskForm.reset();

      this.router.navigate(['/tasks']);
    }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../core/model/task.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform( tasks : Task[], status : string): Task[] {
    if(!tasks) return [];

    if(status === 'completed'){
      return tasks.filter(t=> t.completed);
    }

    if(status === 'pending'){
      return tasks.filter(t=> !t.completed);
    }
    return tasks;
  }

}

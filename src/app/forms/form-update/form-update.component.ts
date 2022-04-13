import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TasksService } from '../../shared/tasks.service';


@Component({
  selector: 'app-form-update',
  templateUrl: './form-update.component.html',
  styleUrls: ['./form-update.component.less']
})
export class FormUpdateComponent implements OnInit {

  @Input() taskUpdate!: Task;
  @Input() tasks!: Task[];
  @Output() closeFormUpdate = new EventEmitter();

  form!: FormGroup;

  constructor(public tasksService: TasksService) { }

  ngOnInit(): void {
      this.form = new FormGroup({
        title: new FormControl(this.taskUpdate.title, Validators.required)
      })
  }

  submit() {
      const {title} = this.form.value;
      this.taskUpdate.title = title;
      this.tasksService.update(this.taskUpdate).subscribe(taskUpdate => {

          this.tasks.forEach((task, i) => {
              if (task.id === taskUpdate.id) {
                  this.tasks.splice(i, 1, taskUpdate);
              }
              
              return this.tasks;
         })
      }, err => console.error(err))

      this.closeFormUpdate.emit();   
  }
  
}

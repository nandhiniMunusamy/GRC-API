import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormControl, FormGroup ,FormBuilder} from '@angular/forms';
import { JsonService } from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: any = [];
  data:any;
  createData : boolean = false;
  newTaskForm :FormGroup |any;
  newTask : any = {};
  message: string = '';
  success: boolean = false;
  datass: boolean = false;

  constructor(private api:ApiService,private json:JsonService,private fb:FormBuilder){
    this.newTaskForm = this.fb.group({
      name: [''],
      description: [''],
      status: [true],
      priority: [0],
      suggested_solution: [''],
      assigned_date: [''],
      closing_date: [''],
      assignee: [null]
    });
  }
  ngOnInit(){
    this.getTasks();
  }

  getTasks(){
    // api file
    this.api.getTasks().subscribe((res) => {
        this.tasks = res;
      }
    );
    // json file
    this.json.getTasks().subscribe((res:any)=>{
      this.tasks = res;
    })
  }
  createTaskForm(){
    this.createData = true;
  }

  createTask(){
    this.createData = false;
    this.newTask = this.newTaskForm.value;
    //api file
    this.api.createTask(this.newTask).subscribe((res) => {
        this.getTasks();
      });
    //json file
    this.json.createTask(this.newTask).subscribe((response: any) => {
      this.tasks.push(response);
    });
  }

  updateTaskStatus(taskId: any, status: boolean){
    let i = taskId.id;
    //api file
    this.api.updateTask(i, status).subscribe((res) => {
        this.getTasks();
      });

    taskId.status = true;
    let teskSta = taskId.status;
    //json file
    this.json.updateTask(i,teskSta).subscribe(res=>{
      this.getTasks();
    })
  }

  deleteTask(taskId: any){
    let i = taskId.id
     //api file
    this.api.deleteTask(i).subscribe((res) => {
        this.getTasks();
      });
      //json file
    this.json.deleteTask(i).subscribe(res=>{
      this.getTasks();
    })
  }

}

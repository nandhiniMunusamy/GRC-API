import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'http://65.2.51.31:9008/api/task-viewset/';
  constructor(public http: HttpClient) { }

    getTasks(){
      return this.http.get<any>(this.baseURL);
    }

    createTask(task: any){
      return this.http.post<any>(this.baseURL, task);
    }

    updateTask(taskId: number, status: boolean){
      const body = { status: status };
      return this.http.post<any>(this.baseURL+taskId+'/', body);
    }

    deleteTask(taskId: number){
      const url = this.baseURL+taskId;
      return this.http.delete<any>(url);
    }
}

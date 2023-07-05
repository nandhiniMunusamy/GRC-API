import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  private mockDataURL = 'http://localhost:3000/task';

  constructor(private http: HttpClient) {}

  getTasks(){
    return this.http.get<any>(this.mockDataURL);
  }

  createTask(task: any){
    return this.http.post(this.mockDataURL, task);
  }

  updateTask(taskId: number, status: boolean){
    return this.http.put(this.mockDataURL+'/'+taskId, status);
  }

  deleteTask(taskId: number){
    return this.http.delete(this.mockDataURL+'/'+taskId);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyTaskService {
  constructor(private http: HttpClient) {}

  getCompanyMembers(from: any, to: any, text?: any): Observable<any> {
    return this.http
      .get('api/CompanyMembers?from=' + from + '&text=' + text + '&to=' + to)
      .pipe(map((res) => res));
  }
  getTasksAssignedByMe(data: any): Observable<any> {
    return this.http
      .post('api/Task/UserTasksAssignedByMe', data)
      .pipe(map((res) => res));
  }
  getTasksMyTask(data: any): Observable<any> {
    return this.http
      .post('api/Task/UserTasksAssignedToMe', data)
      .pipe(map((res) => res));
  }
  getTasksCc(data: any): Observable<any> {
    return this.http.post('api/Task/OwnerTasks', data).pipe(map((res) => res));
  }
  getTasksArchive(data: any): Observable<any> {
    return this.http
      .post('api/Task/UserTasksAssignedByMe', data)
      .pipe(map((res) => res));
  }

  getLeadList(params: any): Observable<any> {
    return this.http.post<any>('api/CRM/Leads', params).pipe(map((res) => res));
  }
  addTask(data: any): Observable<any> {
    return this.http.post('api/Task/AssignTask', data).pipe(map((res) => res));
  }
  archiveTask(params: any): Observable<any> {
    return this.http.post('api/Task/Archive', params).pipe(map((res) => res));
  }
  acceptTask(taskId: number): Observable<any> {
    const params = {
      TaskId: taskId,
      TaskStatusValue: 0,
    };
    return this.http
      .post('api/Task/UpdateTaskStatus', params)
      .pipe(map((res) => res));
  }

  completeTask(params: any): Observable<any> {
    return this.http
      .post('api/Task/UpdateTaskStatus', params)
      .pipe(map((res) => res));
  }
  deleteTask(taskId: number): Observable<any> {
    return this.http
      .get('api/Task/DeleteTask?taskId=' + taskId)
      .pipe(map((res) => res));
  }
  
  getPartialCompleteStatus(): Observable<any> {
    return this.http.get('api/Task/UserTaskStatusMaster')
      .pipe(
        map(res => res)
      );
  }

  partialCompleteTask(taskId: number, taskStatusValue: number): Observable<any> {
    const params = {
      TaskId: taskId,
      TaskStatusValue: taskStatusValue
    }
    return this.http.post('api/Task/UpdateTaskStatus', params)
      .pipe(
        map(res => res)
      );
  }
  
  getTaskCoverage(taskId: number): Observable<any> {
    return this.http.get('api/Task/StatusReport?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }
  getTaskDetails(taskId: number): Observable<any> {
    return this.http.get('api/Task/UserTaskDetails?taskId=' + taskId)
      .pipe(
        map(res => res)
      );
  }
  getName(name:any) :any{
    let filename = (/[^/]*$/.exec(name))
    let updated_name = filename && filename.length ? filename[0] : '';
    return updated_name;
  }
  getExtension(extention: any) :any{
    let fileextention = (/[^.]*$/.exec(extention));
    let updated_fileExtention = fileextention && fileextention.length ? fileextention[0] : '';
    return updated_fileExtention;
  }

}

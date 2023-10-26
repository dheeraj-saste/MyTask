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

  getLeadList(params: any): Observable<any> {
    return this.http.post<any>('api/CRM/Leads', params).pipe(map((res) => res));
  }
  addTask(data: any): Observable<any> {
    return this.http.post('api/Task/AssignTask', data).pipe(map((res) => res));
  }
}

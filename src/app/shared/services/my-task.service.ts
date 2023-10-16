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
}

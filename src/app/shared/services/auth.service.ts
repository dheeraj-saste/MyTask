import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,) { }
  baseUrl: any = environment.baseUrl;

  login(Username:any,Password:any) {
    return this.http.post<any>(this.baseUrl + 'api/account/authenticate', { Username, Password });
  }
}

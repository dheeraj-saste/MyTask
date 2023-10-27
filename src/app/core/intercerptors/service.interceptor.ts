import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {
  constructor(private toastr: ToastrService, private router :Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('accessToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
      
    }

    return next.handle(request).pipe(tap((res: any) => {
      
      if (res instanceof HttpResponse) {
        if (res.body.Status == 401) { 
         
          this.router.navigate(['/auth/login'])
        }
      }
    },
      (error) => {
      this.toastr.error('Something went Wrong')
    }));
  }
}

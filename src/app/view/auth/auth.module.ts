import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/Angular-Material/angular-material.module';
import { LoginComponent } from './login/login.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ServiceInterceptor } from 'src/app/core/intercerptors/service.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const route: Route[] = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, RouterModule.forChild(route), AngularMaterialModule, ToastrModule],
  providers: [ServiceInterceptor, ToastrService,{
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  },
  ]
})
export class AuthModule {}

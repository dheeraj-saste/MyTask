import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AngularMaterialModule } from 'src/app/Angular-Material/angular-material.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyformatPipe } from 'src/app/core/pipes/currencyformat.pipe';

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
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    AngularMaterialModule,
    ToastrModule,
    SharedModule,
    CoreModule,
  ],
  providers: [ToastrService,CurrencyformatPipe,CurrencyPipe],
})
export class AuthModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './Angular-Material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/authenticate.guard';
import { ReverseGuard } from './core/guards/reverse.guard';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ServiceInterceptor } from './core/intercerptors/service.interceptor';



@NgModule({
  declarations: [AppComponent,  ],
  imports: [
    BrowserModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  exports:[AngularMaterialModule],
  providers: [
    AuthGuard,
    ReverseGuard,
    ToastrService,
    ServiceInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

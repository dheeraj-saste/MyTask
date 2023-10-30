import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { AngularMaterialModule } from '../Angular-Material/angular-material.module';




@NgModule({
  declarations: [
    HeaderComponent,
    
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[HeaderComponent]
})
export class SharedModule { }

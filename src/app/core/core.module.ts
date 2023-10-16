import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [NumberOnlyDirective, DatePipe],
  imports: [CommonModule, HttpClientModule],
  exports: [NumberOnlyDirective, DatePipe],
  
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { DatePipe } from './pipes/date.pipe';
import { CurrencyformatPipe } from './pipes/currencyformat.pipe';

@NgModule({
  declarations: [NumberOnlyDirective, DatePipe, CurrencyformatPipe],
  imports: [CommonModule, HttpClientModule],
  exports: [NumberOnlyDirective, DatePipe,CurrencyformatPipe],
  
})
export class CoreModule {}

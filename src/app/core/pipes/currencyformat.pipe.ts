import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyformat',
})
export class CurrencyformatPipe implements PipeTransform {
  transform(value: any, ...args: any[]): string {
    if (value) {
      const currency = value.toLocaleString('en-IN');

      return currency;
    }
    return value;
  }
}

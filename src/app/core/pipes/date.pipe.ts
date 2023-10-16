import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: string | Date, format: string): string {
    debugger
    if (!value) return '';

    const date = new DatePipe();
    value = new Date(value);
    return date.transform(value, format);
  }
}

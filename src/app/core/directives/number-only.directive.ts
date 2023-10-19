import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {
  constructor(private elementref: ElementRef) {}
  @HostListener('input', ['$event']) input(event: Event): void {
    let text = event.target as HTMLInputElement;
    let value = text.value.replace(/[^0-9]/g, '');
    if (value.length > 10) {
      value = value.slice(0, 10);
    }
    text.value = value;
  }
}

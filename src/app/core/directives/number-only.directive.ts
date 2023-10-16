import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
})
export class NumberOnlyDirective {
  constructor(private elementref: ElementRef) {}
  @HostListener('input', ['$event']) input(event: Event): void {
    let text = event.target as HTMLInputElement;
    const value = text.value.replace(/[^0-9]/g, '');
    text.value = value;
  }
}

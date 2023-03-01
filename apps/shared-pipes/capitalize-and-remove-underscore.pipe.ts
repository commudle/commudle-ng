import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndRemoveUnderscore',
})
export class CapitalizeAndRemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    let frags = value.split('_');
    frags = frags.map((item: string) => item.charAt(0).toUpperCase() + item.slice(1));
    return frags.join(' ');
  }
}

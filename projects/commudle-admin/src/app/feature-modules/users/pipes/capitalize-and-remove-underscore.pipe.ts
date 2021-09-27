import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndRemoveUnderscore',
})
export class CapitalizeAndRemoveUnderscorePipe implements PipeTransform {
  transform(value: string): string {
    const frags = value.split('_');
    for (let i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numkeys', pure: false })
export class NumkeysPipe implements PipeTransform {

  transform(object: Object): number {
    console.log(object);
    console.log(Object.keys(object).length);
    return Object.keys(object).length;
  }
}

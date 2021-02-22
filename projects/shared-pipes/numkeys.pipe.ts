import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numkeys', pure: false })
export class NumkeysPipe implements PipeTransform {

  transform(object: Object): number {
    return Object.keys(object).length;
  }
}

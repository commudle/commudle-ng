import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<any>, args: Array<string>, order: Array<'asc' | 'desc'>): any {
    return _.sortBy(value, args, order);
  }
}

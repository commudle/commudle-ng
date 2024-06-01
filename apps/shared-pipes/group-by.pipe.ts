import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'groupByDate',
})
export class GroupByDatePipe implements PipeTransform {
  transform(items: any[], field: string): any {
    if (!items) return [];
    const grouped = items.reduce((result, item) => {
      const date = moment(item[field]).format('Do, MMM YYYY');
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(item);
      return result;
    }, {});
    return Object.keys(grouped).map((key) => ({ date: key, slots: grouped[key] }));
  }
}

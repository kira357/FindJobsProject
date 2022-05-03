import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): unknown {
    if (!items || !field || !value) {
      return items;
    }
    return items.filter(item =>item[field] && item[field].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

}

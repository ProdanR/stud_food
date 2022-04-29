import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getFractionalPart'
})
export class GetFractionalPartPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let int_part = Math.trunc(value);
    let float_part = (value - int_part).toFixed(2).substring(2);
    return float_part;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDecimalPart'
})
export class GetDecimalPartPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return Math.trunc(value);
  }

}

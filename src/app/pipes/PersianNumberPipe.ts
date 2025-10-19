import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {
  private persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

  transform(
    value: number | string | null | undefined,
    isPrice: boolean = false,
    toPersian: boolean = true
  ): string {
    if (value === null || value === undefined) return '';

    let s = String(value);

    if (isPrice) {
      const num = Number(value);
      if (!isNaN(num)) {
        s = num.toLocaleString('en-US');
      }
    }

    if (!toPersian) return s;

    return s.replace(/\d/g, (d) => this.persianDigits[+d]);
  }

}

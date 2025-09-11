import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianNumber',
  standalone: true
})
export class PersianNumberPipe implements PipeTransform {
  private persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

  transform(value: number | string | null | undefined, toPersian: boolean = true): string {
    if (value === null || value === undefined) return '';
    const s = String(value);
    if (!toPersian) return s;
    return s.replace(/\d/g, (d) => this.persianDigits[+d]);
  }
}

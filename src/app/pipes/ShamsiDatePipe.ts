import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name: 'shamsi',
  standalone: true
})
export class ShamsiDatePipe implements PipeTransform{
    transform(value: string | Date | undefined, format: 'short' | 'long' | 'time'): string {
      if(!value) return '';
      const date = new Date(value);
      const options: Intl.DateTimeFormatOptions = {
        calendar: 'persian',
        numberingSystem: 'persian', // استفاده از اعداد فارسی
      };
      if (format === 'short') {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        // خروجی: ۱۴۰۲/۰۵/۱۰
      }
      else if (format === 'long') {
        options.year = 'numeric';
        options.month = 'long';
        options.day = 'numeric';
        options.weekday = 'long';
        // خروجی: سه‌شنبه، ۱۰ مرداد ۱۴۰۲
      }
      else if (format === 'time') {
        options.year = 'numeric';
        options.month = '2-digit';
        options.day = '2-digit';
        options.hour = '2-digit';
        options.minute = '2-digit';
        // خروجی: ۱۴۰۲/۰۵/۱۰ - ۱۲:۳۰
      }

      return new Intl.DateTimeFormat('fa-IR', options).format(date);

    }

}

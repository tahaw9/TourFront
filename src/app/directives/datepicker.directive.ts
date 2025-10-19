import {
  Directive,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Input,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare const $: any;

export interface DatepickerOptions {
  // Core Settings
  calendar?: 'gregorian' | 'persian' | 'hijri';
  locale?: 'en' | 'fa' | 'ar';
  format?: string;
  rtl?: boolean|null;
  theme?: 'light' | 'dark';

  // Time Picker Settings
  timePicker?: boolean;
  timeFormat?: 'HH:mm' | 'HH:mm:ss' | 'hh:mm A' | string;
  showSeconds?: boolean;
  use24Hour?: boolean;
  stepping?: 1 | 5 | 15 | 30;

  // UI Behavior
  placement?: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
  showToday?: boolean;
  showClear?: boolean;
  showClose?: boolean;
  autoClose?: boolean;
  hideAfterSelect?: boolean;
  keyboardNavigation?: boolean;
  todayHighlight?: boolean;
  allowInput?: boolean;

  // Date Constraints
  minDate?: string|null;
  maxDate?: string|null;
  disabledDates?: string[];
  disabledDays?: number[];

  // Auto-Correction Settings
  autoCorrectionTimeout?: number;

  // Optional: قابلیت گسترش آینده
  [key: string]: any;
}

@Directive({
  selector: '[appDatepicker]',
  exportAs: 'appDatepicker'
})
export class DatepickerDirective implements AfterViewInit, OnDestroy {
  @Input('appDatepicker') options?: DatepickerOptions;

  private initialized = false;

  constructor(
    private el: ElementRef<HTMLInputElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    // فقط در مرورگر اجرا شود
    if (!isPlatformBrowser(this.platformId)) return;

    const input = this.el.nativeElement;

    if (!(input instanceof HTMLInputElement)) {
      console.error('[appDatepicker] element is not an <input>.');
      return;
    }

    if (typeof $ === 'undefined' || !$.fn.multiCalendarDatePicker) {
      console.error('[appDatepicker] jQuery or multiCalendarDatePicker plugin not found.');
      return;
    }

    // مقادیر پیش‌فرض کامل برای تمام گزینه‌ها
    const defaultOptions: DatepickerOptions = {
      calendar: 'persian',
      locale: 'fa',
      format: 'YYYY/MM/DD',
      rtl: true,
      theme: 'light',
      timePicker: false,
      timeFormat: 'HH:mm',
      showSeconds: false,
      use24Hour: true,
      stepping: 1,
      placement: 'bottom-start',
      showToday: true,
      showClear: true,
      showClose: true,
      autoClose: true,
      hideAfterSelect: true,
      keyboardNavigation: true,
      todayHighlight: true,
      allowInput: true,
      minDate: null,
      maxDate: null,
      disabledDates: [],
      disabledDays: [],
      autoCorrectionTimeout: 3000
    };

    // merge مقادیر ورودی با پیش‌فرض
    const finalOptions: DatepickerOptions = { ...defaultOptions, ...(this.options || {}) };

    try {
      $(input).multiCalendarDatePicker(finalOptions);
      this.initialized = true;
    } catch (err) {
      console.error('[appDatepicker] initialization failed:', err);
    }
  }

  getDate(): string | null {
    if (!this.initialized || typeof $ === 'undefined') return null;
    try {
      return $(this.el.nativeElement).multiCalendarDatePicker('getFormattedDate');
    } catch (err) {
      console.error('[appDatepicker] getDate failed:', err);
      return null;
    }
  }

  ngOnDestroy(): void {
    if (!this.initialized || !isPlatformBrowser(this.platformId)) return;

    const input = this.el.nativeElement;
    try {
      $(input).multiCalendarDatePicker('destroy');
    } catch {}
  }
}

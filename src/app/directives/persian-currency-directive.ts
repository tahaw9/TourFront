import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {PersianNumberPipe} from '../pipes/PersianNumberPipe';
import {NgModel} from '@angular/forms';
@Directive({
  selector: '[persianCurrency]',
  standalone: true,
  providers: [PersianNumberPipe]
})
export class PersianCurrencyDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2,
    private persianPipe: PersianNumberPipe,
    private ngModel: NgModel
  ) {}


  ngAfterViewInit() {
    // اعمال فرمت اولیه بعد از این که ngModel مقدار اولیه گرفت
    setTimeout(() => {
      const value = this.ngModel.model;
      if (value != null && value !== '') {
        this.formatAndSet(value.toString());
      }
    });
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = this.el.nativeElement;
    this.formatAndSet(input.value);
  }

  private formatAndSet(rawValue: string) {
    const input = this.el.nativeElement;

    const digits = rawValue.replace(/[^\d۰-۹]/g, '');
    const english = digits.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    const clean = english.replace(/[^\d]/g, '');

    if (this.ngModel.valid) {
      this.ngModel.viewToModelUpdate(clean);
    }

    const formatted = this.persianPipe.transform(clean, true, true);

    this.renderer.setProperty(input, 'value', formatted);
  }
}

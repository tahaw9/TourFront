import { Injectable } from '@angular/core';

declare var $: any;
declare var AOS: any;

@Injectable({
  providedIn: 'root'
})
export class PluginInitializer {

  constructor() { }

  public initAll(): void {
    this.initNiceSelect();
    this.initAOS();
    this.initSlick();
    this.initMagnificPopup();
  }

  private initNiceSelect() {
    const $filters = $('.select-nice');
    if ($filters.length) {
      if ($filters.next('.nice-select').length) {
        $filters.niceSelect('update');
      } else {
        $filters.niceSelect();
      }
    }
  }


  public initAOS(update: boolean = false) {
    debugger
    if (typeof AOS !== 'undefined') {
      if (update) {
        AOS.refreshHard();
      }
      else {
        AOS.init();
      }
    }
  }

  private initSlick() {
    const $slicks = $('.your-slick-class');
    $slicks.each((_: number, element: HTMLElement) => {
      const $this = $(element);
      if ($this.hasClass('slick-initialized')) {
        $this.slick('unslick');
      }
      $this.slick({
        autoplay: true,
        dots: true
        // تنظیمات دلخواه
      });
    });
  }


  private initMagnificPopup() {
    $('.popup-link').magnificPopup({
      type: 'image'
      // یا تنظیمات دیگه
    });
  }
}

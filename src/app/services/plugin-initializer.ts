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
    debugger
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
        // optional logics
      });
    });
  }


  private initMagnificPopup() {
    $('.popup-link').magnificPopup({
      type: 'image'
      // optional logics
    });
  }
}

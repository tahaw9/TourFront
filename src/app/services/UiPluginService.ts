// src/app/services/ui-plugin.service.ts
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

type ListenerRecord = { target: EventTarget, type: string, handler: EventListenerOrEventListenerObject };

@Injectable({ providedIn: 'root' })
export class UiPluginService {
  private renderer: Renderer2;

  // for preventing duplicate initialization per element
  private initializedElements = new WeakMap<Element, boolean>();

  // global flags to avoid multiple window listeners
  private windowListenersBound = new Map<string, boolean>();

  // store listeners so we can remove them in destroyAll
  private boundListeners: ListenerRecord[] = [];

  // selectors
  private mobileWidth = 992;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // ---------------------------
  // Generic helpers
  // ---------------------------
  private isInit(el: Element | null) {
    return !!el && !!this.initializedElements.get(el);
  }
  private markInit(el: Element | null) {
    if (el) this.initializedElements.set(el, true);
  }

  private onceBindWindowEvent(type: string, handler: EventListener) {
    if (this.windowListenersBound.get(type)) return;
    window.addEventListener(type, handler);
    this.windowListenersBound.set(type, true);
    this.boundListeners.push({ target: window, type, handler });
  }

  private bindListener(target: EventTarget, type: string, handler: EventListener) {
    target.addEventListener(type, handler);
    this.boundListeners.push({ target, type, handler });
  }

  private removeAllBoundListeners() {
    this.boundListeners.forEach(l => {
      try {
        (l.target as any).removeEventListener(l.type, l.handler);
      } catch (e) { /* ignore */ }
    });
    this.boundListeners = [];
    this.windowListenersBound.clear();
  }

  // slide toggle animation (idempotent)
  private slideToggleElement(el: Element, duration = 300, hide = false) {
    const e = el as HTMLElement;
    if (!e) return;

    if (hide) {
      if (getComputedStyle(e).display === 'none') return;
      const start = e.scrollHeight;
      e.style.height = start + 'px';
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      e.offsetHeight;
      e.style.transition = `height ${duration}ms ease`;
      e.style.height = '0px';
      setTimeout(() => {
        e.style.display = 'none';
        e.style.height = '';
        e.style.transition = '';
      }, duration);
    } else {
      if (getComputedStyle(e).display !== 'none' && e.offsetHeight > 0) return;
      e.style.removeProperty('display');
      let display = getComputedStyle(e).display;
      if (display === 'none') display = 'block';
      e.style.display = display;
      const height = e.scrollHeight;
      e.style.height = '0px';
      // force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      e.offsetHeight;
      e.style.transition = `height ${duration}ms ease`;
      e.style.height = height + 'px';
      setTimeout(() => {
        e.style.height = '';
        e.style.transition = '';
      }, duration + 20);
    }
  }

  private hasDirectDropdownBtn(parent: Element) {
    return Array.from(parent.children).some(c => c.classList.contains('dropdown-btn'));
  }

  // ---------------------------
  // Preloader (window load)
  // ---------------------------
  initPreloader() {
    const pre = document.querySelector('.preloader') as HTMLElement | null;
    if (!pre) return;
    if ((pre as any).__ui_preloader_inited) return;
    (pre as any).__ui_preloader_inited = true;

    // jQuery original: $('.preloader').delay(200).fadeOut(500);
    setTimeout(() => {
      this.renderer.setStyle(pre, 'transition', 'opacity 0.5s');
      this.renderer.setStyle(pre, 'opacity', '0');
      setTimeout(() => {
        this.renderer.setStyle(pre, 'display', 'none');
      }, 500);
    }, 200);
  }

  // bind to window 'load' event once
  bindWindowLoadForPreloader() {
    this.onceBindWindowEvent('load', () => this.initPreloader());
  }

  // ---------------------------
  // Header Style and scroll-to-top
  // ---------------------------
  initHeaderStyle() {
    const header = document.querySelector('.main-header');
    const scrollLink = document.querySelector('.scroll-top') as HTMLElement | null;
    if (!header || !scrollLink) return;

    if (this.isInit(header)) {
      // update current state once
      this.updateHeaderState(header, scrollLink, 250);
      return;
    }
    this.markInit(header);

    // initial call (document.ready version used threshold 250)
    this.updateHeaderState(header, scrollLink, 250);

    // on scroll (separate handler in original used threshold 100)
    const onScroll = () => this.updateHeaderState(header, scrollLink, 100);
    this.onceBindWindowEvent('scroll', onScroll);
  }

  private updateHeaderState(header: Element, scrollLink: HTMLElement, threshold: number) {
    const pos = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (pos >= threshold) {
      header.classList.add('fixed-header');
      scrollLink.style.display = 'block';
    } else {
      header.classList.remove('fixed-header');
      scrollLink.style.display = 'none';
    }
  }

  // ---------------------------
  // handle the small JS piece in original: if main-menu .navbar-toggle click, hide some dropdowns
  initMainMenuNavbarToggleBehavior() {
    const toggles = Array.from(document.querySelectorAll('.main-header .main-menu .navbar-toggle'));
    toggles.forEach(t => {
      const el = t as HTMLElement;
      if ((el as any).__ui_navbar_toggle_init) return;
      (el as any).__ui_navbar_toggle_init = true;

      const clickHandler = () => {
        // original: $(this).prev().prev().next().next().children('li.dropdown').hide();
        // We'll try to replicate typical DOM: find nearest .main-menu and hide dropdown children
        // safe approach: hide direct .navigation li.dropdown children inside same menu
        const menu = el.closest('.main-menu') as HTMLElement | null;
        if (!menu) return;
        const items = Array.from(menu.querySelectorAll('li.dropdown'));
        items.forEach(it => {
          (it as HTMLElement).style.display = 'none';
        });
      };
      el.addEventListener('click', clickHandler);
      this.boundListeners.push({ target: el, type: 'click', handler: clickHandler });
    });
  }

  // ---------------------------
  // Menu Hidden Sidebar
  // ---------------------------
  initMenuHiddenSidebar() {
    const toggles = Array.from(document.querySelectorAll('.menu-sidebar'));
    toggles.forEach(t => {
      const el = t as HTMLElement;
      if ((el as any).__ui_menu_sidebar_init) return;
      (el as any).__ui_menu_sidebar_init = true;

      const handler = (e: Event) => {
        e.preventDefault();
        document.body.classList.toggle('side-content-visible');
      };
      el.addEventListener('click', handler);
      this.boundListeners.push({ target: el, type: 'click', handler });
    });

    const closeSel = '.hidden-bar .inner-box .cross-icon, .form-back-drop, .close-menu';
    const closeBtns = Array.from(document.querySelectorAll(closeSel));
    closeBtns.forEach(cb => {
      const el = cb as HTMLElement;
      if ((el as any).__ui_menu_close_init) return;
      (el as any).__ui_menu_close_init = true;
      const handler = (e: Event) => {
        e.preventDefault();
        document.body.classList.remove('side-content-visible');
      };
      el.addEventListener('click', handler);
      this.boundListeners.push({ target: el, type: 'click', handler });
    });

    // fullscreen-menu dropdown toggles (click)
    const fullDropdownLinks = Array.from(document.querySelectorAll('.fullscreen-menu .navigation li.dropdown > a'));
    fullDropdownLinks.forEach(link => {
      const el = link as HTMLElement;
      if ((el as any).__ui_fullscreen_dropdown_init) return;
      (el as any).__ui_fullscreen_dropdown_init = true;
      const handler = (e: Event) => {
        e.preventDefault();
        const next = el.nextElementSibling;
        if (next) this.slideToggleElement(next, 500, false);
      };
      el.addEventListener('click', handler);
      this.boundListeners.push({ target: el, type: 'click', handler });
    });
  }

  // ---------------------------
  // Search box toggle & click outside hide
  // ---------------------------
  initSearchBox() {
    const btns = Array.from(document.querySelectorAll('.nav-search > button'));
    btns.forEach(b => {
      const el = b as HTMLElement;
      if ((el as any).__ui_nav_search_btn_init) return;
      (el as any).__ui_nav_search_btn_init = true;
      const handler = (e: Event) => {
        e.preventDefault();
        const form = el.parentElement?.querySelector('form');
        if (form) form.classList.toggle('hide');
      };
      el.addEventListener('click', handler);
      this.boundListeners.push({ target: el, type: 'click', handler });
    });

    // click outside hide: bind once
    if (!this.windowListenersBound.get('body-click')) {
      const bodyClick = (event: Event) => {
        // در صورت نیاز به خصوصیات MouseEvent:
        const mouseEvent = event as MouseEvent;
        // استفاده از mouseEvent.clientX و ... در اینجا امن است
        if (window.innerWidth <= 767) return;
        const target = event.target as HTMLElement;
        const btn = document.querySelector('.nav-search > button') as HTMLElement | null;
        const form = document.querySelector('.nav-search form') as HTMLElement | null;
        if (!btn || !form) return;
        if (!btn.contains(target) && !form.contains(target) && !form.classList.contains('hide')) {
          form.classList.add('hide');
        }
      };

      document.body.addEventListener('click', bodyClick);
      this.boundListeners.push({ target: document.body, type: 'click', handler: bodyClick });
    }
  }

  // ---------------------------
  // Sidebar Menu (separate)
  // ---------------------------
  initSidebarMenu() {
    const dropParents = Array.from(document.querySelectorAll('.sidebar-menu li.dropdown'));
    dropParents.forEach(dp => {
      const el = dp as HTMLElement;
      if (el.dataset["__ui_sidebar_drop_init"] === '1') return;
      el.dataset["__ui_sidebar_drop_init"] = '1';

      // append dropdown-btn if not present
      if (!this.hasDirectDropdownBtn(el)) {
        const btn = this.renderer.createElement('div');
        btn.classList.add('dropdown-btn');
        btn.innerHTML = '<span class="far fa-angle-down"></span>';
        this.renderer.appendChild(el, btn);

        const handler = (e: Event) => {
          e.preventDefault();
          const ul = el.querySelector('ul');
          const meg = el.querySelector('.megamenu');
          if (ul) this.slideToggleElement(ul, 500, false);
          if (meg) this.slideToggleElement(meg, 800, false);
          el.classList.toggle('active');
        };
        btn.addEventListener('click', handler);
        this.boundListeners.push({ target: btn, type: 'click', handler });
      }

      // parent link click toggles submenu
      const parentLink = el.querySelector(':scope > a') as HTMLElement | null;
      if (parentLink && !(parentLink as any).__ui_sidebar_parent_link_init) {
        (parentLink as any).__ui_sidebar_parent_link_init = true;
        const handler = (e: Event) => {
          e.preventDefault();
          const ul = el.querySelector('ul');
          if (ul) this.slideToggleElement(ul, 500, false);
          el.classList.toggle('active');
        };
        parentLink.addEventListener('click', handler);
        this.boundListeners.push({ target: parentLink, type: 'click', handler });
      }
    });
  }

  // ---------------------------
  // Video popup (magnificPopup wrapper)
  // ---------------------------
  initVideoPopup() {
    const $ = (window as any).$;
    if (!$ || !$.fn || typeof $.fn.magnificPopup !== 'function') return;

    try {
      const video = $('.video-play');
      if (video.length && !video.data('__ui_magnific_video')) {
        video.magnificPopup({ type: 'video' });
        video.data('__ui_magnific_video', true);
      }
    } catch (e) { /* ignore */ }
  }

  // ---------------------------
  // Slick sliders (various)
  // ---------------------------
  initSlickSliders() {
    const $ = (window as any).$;
    if (!$ || !$.fn || typeof $.fn.slick !== 'function') return;

    try {
      // testimonials
      const testimonials = $('.testimonials-active');
      if (testimonials.length && !testimonials.data('__ui_slick')) {
        testimonials.slick({
          rtl: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          speed: 400,
          arrows: false,
          dots: false,
          focusOnSelect: true,
          autoplay: false,
          autoplaySpeed: 5000
        });
        testimonials.data('__ui_slick', true);
      }

      // destination
      const destination = $('.destination-active');
      if (destination.length && !destination.data('__ui_slick')) {
        destination.slick({
          rtl: true,
          infinite: true,
          speed: 400,
          arrows: false,
          dots: true,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 5,
          slidesToScroll: 2,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 2 } },
            { breakpoint: 375, settings: { slidesToShow: 1, slidesToScroll: 1 } }
          ]
        });
        destination.data('__ui_slick', true);
      }

      // client-logo
      const clientLogo = $('.client-logo-active');
      if (clientLogo.length && !clientLogo.data('__ui_slick')) {
        clientLogo.slick({
          rtl: true,
          infinite: true,
          speed: 400,
          arrows: false,
          dots: false,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 5,
          slidesToScroll: 1,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 575, settings: { slidesToShow: 2 } }
          ]
        });
        clientLogo.data('__ui_slick', true);
      }

      // hot-deals
      const hotDeals = $('.hot-deals-active');
      if (hotDeals.length && !hotDeals.data('__ui_slick')) {
        hotDeals.slick({
          rtl: true,
          infinite: true,
          speed: 400,
          arrows: false,
          dots: true,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
          slidesToShow: 3,
          slidesToScroll: 1,
          responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 1 } }
          ]
        });
        hotDeals.data('__ui_slick', true);
      }

      // gallery-slider
      const gallerySlider = $('.gallery-slider-active');
      if (gallerySlider.length && !gallerySlider.data('__ui_slick')) {
        gallerySlider.slick({
          rtl: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          speed: 400,
          arrows: false,
          dots: true,
          centerMode: true,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
          responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 3 } },
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 650, settings: { slidesToShow: 1 } }
          ]
        });
        gallerySlider.data('__ui_slick', true);
      }

      // product-slider
      const productSlider = $('.product-slider');
      if (productSlider.length && !productSlider.data('__ui_slick')) {
        productSlider.slick({
          rtl: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          speed: 400,
          arrows: false,
          dots: true,
          centerMode: false,
          focusOnSelect: true,
          autoplay: true,
          autoplaySpeed: 5000,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 500, settings: { slidesToShow: 1 } }
          ]
        });
        productSlider.data('__ui_slick', true);
      }
    } catch (e) {
      // ignore runtime errors from plugin calls
      // console.warn(e);
    }
  }

  // ---------------------------
  // Gallery & Instagram MagnificPopup
  // ---------------------------
  initGalleryPopups() {
    const $ = (window as any).$;
    if (!$ || !$.fn || typeof $.fn.magnificPopup !== 'function') return;

    try {
      const gallery = $('.gallery a');
      if (gallery.length && !gallery.data('__ui_magnific_gallery')) {
        gallery.magnificPopup({
          type: 'image',
          gallery: {
            enabled: true,
            navigateByImgClick: true
          }
        });
        gallery.data('__ui_magnific_gallery', true);
      }

      const insta = $('.instagram-item');
      if (insta.length && !insta.data('__ui_magnific_inst')) {
        insta.magnificPopup({
          type: 'image',
          gallery: {
            enabled: true,
            navigateByImgClick: true
          }
        });
        insta.data('__ui_magnific_inst', true);
      }
    } catch (e) { /* ignore */ }
  }

  // ---------------------------
  // Skillbar & Counters (simple port)
  // ---------------------------
  initSkillbars() {
    // original uses appear + skillBars plugin; here we provide simple scroll-into-view activation
    const bars = Array.from(document.querySelectorAll('.skillbar'));
    bars.forEach(b => {
      const el = b as HTMLElement;
      if ((el as any).__ui_skillbar_init) return;
      (el as any).__ui_skillbar_init = true;

      // if using plugin you can call it here; otherwise animate width when visible
      const animate = () => {
        const inner = el.querySelector('.skillbar-bar') as HTMLElement | null;
        const perc = el.getAttribute('data-percent') || inner?.getAttribute('data-percent') || '';
        if (inner && perc) {
          inner.style.transition = 'width 4s linear';
          inner.style.width = perc;
        }
      };

      // simple visibility check on scroll and load
      const checkAndAnimate = () => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          animate();
          window.removeEventListener('scroll', checkAndAnimate);
        }
      };
      window.addEventListener('scroll', checkAndAnimate);
      this.boundListeners.push({ target: window, type: 'scroll', handler: checkAndAnimate });
      checkAndAnimate();
    });
  }

  initCounters() {
    const wraps = Array.from(document.querySelectorAll('.counter-text-wrap'));
    wraps.forEach(w => {
      const el = w as HTMLElement;
      if ((el as any).__ui_counter_init) return;
      (el as any).__ui_counter_init = true;

      const run = () => {
        const countText = el.querySelector('.count-text') as HTMLElement | null;
        if (!countText) return;
        const stop = parseInt(countText.getAttribute('data-stop') || '0', 10);
        const speed = parseInt(countText.getAttribute('data-speed') || '2000', 10);

        if ((el as any).__ui_counted) return;
        (el as any).__ui_counted = true;

        const startValue = parseInt(countText.textContent || '0', 10) || 0;
        const startTime = performance.now();
        const duration = speed;

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const current = Math.floor(startValue + (stop - startValue) * progress);
          countText.textContent = current.toString();
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            countText.textContent = stop.toString();
          }
        };
        requestAnimationFrame(step);
      };

      const onAppear = () => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          run();
          window.removeEventListener('scroll', onAppear);
        }
      };
      window.addEventListener('scroll', onAppear);
      this.boundListeners.push({ target: window, type: 'scroll', handler: onAppear });
      onAppear();
    });
  }

  // ---------------------------
  // Destinations filter (imagesLoaded + isotope)
  // ---------------------------
  initDestinationsFilter() {
    const imagesLoaded = (window as any).imagesLoaded;
    const Isotope = (window as any).Isotope;
    const container = document.querySelector('.destinations-active') as HTMLElement | null;
    const nav = document.querySelector('.destinations-nav') as HTMLElement | null;
    if (!container || !imagesLoaded || !Isotope || !nav) return;
    if ((container as any).__ui_isotope_init) return;
    (container as any).__ui_isotope_init = true;

    // call imagesLoaded then initialize isotope
    try {
      imagesLoaded(container, () => {
        // @ts-ignore
        const iso = new Isotope(container, {
          originLeft: false,
          itemSelector: '.item',
          percentPosition: true
        });

        // nav click
        const navClick = (e: Event) => {
          const t = e.target as HTMLElement;
          const li = t.closest('li') as HTMLElement | null;
          if (!li) return;
          const filterValue = li.getAttribute('data-filter') || '*';
          iso.arrange({ filter: filterValue });
          // toggle active class
          const siblings = nav.querySelectorAll('li.active');
          siblings.forEach(s => s.classList.remove('active'));
          li.classList.add('active');
          e.preventDefault();
        };
        nav.addEventListener('click', navClick);
        this.boundListeners.push({ target: nav, type: 'click', handler: navClick });
      });
    } catch (e) {
      // ignore plugin runtime issues
    }
  }

  // ---------------------------
  // Price slider (jQuery UI) - basic init if plugin exists
  // ---------------------------
  initPriceRange() {
    const $ = (window as any).$;
    if (!$ || !$.fn || typeof $.fn.slider !== 'function') return;
    try {
      const range = $('.price-slider-range');
      if (range.length && !range.data('__ui_price_init')) {
        range.slider({
          rtl: true,
          range: true,
          min: 5,
          max: 1000,
          values: [100, 750],
          slide: function (event: any, ui: any) {
            ($('#price') as any).val("$ " + ui.values[0] + " - $ " + ui.values[1]);
          }
        });
        ($('#price') as any).val("$ " + range.slider("values", 0) + " - $ " + range.slider("values", 1));
        range.data('__ui_price_init', true);
      }
    } catch (e) { /* ignore */ }
  }

  // ---------------------------
  // Hover content (simple slide)
  // ---------------------------
  initHoverContent() {
    const items = Array.from(document.querySelectorAll('.hover-content'));
    items.forEach(it => {
      const el = it as HTMLElement;
      if ((el as any).__ui_hover_init) return;
      (el as any).__ui_hover_init = true;

      const enter = () => {
        const inner = el.querySelector('.inner-content') as HTMLElement | null;
        if (inner) this.slideToggleElement(inner, 200, false);
      };
      const leave = () => {
        const inner = el.querySelector('.inner-content') as HTMLElement | null;
        if (inner) this.slideToggleElement(inner, 200, true);
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      this.boundListeners.push({ target: el, type: 'mouseenter', handler: enter });
      this.boundListeners.push({ target: el, type: 'mouseleave', handler: leave });
    });
  }

  // ---------------------------
  // Scroll to target (smooth)
  // ---------------------------
  initScrollToTarget() {
    const links = Array.from(document.querySelectorAll('.scroll-to-target'));
    links.forEach(l => {
      const el = l as HTMLElement;
      if ((el as any).__ui_scroll_init) return;
      (el as any).__ui_scroll_init = true;
      const handler = (e: Event) => {
        e.preventDefault();
        const target = el.getAttribute('data-target');
        if (!target) return;
        const tg = document.querySelector(target);
        if (tg) (tg as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      };
      el.addEventListener('click', handler);
      this.boundListeners.push({ target: el, type: 'click', handler });
    });
  }

  // ---------------------------
  // NiceSelect (if present) - call once
  // ---------------------------
  initNiceSelect() {
    const $ = (window as any).$;
    if (!$ || !$.fn || typeof $.fn.niceSelect !== 'function') return;
    try {
      $('select').each(() => {
        const el = this as any;
        if (!el.__ui_niceselect) {
          $(this).niceSelect();
          el.__ui_niceselect = true;
        }
      });
    } catch (e) { /* ignore */ }
  }

  // ---------------------------
  // AOS init
  // ---------------------------
  initAOS() {
    const AOS = (window as any).AOS;
    if (AOS && typeof AOS.init === 'function') {
      if (!(window as any).__ui_aos_inited) {
        AOS.init();
        (window as any).__ui_aos_inited = true;
      }
    }
  }

  // ---------------------------
  // Resize handler (original hid navcollapse children)
  // ---------------------------
  bindResizeHandler() {
    const handler = () => {
      const navcollapse = Array.from(document.querySelectorAll('.navigation li.dropdown'));
      navcollapse.forEach(nc => {
        const ul = nc.querySelector('ul') as HTMLElement | null;
        const mega = nc.querySelector('.megamenu') as HTMLElement | null;
        if (ul) ul.style.display = 'none';
        if (mega) mega.style.display = 'none';
      });
    };
    this.onceBindWindowEvent('resize', handler);
  }
  // ---------- Dropdown fix for UiPluginService ----------
  /**
   * قرار دهید داخل کلاس UiPluginService
   */

  private hoverTimers = new WeakMap<Element, { open?: number; close?: number }>();

  /**
   * Helper: cancel timers for an element
   */
  private clearHoverTimers(el: Element) {
    const record = this.hoverTimers.get(el);
    if (!record) return;
    if (record.open) { clearTimeout(record.open); record.open = undefined; }
    if (record.close) { clearTimeout(record.close); record.close = undefined; }
  }

  /**
   * Robust slide open: show element and animate height from 0 -> scrollHeight
   */
  private slideOpen(el: HTMLElement, duration = 300) {
    // cancel any animation state
    el.style.removeProperty('display');
    let display = getComputedStyle(el).display;
    if (display === 'none') display = 'block';
    el.style.display = display;

    // ensure starting from 0
    el.style.overflow = 'hidden';
    el.style.height = '0px';
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    const full = el.scrollHeight;
    el.style.transition = `height ${duration}ms ease`;
    el.style.height = `${full}px`;

    // cleanup after transition
    const clean = () => {
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
      el.removeEventListener('transitionend', clean);
    };
    el.addEventListener('transitionend', clean);
  }

  /**
   * Robust slide close: animate height -> 0 then set display none
   */
  private slideClose(el: HTMLElement, duration = 300) {
    if (getComputedStyle(el).display === 'none') return;
    el.style.overflow = 'hidden';
    // start from current height
    const start = el.scrollHeight;
    el.style.height = `${start}px`;
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    el.offsetHeight;
    el.style.transition = `height ${duration}ms ease`;
    el.style.height = '0px';

    const done = () => {
      el.style.display = 'none';
      el.style.height = '';
      el.style.transition = '';
      el.style.overflow = '';
      el.removeEventListener('transitionend', done);
    };
    el.addEventListener('transitionend', done);
  }

  /**
   * Ensure separators (divider) between direct children of a submenu UL.
   * Inserts <li class="dropdown-divider" aria-hidden="true"></li> between real <li> items.
   * Idempotent: marks the UL with data attribute to avoid double-insert.
   */
  private ensureSubmenuDividers(ul: HTMLElement) {
    if (!ul || ul.dataset["__ui_dividers_init"] === '1') return;
    const children = Array.from(ul.children).filter(c => c.tagName.toLowerCase() === 'li');

    for (let i = children.length - 2; i >= 0; i--) {
      const after = children[i].nextElementSibling;
      if (after && (after as HTMLElement).classList.contains('dropdown-divider')) continue;

      const divider = document.createElement('li');
      divider.className = 'dropdown-divider';
      divider.setAttribute('aria-hidden', 'true');

      // safer: insert after the element (no parentElement direct usage)
      (children[i] as Element).insertAdjacentElement('afterend', divider);
    }

    ul.dataset["__ui_dividers_init"] = '1';
  }

  /**
   * Main fixed init for dropdown menu (replace previous implementation)
   */
  initDropdownMenu() {
    const navItems = Array.from(document.querySelectorAll('.navigation li.dropdown'));
    if (!navItems.length) return;

    navItems.forEach(item => {
      const el = item as HTMLElement;
      if (el.dataset["__ui_dropdown_init"] === '1') return;
      el.dataset["__ui_dropdown_init"] = '1';

      // prepare submenu elements references
      const ul = el.querySelector('ul') as HTMLElement | null;
      const megamenu = el.querySelector('.megamenu') as HTMLElement | null;

      // ensure divider insertion (if needed)
      if (ul) this.ensureSubmenuDividers(ul);

      // helper that opens both ul and megamenu together
      const openNow = () => {
        if (ul) this.slideOpen(ul, 300);
        if (megamenu) this.slideOpen(megamenu, 300);
        el.classList.add('active');
      };
      // helper that closes both at once
      const closeNow = () => {
        if (ul) this.slideClose(ul, 300);
        if (megamenu) this.slideClose(megamenu, 300);
        el.classList.remove('active');
      };

      // mouseenter: cancel close timer and open quickly
      const onEnter = (ev: Event) => {
        this.clearHoverTimers(el);
        // if moving inside from child, do nothing: we still want it open
        // open immediately
        const record = this.hoverTimers.get(el) || {};
        // small open delay for better UX (optional, 30ms)
        record.open = window.setTimeout(() => {
          openNow();
          record.open = undefined;
        }, 30) as unknown as number;
        this.hoverTimers.set(el, record);
      };

      // mouseleave: check if relatedTarget is inside dropdown; if not, set close timer
      const onLeave = (ev: Event) => {
        const me = ev as MouseEvent;
        const related = me.relatedTarget as Node | null;
        if (related && el.contains(related)) {
          // cursor still inside dropdown (moving to submenu) -> do nothing
          return;
        }
        // schedule close (small delay to allow entering submenu)
        this.clearHoverTimers(el);
        const record = this.hoverTimers.get(el) || {};
        record.close = window.setTimeout(() => {
          closeNow();
          record.close = undefined;
        }, 120) as unknown as number; // 120ms delay to be forgiving
        this.hoverTimers.set(el, record);
      };

      // Attach listeners (we store them in boundListeners for cleanup)
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
      this.boundListeners.push({ target: el, type: 'mouseenter', handler: onEnter });
      this.boundListeners.push({ target: el, type: 'mouseleave', handler: onLeave });

      // Add dropdown-btn only if not present
      if (!this.hasDirectDropdownBtn(el)) {
        const btn = this.renderer.createElement('div');
        btn.classList.add('dropdown-btn');
        btn.innerHTML = '<span class="far fa-angle-down"></span>';
        this.renderer.appendChild(el, btn);

        // clicking toggle: if visible -> close, else open
        const toggle = (e: Event) => {
          e.preventDefault();
          // if either ul or megamenu is visible consider it open
          const ulVisible = ul && getComputedStyle(ul).display !== 'none' && (ul.offsetHeight > 0);
          if (ulVisible) {
            closeNow();
          } else {
            openNow();
          }
        };
        btn.addEventListener('click', toggle);
        this.boundListeners.push({ target: btn, type: 'click', handler: toggle });
      }

      // Disable parent link default (only once)
      const parentLink = el.querySelector(':scope > a') as HTMLElement | null;
      if (parentLink && !(parentLink as any).__ui_prevent_bound) {
        const preventFn = (e: Event) => e.preventDefault();
        parentLink.addEventListener('click', preventFn);
        (parentLink as any).__ui_prevent_bound = true;
        this.boundListeners.push({ target: parentLink, type: 'click', handler: preventFn });
      }
    });

    // Also bind a global resize handler to reset any inline styles if viewport changed
    const resizeHandler = () => {
      const navcollapse = Array.from(document.querySelectorAll('.navigation li.dropdown'));
      navcollapse.forEach(nc => {
        const ul = nc.querySelector('ul') as HTMLElement | null;
        const mega = nc.querySelector('.megamenu') as HTMLElement | null;
        if (ul) {
          ul.style.display = '';
          ul.style.height = '';
          ul.style.transition = '';
          ul.style.overflow = '';
        }
        if (mega) {
          mega.style.display = '';
          mega.style.height = '';
          mega.style.transition = '';
          mega.style.overflow = '';
        }
      });
    };
    // bind once (use existing helper)
    this.onceBindWindowEvent('resize', resizeHandler);
  }


  // ---------------------------
  // Public initAll & destroy
  // ---------------------------
  initAll() {
    // call all initializers - each is idempotent
    this.bindWindowLoadForPreloader();
    this.initPreloader(); // in case load already fired
    this.initHeaderStyle();
    this.initDropdownMenu();
    this.initMainMenuNavbarToggleBehavior();
    this.initMenuHiddenSidebar();
    this.initSearchBox();
    this.initSidebarMenu();
    this.initVideoPopup();
    this.initSlickSliders();
    this.initGalleryPopups();
    this.initSkillbars();
    this.initCounters();
    this.initDestinationsFilter();
    this.initPriceRange();
    this.initHoverContent();
    this.initScrollToTarget();
    this.initNiceSelect();
    this.initAOS();
    this.bindResizeHandler();
  }

  // remove listeners and marks (useful on component destroy if you want)
  destroyAll() {
    this.removeAllBoundListeners();
    // clear WeakMap by creating a new one
    this.initializedElements = new WeakMap<Element, boolean>();
  }
}

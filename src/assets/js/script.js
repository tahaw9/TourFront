// /*-----------------------------------------------------------------------------------
//     Template Name: Ravelo - Travel & Tour Booking HTML Template
//     Template URI: https://webtend.net/demo/html/ravelo/
//     Author: WebTend
//     Author URI:  https://webtend.net/
//     Version: 1.0
//
//     Note: This is Main JS File.
// -----------------------------------------------------------------------------------
// 	CSS INDEX
// 	===================
//     ## Header Style
//     ## Dropdown menu
//     ## Submenu
//     ## Menu Hidden Sidebar
//     ## Search Box
//     ## Sidebar Menu
//     ## Video Popup
//     ## Testimonial Slider
//     ## Destination Carousel
//     ## Client Logo Carousel
//     ## Hot Deals Carousel
//     ## Gallery Slider
//     ## Product Slider
//     ## Gallery Popup
//     ## Instagram Gallery
//     ## SkillBar
//     ## Fact Counter
//     ## Destinations Filter
//     ## Price Range Fliter
//     ## Hover Content
//     ## Scroll to Top
//     ## Nice Select
//     ## AOS Animation
//     ## Preloader
//
// -----------------------------------------------------------------------------------*/
//
// (function ($) {
//
//   "use strict";
//
//   $(document).ready(function () {
//
//     debugger
//     // ## Header Style and Scroll to Top
//     function headerStyle() {
//       if ($('.main-header').length) {
//         var windowpos = $(window).scrollTop();
//         var siteHeader = $('.main-header');
//         var scrollLink = $('.scroll-top');
//         if (windowpos >= 250) {
//           siteHeader.addClass('fixed-header');
//           scrollLink.fadeIn(300);
//         } else {
//           siteHeader.removeClass('fixed-header');
//           scrollLink.fadeOut(300);
//         }
//       }
//     }
//
//     headerStyle();
//
//
//     // ## Dropdown menu
//     var mobileWidth = 992;
//     var navcollapse = $('.navigation li.dropdown');
//
//     navcollapse.hover(function () {
//       if ($(window).innerWidth() >= mobileWidth) {
//         $(this).children('ul').stop(true, false, true).slideToggle(300);
//         $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
//       }
//     });
//
//     // ## Submenu Dropdown Toggle
//     if ($('.main-header .navigation li.dropdown ul').length) {
//       $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="far fa-angle-down"></span></div>');
//
//       //Dropdown Button
//       $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
//         $(this).prev('ul').slideToggle(500);
//         $(this).prev('.megamenu').slideToggle(800);
//       });
//
//       //Disable dropdown parent link
//       $('.navigation li.dropdown > a').on('click', function (e) {
//         e.preventDefault();
//       });
//     }
//
//     //Submenu Dropdown Toggle
//     if ($('.main-header .main-menu').length) {
//     $('.main-header .main-menu .navbar-toggle').click(function () {
//       $(this).prev().prev().next().next().children('li.dropdown').hide();
//     });
//     }
//
//
//     // ## Menu Hidden Sidebar Content Toggle
//     debugger
//     if ($('.menu-sidebar').length) {
//       //Show Form
//       $('.menu-sidebar').on('click', function (e) {
//         e.preventDefault();
//         $('body').toggleClass('side-content-visible');
//       });
//       //Hide Form
//       $('.hidden-bar .inner-box .cross-icon,.form-back-drop,.close-menu').on('click', function (e) {
//         e.preventDefault();
//         $('body').removeClass('side-content-visible');
//       });
//       //Dropdown Menu
//       $('.fullscreen-menu .navigation li.dropdown > a').on('click', function () {
//         $(this).next('ul').slideToggle(500);
//       });
//     }
//
//
//     // ## Search Box
//     $('.nav-search > button').on('click', function () {
//       $('.nav-search form').toggleClass('hide');
//     });
//
//
//     // Hide Box Search WHEN CLICK OUTSIDE
//     if ($(window).width() > 767) {
//       $('body').on('click', function (event) {
//         if ($('.nav-search > button').has(event.target).length == 0 && !$('.nav-search > button').is(event.target)
//           && $('.nav-search form').has(event.target).length == 0 && !$('.nav-search form').is(event.target)) {
//           if ($('.nav-search form').hasClass('hide') == false) {
//             $('.nav-search form').toggleClass('hide');
//           }
//           ;
//         }
//       });
//     }
//
//
//     // ## Sidebar Menu
//     if ($('.sidebar-menu li.dropdown ul').length) {
//       $('.sidebar-menu li.dropdown').append('<div class="dropdown-btn"><span class="far fa-angle-down"></span></div>');
//
//       //Dropdown Button
//       $('.sidebar-menu li.dropdown .dropdown-btn').on('click', function () {
//         $(this).prev('ul').slideToggle(500);
//         $(this).prev('.megamenu').slideToggle(800);
//         $(this).parent('li.dropdown').toggleClass('active');
//       });
//
//       //Disable dropdown parent link
//       $('.sidebar-menu li.dropdown > a').on('click', function (e) {
//         e.preventDefault();
//         $(this).next('ul').slideToggle(500);
//         $(this).parent('li.dropdown').toggleClass('active');
//       });
//     }
//
//
//     // ## Video Popup
//     if ($('.video-play').length) {
//       $('.video-play').magnificPopup({
//         type: 'video',
//       });
//     }
//
//
//     // ## Testimonial Slider
//     if ($('.testimonials-active').length) {
//       $('.testimonials-active').slick({
//         rtl: true,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         infinite: false,
//         speed: 400,
//         arrows: false,
//         dots: false,
//         focusOnSelect: true,
//         autoplay: false,
//         autoplaySpeed: 5000,
//       });
//     }
//
//
//     // ## Destination Carousel
//     if ($('.destination-active').length) {
//       $('.destination-active').slick({
//         rtl: true,
//         infinite: true,
//         speed: 400,
//         arrows: false,
//         dots: true,
//         focusOnSelect: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 5,
//         slidesToScroll: 2,
//         responsive: [
//           {
//             breakpoint: 1200,
//             settings: {
//               slidesToShow: 4,
//             }
//           },
//           {
//             breakpoint: 991,
//             settings: {
//               slidesToShow: 3,
//             }
//           },
//           {
//             breakpoint: 767,
//             settings: {
//               slidesToShow: 2,
//             }
//           },
//           {
//             breakpoint: 375,
//             settings: {
//               slidesToShow: 1,
//               slidesToScroll: 1,
//             }
//           }
//         ]
//       });
//     }
//
//
//     // ## Client Logo Carousel
//     if ($('.client-logo-active').length) {
//       $('.client-logo-active').slick({
//         rtl: true,
//         infinite: true,
//         speed: 400,
//         arrows: false,
//         dots: false,
//         focusOnSelect: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 5,
//         slidesToScroll: 1,
//         responsive: [
//           {
//             breakpoint: 1200,
//             settings: {
//               slidesToShow: 4,
//             }
//           },
//           {
//             breakpoint: 991,
//             settings: {
//               slidesToShow: 3,
//             }
//           },
//           {
//             breakpoint: 575,
//             settings: {
//               slidesToShow: 2,
//             }
//           },
//         ]
//       });
//     }
//
//
//     // ## Hot Deals Carousel
//     if ($('.hot-deals-active').length) {
//       $('.hot-deals-active').slick({
//         rtl: true,
//         infinite: true,
//         speed: 400,
//         arrows: false,
//         dots: true,
//         focusOnSelect: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         responsive: [
//           {
//             breakpoint: 991,
//             settings: {
//               slidesToShow: 2,
//             }
//           },
//           {
//             breakpoint: 767,
//             settings: {
//               slidesToShow: 1,
//             }
//           }
//         ]
//       });
//     }
//
//
//     // ## Gallery Slider
//     if ($('.gallery-slider-active').length) {
//       $('.gallery-slider-active').slick({
//         rtl: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         infinite: true,
//         speed: 400,
//         arrows: false,
//         dots: true,
//         centerMode: true,
//         focusOnSelect: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         responsive: [
//           {
//             breakpoint: 1600,
//             settings: {
//               slidesToShow: 3,
//             }
//           },
//           {
//             breakpoint: 1200,
//             settings: {
//               slidesToShow: 2,
//             }
//           },
//           {
//             breakpoint: 650,
//             settings: {
//               slidesToShow: 1,
//             }
//           }
//         ]
//       });
//     }
//
//
//     // ## Product Slider
//     if ($('.product-slider').length) {
//       $('.product-slider').slick({
//         rtl: true,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         infinite: true,
//         speed: 400,
//         arrows: false,
//         dots: true,
//         centerMode: false,
//         focusOnSelect: true,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         responsive: [
//           {
//             breakpoint: 1200,
//             settings: {
//               slidesToShow: 3,
//             }
//           },
//           {
//             breakpoint: 991,
//             settings: {
//               slidesToShow: 2,
//             }
//           },
//           {
//             breakpoint: 500,
//             settings: {
//               slidesToShow: 1,
//             }
//           }
//         ]
//       });
//     }
//
//
//     // ## Gallery Popup
//     $('.gallery a').magnificPopup({
//       type: 'image',
//       gallery: {
//         enabled: true,
//         navigateByImgClick: true,
//       },
//     });
//
//
//     // ## Instagram Gallery
//     $('.instagram-item').magnificPopup({
//       type: 'image',
//       gallery: {
//         enabled: true,
//         navigateByImgClick: true,
//       },
//     });
//
//
//     // ## SkillBar
//     if ($('.skillbar').length) {
//       $('.skillbar').appear(function () {
//         $('.skillbar').skillBars({
//           from: 0,
//           speed: 4000,
//           interval: 100,
//         });
//       });
//     }
//
//
//     /* ## Fact Counter + Text Count - Our Success */
//     if ($('.counter-text-wrap').length) {
//       $('.counter-text-wrap').appear(function () {
//
//         var $t = $(this),
//           n = $t.find(".count-text").attr("data-stop"),
//           r = parseInt($t.find(".count-text").attr("data-speed"), 10);
//
//         if (!$t.hasClass("counted")) {
//           $t.addClass("counted");
//           $({
//             countNum: $t.find(".count-text").text()
//           }).animate({
//             countNum: n
//           }, {
//             duration: r,
//             easing: "linear",
//             step: function () {
//               $t.find(".count-text").text(Math.floor(this.countNum));
//             },
//             complete: function () {
//               $t.find(".count-text").text(this.countNum);
//             }
//           });
//         }
//
//       }, {
//         accY: 0
//       });
//     }
//
//
//     // ## Destinations Filter
//     $('.destinations-active').imagesLoaded(function () {
//       var items = $('.destinations-active').isotope({
//         originLeft: false,
//         itemSelector: '.item',
//         percentPosition: true,
//       });
//       // items on button click
//       $('.destinations-nav').on('click', 'li', function () {
//         var filterValue = $(this).attr('data-filter');
//         items.isotope({
//           filter: filterValue
//         });
//       });
//       // menu active class
//       $('.destinations-nav li').on('click', function (event) {
//         $(this).siblings('.active').removeClass('active');
//         $(this).addClass('active');
//         event.preventDefault();
//       });
//     });
//
//
//     // ## Price Range Fliter jQuery UI
//     if ($('.price-slider-range').length) {
//       $(".price-slider-range").slider({
//         rtl: true,
//         range: true,
//         min: 5,
//         max: 1000,
//         values: [100, 750],
//         slide: function (event, ui) {
//           $("#price").val("$ " + ui.values[0] + " - $ " + ui.values[1]);
//         }
//       });
//       $("#price").val("$ " + $(".price-slider-range").slider("values", 0) +
//         " - $ " + $(".price-slider-range").slider("values", 1));
//     }
//
//
//     // ## Hover Content
//     $('.hover-content').hover(
//       function () {
//         $(this).find('.inner-content').slideDown();
//       }, function () {
//         $(this).find('.inner-content').slideUp();
//       }
//     );
//
//
//     // ## Scroll to Top
//     if ($('.scroll-to-target').length) {
//       $(".scroll-to-target").on('click', function () {
//         var target = $(this).attr('data-target');
//         // animate
//         $('html, body').animate({
//           scrollTop: $(target).offset().top
//         }, 1000);
//
//       });
//     }
//
//
//     // ## Nice Select
//     $('select').niceSelect();
//
//
//     // ## AOS Animation
//     AOS.init();
//
//
//   });
//
//
//   /* ==========================================================================
//      When document is resize, do
//   ========================================================================== */
//
//   $(window).on('resize', function () {
//     var mobileWidth = 992;
//     var navcollapse = $('.navigation li.dropdown');
//     navcollapse.children('ul').hide();
//     navcollapse.children('.megamenu').hide();
//
//   });
//
//
//   /* ==========================================================================
//      When document is scroll, do
//   ========================================================================== */
//
//   $(window).on('scroll', function () {
//
//     // Header Style and Scroll to Top
//     function headerStyle() {
//       if ($('.main-header').length) {
//         var windowpos = $(window).scrollTop();
//         var siteHeader = $('.main-header');
//         var scrollLink = $('.scroll-top');
//         if (windowpos >= 100) {
//           siteHeader.addClass('fixed-header');
//           scrollLink.fadeIn(300);
//         } else {
//           siteHeader.removeClass('fixed-header');
//           scrollLink.fadeOut(300);
//         }
//       }
//     }
//
//     headerStyle();
//
//   });
//
//   /* ==========================================================================
//      When document is loaded, do
//   ========================================================================== */
//
//   // $(window).on('load', function () {
//   //
//   //     // ## Preloader
//   //     function handlePreloader() {
//   //         if ($('.preloader').length) {
//   //             $('.preloader').delay(200).fadeOut(500);
//   //         }
//   //     }
//   //     handlePreloader();
//   //
//   // });
//
// })(window.jQuery);


/*-----------------------------------------------------------------------------------
    Ravelo - converted script (idempotent, delegations, exposes RaveloInit)
-----------------------------------------------------------------------------------*/
(function ($, window, document) {
  "use strict";

  // ---------- helpers ----------
  function safeCall(fn) {
    try { fn(); } catch (e) { /* ignore runtime errors from plugins */ }
  }

  // Namespace for event handlers to safely off/on
  var NS = '.ravelo';

  // Small utility to check plugin presence
  function hasJQPlugin(name) {
    return !!($ && $.fn && typeof $.fn[name] === 'function');
  }

  // ---------- main init function ----------
  function initRavelo() {
    debugger
    // allow calling multiple times safely
    if (!window.__ravelo_inited) window.__ravelo_inited = {};
    // we'll mark per-feature init flags inside window.__ravelo_inited

    // ---------- PRELOADER ----------
    function handlePreloader() {
      debugger
      var $pre = $('.preloader');
      if ($pre.length) {
        // .stop to avoid queueing
        $pre.stop(true, true).delay(200).fadeOut(500);
      }
    }
    // expose handlePreloader so Angular can call individually if needed
    window.handlePreloader = handlePreloader;

    // bind to window load (only once)
    if (!window.__ravelo_inited.preloaderBind) {
      $(window).off('load' + NS).on('load' + NS, function () {
        handlePreloader();
      });
      window.__ravelo_inited.preloaderBind = true;
    }
    // also call once (in case DOM ready and load already happened)
    safeCall(handlePreloader);

    // ---------- HEADER STYLE & SCROLL-TO-TOP ----------
    function headerStyle(threshold) {
      threshold = typeof threshold === 'number' ? threshold : 250;
      var $header = $('.main-header');
      var $scrollLink = $('.scroll-top');
      if (!$header.length || !$scrollLink.length) return;
      var windowpos = $(window).scrollTop();
      if (windowpos >= threshold) {
        $header.addClass('fixed-header');
        $scrollLink.stop(true, true).fadeIn(300);
      } else {
        $header.removeClass('fixed-header');
        $scrollLink.stop(true, true).fadeOut(300);
      }
    }

    // initial call on doc ready with threshold 250
    headerStyle(250);
    // bind scroll update (use threshold 100 like original scroll handler)
    if (!window.__ravelo_inited.headerScroll) {
      $(window).off('scroll' + NS + '.header').on('scroll' + NS + '.header', function () {
        headerStyle(100);
      });
      window.__ravelo_inited.headerScroll = true;
    }

    // ---------- DROPDOWN NAV (delegation, hover & toggle) ----------
    (function initDropdowns() {
      var mobileWidth = 992;

      // helper open/close
      function openSub($li) {
        $li.children('ul').first().stop(true, true).slideDown(300);
        $li.children('.megamenu').first().stop(true, true).slideDown(300);
        $li.addClass('active');
      }
      function closeSub($li) {
        $li.children('ul').first().stop(true, true).slideUp(300);
        $li.children('.megamenu').first().stop(true, true).slideUp(300);
        $li.removeClass('active');
      }

      // ensure dropdown-btns appended once per li
      $('.main-header .navigation li.dropdown').each(function () {
        var $li = $(this);
        if ($li.children('.dropdown-btn').length === 0) {
          $li.append('<div class="dropdown-btn"><span class="far fa-angle-down"></span></div>');
        }
      });

      // remove previous delegated handlers and rebind with namespace
      $(document).off('mouseenter' + NS, '.navigation li.dropdown');
      $(document).on('mouseenter' + NS, '.navigation li.dropdown', function () {
        if ($(window).innerWidth() >= mobileWidth) {
          var $this = $(this);
          clearTimeout($this.data('raveloCloseTimer'));
          // small open delay
          var t = setTimeout(function () { openSub($this); }, 30);
          $this.data('raveloOpenTimer', t);
        }
      });

      $(document).off('mouseleave' + NS, '.navigation li.dropdown');
      $(document).on('mouseleave' + NS, '.navigation li.dropdown', function (e) {
        if ($(window).innerWidth() >= mobileWidth) {
          var $this = $(this);
          clearTimeout($this.data('raveloOpenTimer'));
          var t = setTimeout(function () {
            // if moving to an element inside the dropdown, do not close
            var related = e.relatedTarget;
            if (related && $.contains($this[0], related)) {
              return;
            }
            closeSub($this);
          }, 120);
          $this.data('raveloCloseTimer', t);
        }
      });

      // click toggle for dropdown-btn
      $(document).off('click' + NS, '.main-header .navigation li.dropdown .dropdown-btn');
      $(document).on('click' + NS, '.main-header .navigation li.dropdown .dropdown-btn', function (ev) {
        ev.preventDefault();
        var $li = $(this).closest('li.dropdown');
        var $ul = $li.children('ul').first();
        if ($ul.length && $ul.is(':visible')) {
          closeSub($li);
        } else {
          openSub($li);
        }
      });

      // disable parent link default
      $(document).off('click' + NS, '.navigation li.dropdown > a');
      $(document).on('click' + NS, '.navigation li.dropdown > a', function (e) {
        e.preventDefault();
      });

      // imitate original "navbar-toggle" snippet: hide dropdown children on click
      $(document).off('click' + NS, '.main-header .main-menu .navbar-toggle');
      $(document).on('click' + NS, '.main-header .main-menu .navbar-toggle', function () {
        // attempt to replicate: hide dropdown children of the same menu
        var $menu = $(this).closest('.main-menu');
        if ($menu.length) {
          $menu.find('li.dropdown').hide();
        }
      });
    })();

    // ---------- Menu Hidden Sidebar ----------
    (function initHiddenSidebar() {
      if ($('.menu-sidebar').length === 0) return;

      // show toggle
      $(document).off('click' + NS, '.menu-sidebar');
      $(document).on('click' + NS, '.menu-sidebar', function (e) {
        e.preventDefault();
        $('body').toggleClass('side-content-visible');
      });

      // hide controls
      $(document).off('click' + NS, '.hidden-bar .inner-box .cross-icon, .form-back-drop, .close-menu');
      $(document).on('click' + NS, '.hidden-bar .inner-box .cross-icon, .form-back-drop, .close-menu', function (e) {
        e.preventDefault();
        $('body').removeClass('side-content-visible');
      });

      // fullscreen-menu dropdown toggle
      $(document).off('click' + NS, '.fullscreen-menu .navigation li.dropdown > a');
      $(document).on('click' + NS, '.fullscreen-menu .navigation li.dropdown > a', function (e) {
        e.preventDefault();
        $(this).next('ul').stop(true, true).slideToggle(500);
      });
    })();

    // ---------- Search Box toggle & click outside ----------
    (function initSearchBox() {
      $(document).off('click' + NS, '.nav-search > button');
      $(document).on('click' + NS, '.nav-search > button', function () {
        $('.nav-search form').toggleClass('hide');
      });

      // click outside hide (only for >767)
      $(document).off('click' + NS + '.navSearchBody');
      $(document).on('click' + NS + '.navSearchBody', 'body', function (event) {
        if ($(window).width() <= 767) return;
        var $btn = $('.nav-search > button');
        var $form = $('.nav-search form');
        if (!$btn.length || !$form.length) return;
        var target = event.target;
        if ($btn.has(target).length === 0 && !$btn.is(target) && $form.has(target).length === 0 && !$form.is(target)) {
          if (!$form.hasClass('hide')) {
            $form.toggleClass('hide');
          }
        }
      });
    })();

    // ---------- Sidebar Menu (internal dropdowns) ----------
    (function initSidebarMenu() {
      if ($('.sidebar-menu li.dropdown ul').length === 0) return;
      // append dropdown-btn if not present
      $('.sidebar-menu li.dropdown').each(function () {
        var $li = $(this);
        if ($li.children('.dropdown-btn').length === 0) {
          $li.append('<div class="dropdown-btn"><span class="far fa-angle-down"></span></div>');
        }
      });

      // click on dropdown-btn
      $(document).off('click' + NS, '.sidebar-menu li.dropdown .dropdown-btn');
      $(document).on('click' + NS, '.sidebar-menu li.dropdown .dropdown-btn', function () {
        var $li = $(this).closest('li.dropdown');
        $li.children('ul').stop(true, true).slideToggle(500);
        $li.children('.megamenu').stop(true, true).slideToggle(800);
        $li.toggleClass('active');
      });

      // parent link click toggles submenu
      $(document).off('click' + NS, '.sidebar-menu li.dropdown > a');
      $(document).on('click' + NS, '.sidebar-menu li.dropdown > a', function (e) {
        e.preventDefault();
        var $li = $(this).closest('li.dropdown');
        $li.children('ul').stop(true, true).slideToggle(500);
        $li.toggleClass('active');
      });
    })();

    // ---------- Video Popup (magnificPopup) ----------
    (function initVideoPopup() {
      if (!hasJQPlugin('magnificPopup')) return;
      try {
        var $video = $('.video-play');
        if ($video.length) {
          // protect from double-init by data flag
          if (!$video.data('__ravelo_magnific_video')) {
            $video.magnificPopup({ type: 'video' });
            $video.data('__ravelo_magnific_video', true);
          }
        }
      } catch (e) { /* ignore */ }
    })();

    // ---------- Slick Sliders ----------
    (function initSlick() {
      if (!hasJQPlugin('slick')) return;
      try {
        // helper to init if not already
        function initIf(selector, options) {
          var $el = $(selector);
          if ($el.length && !$el.data('__ravelo_slick')) {
            $el.slick(options);
            $el.data('__ravelo_slick', true);
          }
        }

        initIf('.testimonials-active', {
          rtl: true, slidesToShow: 1, slidesToScroll: 1, infinite: false,
          speed: 400, arrows: false, dots: false, focusOnSelect: true,
          autoplay: false, autoplaySpeed: 5000
        });

        initIf('.destination-active', {
          rtl: true, infinite: true, speed: 400, arrows: false, dots: true,
          focusOnSelect: true, autoplay: true, autoplaySpeed: 5000,
          slidesToShow: 5, slidesToScroll: 2,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 767, settings: { slidesToShow: 2 } },
            { breakpoint: 375, settings: { slidesToShow: 1, slidesToScroll: 1 } }
          ]
        });

        initIf('.client-logo-active', {
          rtl: true, infinite: true, speed: 400, arrows: false, dots: false,
          focusOnSelect: true, autoplay: true, autoplaySpeed: 5000,
          slidesToShow: 5, slidesToScroll: 1,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 991, settings: { slidesToShow: 3 } },
            { breakpoint: 575, settings: { slidesToShow: 2 } }
          ]
        });

        initIf('.hot-deals-active', {
          rtl: true, infinite: true, speed: 400, arrows: false, dots: true,
          focusOnSelect: true, autoplay: true, autoplaySpeed: 5000,
          slidesToShow: 3, slidesToScroll: 1,
          responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 767, settings: { slidesToShow: 1 } }
          ]
        });

        initIf('.gallery-slider-active', {
          rtl: true, slidesToShow: 4, slidesToScroll: 1, infinite: true,
          speed: 400, arrows: false, dots: true, centerMode: true,
          focusOnSelect: true, autoplay: true, autoplaySpeed: 5000,
          responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 3 } },
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 650, settings: { slidesToShow: 1 } }
          ]
        });

        initIf('.product-slider', {
          rtl: true, slidesToShow: 4, slidesToScroll: 1, infinite: true,
          speed: 400, arrows: false, dots: true, centerMode: false,
          focusOnSelect: true, autoplay: true, autoplaySpeed: 5000,
          responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 3 } },
            { breakpoint: 991, settings: { slidesToShow: 2 } },
            { breakpoint: 500, settings: { slidesToShow: 1 } }
          ]
        });
      } catch (e) { /* ignore */ }
    })();

    // ---------- Gallery & Instagram popups ----------
    (function initGalleryPopups() {
      if (!hasJQPlugin('magnificPopup')) return;
      try {
        var $gallery = $('.gallery a');
        if ($gallery.length && !$gallery.data('__ravelo_magnific_gallery')) {
          $gallery.magnificPopup({
            type: 'image',
            gallery: { enabled: true, navigateByImgClick: true }
          });
          $gallery.data('__ravelo_magnific_gallery', true);
        }

        var $insta = $('.instagram-item');
        if ($insta.length && !$insta.data('__ravelo_magnific_inst')) {
          $insta.magnificPopup({
            type: 'image',
            gallery: { enabled: true, navigateByImgClick: true }
          });
          $insta.data('__ravelo_magnific_inst', true);
        }
      } catch (e) { /* ignore */ }
    })();

    // ---------- Skillbar (simple port) ----------
    (function initSkillbar() {
      var $bars = $('.skillbar');
      if (!$bars.length) return;
      $bars.each(function () {
        var $this = $(this);
        if ($this.data('__ravelo_skill_inited')) return;
        $this.data('__ravelo_skill_inited', true);
        // when appearing in viewport animate (simple)
        function animateIfVisible() {
          var rect = this.getBoundingClientRect ? this.getBoundingClientRect() : null;
          if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
            var $bar = $this.find('.skillbar-bar');
            var perc = $this.attr('data-percent') || ($bar.attr && $bar.attr('data-percent')) || '';
            if ($bar.length && perc) {
              $bar.css({ 'transition': 'width 4s linear', width: perc });
            }
            $(window).off('scroll' + NS, animateIfVisible);
          }
        }
        $(window).on('scroll' + NS, animateIfVisible.bind(this));
        // check immediately
        animateIfVisible.call(this);
      });
    })();

    // ---------- Counters ----------
    (function initCounters() {
      var $wraps = $('.counter-text-wrap');
      if (!$wraps.length) return;
      $wraps.each(function () {
        var $wrap = $(this);
        if ($wrap.data('__ravelo_counter_inited')) return;
        $wrap.data('__ravelo_counter_inited', true);

        function runCounter() {
          var $count = $wrap.find('.count-text');
          if (!$count.length) return;
          var stop = parseInt($count.attr('data-stop') || '0', 10);
          var speed = parseInt($count.attr('data-speed') || '2000', 10);

          if ($wrap.data('__ravelo_counted')) return;
          $wrap.data('__ravelo_counted', true);

          var start = parseInt($count.text() || '0', 10) || 0;
          var startTime = performance.now();
          function step(now) {
            var progress = Math.min((now - startTime) / speed, 1);
            var current = Math.floor(start + (stop - start) * progress);
            $count.text(current);
            if (progress < 1) requestAnimationFrame(step);
            else $count.text(stop);
          }
          requestAnimationFrame(step);
        }

        function onScrollCheck() {
          var rect = this.getBoundingClientRect ? this.getBoundingClientRect() : null;
          if (rect && rect.top < window.innerHeight && rect.bottom >= 0) {
            runCounter();
            $(window).off('scroll' + NS, onScrollCheck);
          }
        }
        $(window).on('scroll' + NS, onScrollCheck.bind(this));
        onScrollCheck.call(this);
      });
    })();

    // ---------- Destinations Filter (imagesLoaded + isotope) ----------
    (function initDestFilter() {
      if (typeof window.imagesLoaded !== 'function' || typeof window.Isotope !== 'function') return;
      var $container = $('.destinations-active');
      var $nav = $('.destinations-nav');
      if (!$container.length || !$nav.length) return;
      if ($container.data('__ravelo_isotope')) return;

      safeCall(function () {
        window.imagesLoaded($container.get(0), function () {
          // init isotope
          var iso = new window.Isotope($container.get(0), {
            originLeft: false,
            itemSelector: '.item',
            percentPosition: true
          });
          $container.data('__ravelo_isotope', true);

          // nav click
          $nav.off('click' + NS).on('click' + NS, 'li', function (e) {
            var $li = $(this);
            var filterValue = $li.attr('data-filter') || '*';
            iso.arrange({ filter: filterValue });
            $li.siblings('.active').removeClass('active');
            $li.addClass('active');
            e.preventDefault();
          });
        });
      });
    })();

    // ---------- Price range (jQuery UI slider) ----------
    (function initPriceRange() {
      if (!hasJQPlugin('slider')) return;
      try {
        var $range = $('.price-slider-range');
        if ($range.length && !$range.data('__ravelo_price')) {
          $range.slider({
            rtl: true, range: true, min: 5, max: 1000, values: [100, 750],
            slide: function (event, ui) {
              $('#price').val("$ " + ui.values[0] + " - $ " + ui.values[1]);
            }
          });
          $('#price').val("$ " + $range.slider("values", 0) + " - $ " + $range.slider("values", 1));
          $range.data('__ravelo_price', true);
        }
      } catch (e) { /* ignore */ }
    })();

    // ---------- Hover content ----------
    (function initHoverContent() {
      $(document).off('mouseenter' + NS, '.hover-content');
      $(document).on('mouseenter' + NS, '.hover-content', function () {
        $(this).find('.inner-content').stop(true, true).slideDown();
      });
      $(document).off('mouseleave' + NS, '.hover-content');
      $(document).on('mouseleave' + NS, '.hover-content', function () {
        $(this).find('.inner-content').stop(true, true).slideUp();
      });
    })();

    // ---------- Scroll to target ----------
    (function initScrollTarget() {
      $(document).off('click' + NS, '.scroll-to-target');
      $(document).on('click' + NS, '.scroll-to-target', function (e) {
        e.preventDefault();
        var target = $(this).attr('data-target');
        if (!target) return;
        var $tg = $(target);
        if ($tg.length) {
          $('html, body').animate({ scrollTop: $tg.offset().top }, 1000);
        }
      });
    })();

    // ---------- Nice select ----------
    (function initNiceSelect() {
      if (hasJQPlugin('niceSelect')) {
        try {
          $('select').each(function () {
            var el = this;
            if (!el.__ravelo_nice) {
              $(this).niceSelect();
              el.__ravelo_nice = true;
            }
          });
        } catch (e) { /* ignore */ }
      }
    })();

    // ---------- AOS ----------
    (function initAOS() {
      if (window.AOS && typeof window.AOS.init === 'function') {
        if (!window.__ravelo_inited.aos) {
          window.AOS.init();
          window.__ravelo_inited.aos = true;
        }
      }
    })();

    // ---------- Window resize behavior ----------
    (function bindResize() {
      $(window).off('resize' + NS + '.navReset').on('resize' + NS + '.navReset', function () {
        var $navcollapse = $('.navigation li.dropdown');
        $navcollapse.children('ul').hide();
        $navcollapse.children('.megamenu').hide();
      });
    })();

    // mark general init done
    window.__ravelo_inited.general = true;
  } // end initRavelo

  // run on initial DOM ready
  $(document).ready(function () {
    // debug line was present earlier; keep optional
    // debugger;
    initRavelo();
  });

  // expose to window for manual calls (Angular should call this after NavigationEnd)
  window.RaveloInit = initRavelo;

})(jQuery, window, document);

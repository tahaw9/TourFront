import {Component, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {filter} from 'rxjs/operators';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  imports: [
    NgClass,
    RouterOutlet
  ],
  styleUrls: ['../../assets/css/style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainLayoutComponent implements OnInit {
  headerClass = 'main-header header-one white-menu menu-absolute';
  headerUpperClass = 'header-upper py-30 rpy-0'

  constructor(
    private router: Router, private renderer: Renderer2) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = event.urlAfterRedirects;
        // this.hidePreloader();
        if (url.startsWith('/TourList') || url.startsWith('/AboutUs') || url.startsWith('/404') || url.startsWith('/TourDetails')) {
          this.headerClass = 'main-header header-one';
          this.headerUpperClass = 'header-upper bg-white py-30 rpy-0'
        } else {
          this.headerClass = 'main-header header-one white-menu menu-absolute';
          this.headerUpperClass = 'header-upper py-30 rpy-0'

        }
      });
  }
  ngOnInit() {
  }

  goToTourList() {
    this.router.navigate(['/TourList']).then(r => {
    });
  }
  goToAboutUs() {
    this.router.navigate(['/AboutUs']).then(r => {
    });
  }
  // private hidePreloader(): void {
  //   const preloader = document.querySelector('.preloader');
  //   if (preloader) {
  //     setTimeout(() => {
  //       this.renderer.setStyle(preloader, 'transition', 'opacity 0.5s');
  //       this.renderer.setStyle(preloader, 'opacity', '0');
  //       setTimeout(() => {
  //         this.renderer.setStyle(preloader, 'display', 'none');
  //       }, 500); // مدت زمان fadeOut
  //     }, 200); // delay قبل از fadeOut
  //   }
  // }


}

import {Component, HostListener, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  styleUrls: ['../style.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {
  isSidebarOpen: boolean = false;
  IsLandscape: boolean = true;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
    this.checkWidth();
  }

  ngAfterViewInit() {
  }

  toggleSidebar(event: Event) {
    event.stopPropagation();

    this.isSidebarOpen = !this.isSidebarOpen;

    // معادل $('body').toggleClass('sidebar-open')
    if (this.isSidebarOpen) {
      this.renderer.addClass(document.body, 'sidebar-open');
    } else {
      this.renderer.removeClass(document.body, 'sidebar-open');
    }
  }

  closeSidebar() {
    this.isSidebarOpen = false;
    this.renderer.removeClass(document.body, 'sidebar-open');
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const sidebar = document.getElementById('sidebar');
    if (this.isSidebarOpen && sidebar && !sidebar.contains(event.target as Node)) {
      if (window.innerWidth < 992) {
        this.closeSidebar();
      }
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  checkWidth() {
    if (window.innerWidth < 992) {
      this.isSidebarOpen = false;
      this.IsLandscape = false;
      this.renderer.removeClass(document.body, 'sidebar-open');
    } else {
      this.IsLandscape = true;
      this.isSidebarOpen = true;
      this.renderer.addClass(document.body, 'sidebar-open');
    }
  }

}

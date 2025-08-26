import {Component, HostListener, OnInit, Renderer2, ViewEncapsulation} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  isSidebarOpen: boolean = false;

  constructor(private renderer: Renderer2, private router: Router) {
  }

  ngOnInit() {
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
  }
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const sidebar =   document.getElementById('sidebar');
    if (this.isSidebarOpen && sidebar && !sidebar.contains(event.target as Node)) {
      if (window.innerWidth < 992){
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
      this.renderer.removeClass(document.body, 'sidebar-open');
    } else {
      this.isSidebarOpen = true;
      this.renderer.addClass(document.body, 'sidebar-open');
    }
  }
  ngAfterViewInit() {
    this.checkWidth();
  }

  goToLocationList() {
    this.router.navigate(['/ManageLocations']).then(r => {
    });
  }
  goToTourList() {
    this.router.navigate(['/ManageTours']).then(r => {
    });
  }

}

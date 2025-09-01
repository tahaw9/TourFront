import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

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
  IsLandscape: boolean = true;

  constructor(private renderer: Renderer2, private router: Router) {
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

  goToLocationList() {
    this.router.navigate(['/admin/ManageLocations']).then(r => {
    });
  }

  goToTourList() {
    debugger
    this.router.navigate(['/admin/ManageTours']).then(r => {
    });
  }

  dashboard() {
    this.router.navigate(['/admin']).then(r => {
    });
  }

}

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { PluginInitializer } from './services/plugin-initializer';
import { filter } from 'rxjs/operators';
import { PluginNotifyService } from './services/plugin-notify.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RouterOutlet, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, CommonModule, HttpClientModule],
  templateUrl: './app.Component.html',
  styleUrl: './app.Component.scss',
  providers: [PluginInitializer]
})
export class App {
  headerClass = 'main-header header-one white-menu menu-absolute';
  headerUpperClass = 'header-upper py-30 rpy-0'
  constructor(
    private router: Router,
    private pluginService: PluginInitializer,
    private pluginNotifyService: PluginNotifyService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = event.urlAfterRedirects;
        if (url.startsWith('/TourList') || url.startsWith('/AboutUs') || url.startsWith('/404')) {
          this.headerClass = 'main-header header-one';
          this.headerUpperClass = 'header-upper bg-white py-30 rpy-0'
        } else {
          this.headerClass = 'main-header header-one white-menu menu-absolute';
          this.headerUpperClass = 'header-upper py-30 rpy-0'

        }
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.pluginService.initAll();
            this.pluginNotifyService.notifyPluginInitialized();
          }, 0);
        }
      });
  }


  goToTourList() {
    this.router.navigate(['/TourList']);
  }
}

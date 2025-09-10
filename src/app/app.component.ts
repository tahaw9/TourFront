import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, Renderer2} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {PluginInitializer} from './services/plugin-initializer';
import {filter} from 'rxjs/operators';
import {PluginNotifyService} from './services/plugin-notify.service';
import {UiPluginService} from './services/UiPluginService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, RouterOutlet, MatFormFieldModule, MatInputModule, MatSelectModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, CommonModule, HttpClientModule],
  templateUrl: './app.Component.html',
  styleUrl: './app.Component.scss',
  providers: [PluginInitializer, UiPluginService]
})
export class App {
  headerClass = 'main-header header-one white-menu menu-absolute';
  headerUpperClass = 'header-upper py-30 rpy-0'

  constructor(
    private router: Router,
    private pluginService: PluginInitializer,
    private pluginNotifyService: PluginNotifyService,
    private UiPlugin: UiPluginService,
    private renderer: Renderer2) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          setTimeout(() => {
            this.pluginService.initAll();
            this.pluginNotifyService.notifyPluginInitialized();
            if (typeof (window as any).RaveloInit === 'function') (window as any).RaveloInit();
            // this.UiPlugin.initAll();
          }, 0);
        }
      });
  }




}

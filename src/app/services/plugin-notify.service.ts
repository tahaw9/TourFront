import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PluginNotifyService {
  private pluginInitSubject = new BehaviorSubject<void>(undefined);

  pluginInitialized$ = this.pluginInitSubject.asObservable();

  notifyPluginInitialized() {
    this.pluginInitSubject.next();
  }
}
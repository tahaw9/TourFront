import {Injectable, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloned = req.clone({withCredentials: true});
        return next.handle(cloned);
    }

}
export const  httpWithCredentialsInterceptorProvider: Provider = {

  provide: HTTP_INTERCEPTORS,
  useClass: CredentialsInterceptor,
  multi: true
};


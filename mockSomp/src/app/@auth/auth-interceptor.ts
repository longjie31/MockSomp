import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from './services/auth.service';
import {AuthScopeService} from './services/auth-scope.service';
import {catchError, map} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
                private asService: AuthScopeService,
                private message: NzMessageService,
                private router: Router) {
    }

    // http请求拦截，给请求头加上认证信息，并刷新token
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.needAuthToken(req.url)) {
            // 刷新token并设置请求头
            // 刷新token
            const oldToken = this.asService.getToken();
            const newToken = this.authService.refreshToken(oldToken);
            // 设置请求头
            req = req.clone({
                setHeaders: {
                    MyAuthor: newToken
                }
            });
        }
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event['headers'].get('Content-disposition')) {
                    event['body']['_filename'] = decodeURI(event['headers'].get('Content-disposition').split('filename=')[1]);
                }
                if (event['body'] && _.isInteger(event['body'].code) && event['body'].code !== 1) {
                    this.message.error(event['body'].msg);
                }
                return event;
            }),
            catchError((err) => {
                const timouts = [400, 401];
                const exceptions = [403, 404, 500];
                const errors = [408, 1001];
                const errMsg = err.error ? err.error.msg || err.error.error || err.statusText : '未知错误，请您联系管理员';
                if (timouts.includes(err.status)) {
                    this.router.navigateByUrl('/auth/login').then();
                } else {
                    this.message.error(errMsg);
                    if (exceptions.includes(err.status)) {
                        return of(new HttpResponse({body: {code: -1, msg: errMsg}}));
                    } else if (errors.includes(err.status)) {
                        return of(new HttpResponse({body: {code: -1, msg: errMsg}}));
                    } else {
                        return of(new HttpResponse({body: {code: -1, msg: errMsg}}));
                    }
                }
            })
        );
    }
}

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthScopeService {

    constructor() {
    }

    // 清除session
    clearSession() {
        sessionStorage.clear();
    }

    // 设置token和uid
    setToken(token) {
        sessionStorage.setItem('token', token);
    }

    getToken(): string {
        return sessionStorage.getItem('token');
    }

    setUid(uid) {
        sessionStorage.setItem('uid', uid);
    }

    getUid(): string {
        return sessionStorage.getItem('uid');
    }
}

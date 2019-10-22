import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) {
    }

    myPost(url: string, body = {}): Observable<any> {
        return this.http.post(url, body).pipe(
            map(res => {
                if (res && res['code'] === 1) {
                    return res['data'];
                } else {
                    return -1;
                }
            })
        );
    }
}

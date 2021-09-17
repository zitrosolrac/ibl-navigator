import { Injectable } from '@angular/core';
import Observable from 'rxjs/observable'
import { HttpClient } from '@angular/common'

@Injectable()
export class SessionsService {

    constructor(private http:HttpClient) {}

    findSessions(
        filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 10):  Observable<Session[]> {

        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }
}
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { catchError, finalize, of } from 'rxjs/operators'
import {SessionListComponent} from './session-list.component'
import { SessionsService } from './SessionsService';

export class SessionDataSource implements DataSource<SessionListComponent> {

    private sessionsSubject = new BehaviorSubject<SessionListComponent[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private sessionsService: SessionsService) {}

    connect(collectionViewer: CollectionViewer): Observable<SessionListComponent[]> {
        return this.sessionsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.sessionsSubject.complete();
        this.loadingSubject.complete();
    }

    loadSessions(filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.sessionsService.findSessions(filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(sessions => this.sessionsSubject.next(sessions));
    }

}
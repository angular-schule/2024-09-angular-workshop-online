import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';
import { BookActions } from './book.actions';
import { BookStoreService } from '../shared/book-store.service';


@Injectable()
export class BookEffects {

  private actions$ = inject(Actions);
  private bs = inject(BookStoreService);

  loadBooks$ = createEffect(() => {
    /*
    - wenn eine Action loadBooks reinkommt, dann
    - HTTP getAll()
    - dann loadBooksSuccess dispatchen
    - bei Fehler: loadBooksFailure dispatchen
    */
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() => this.bs.getAll().pipe(
        map(books => BookActions.loadBooksSuccess({ data: books })),
        catchError(err => of(BookActions.loadBooksFailure({ error: 'FEHLER!' })))
      )),
    )
  });

}

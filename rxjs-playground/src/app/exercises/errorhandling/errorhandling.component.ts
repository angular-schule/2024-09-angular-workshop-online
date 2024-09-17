import { Component, inject } from '@angular/core';
import { ReplaySubject, throwError, of, EMPTY, retry, catchError, from, Observable } from 'rxjs';

import { HistoryComponent } from '../../shared/history/history.component';
import { DataService } from './data.service';

@Component({
  templateUrl: './errorhandling.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class ErrorhandlingComponent {

  logStream$ = new ReplaySubject<unknown>();
  private ds = inject(DataService);

  /**
   * Das Observable aus `this.ds.getData()` liefert Daten – oder mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln.
   */

  start() {
    this.ds.getData().pipe(
      catchError(err => {
        // mit Fehler arbeiten

        // Ergebnis
        // Fehler ersetzen durch "gutartiges" Element
        // return of('Nichts passiert!', '😇');

        // Fehler unterdrücken/ignorieren
        // return of();
        // return EMPTY;

        // Fehler weiterwerfen
        // return throwError(() => 'MEIN FEHLER! 😒');
        throw 'BÖSER FEHLER! 😡';
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err),
      complete: () => this.logStream$.next('🏁 COMPLETE')
    });
  }
}

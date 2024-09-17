import { Component } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, map, filter, Observer, Subscriber } from 'rxjs';
import { HistoryComponent } from '../../shared/history/history.component';

@Component({
  templateUrl: './creating.component.html',
  standalone: true,
  imports: [HistoryComponent]
})
export class CreatingComponent {

  logStream$ = new ReplaySubject<unknown>();

  constructor() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    // of('Leipzig', 'Zürich', 'Frankfurt', 'Kiel', 'Berlin')
    // from([10, 20, 30, 40, 50])
    // interval(1000)           // ---0---1---2---3---4---5 ...
    // timer(3000)              // ---------0|
    // timer(3000, 1000)        // ---------0---1---2---3---4---5 ...
    // timer(0, 1000)           // 0---1---2---3---4---5 ...


    timer(0, 1000).pipe(
      map(e => e * 3),
      filter(e => e % 2 === 0)
    ).subscribe({
      next: e => this.log(e),
      complete: () => this.log('COMPLETE')
    });



    /******************************/

    // Producer: generiert die Daten
    function producer(sub: Subscriber<number>) {
      const result = Math.random();
      sub.next(result);
      sub.next(10);
      sub.next(20);

      setTimeout(() => sub.next(100), 2000)
      setTimeout(() => sub.next(500), 4000)
      setTimeout(() => sub.next(800), 6000)
      setTimeout(() => sub.complete(), 6500)
    }

    // Observer: hört zu
    const observer: Observer<number> = {
      next: (e: number) => console.log(e),
      error: (err: any) => console.error(err),
      complete: () => console.log('FERTIG')
    };

    // producer(observer);

    // Observable: Schnittstelle zwischen Observer und Producer
    const myObservable$ = new Observable(producer);
    // myObservable$.subscribe(observer);


    const myObs2$ = new Observable<string>(sub => {
      sub.next('Hallo');
      sub.next('Welt');
      sub.complete();
    });




    /******************************/
  }

  private log(msg: unknown) {
    this.logStream$.next(msg);
  }

}

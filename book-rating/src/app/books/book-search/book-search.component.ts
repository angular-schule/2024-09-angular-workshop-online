import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, map, mergeMap, of, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss',
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  private bs = inject(BookStoreService);

  // ZUSATZAUFGABE: bei leerem Suchbegriff Liste leeren
  searchResult = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((term) => {
        if (term.length >= 3) {
          return this.bs.search(term);
        } else {
          return of([]);
        }
      }),
      // ZUSATZAUFGABE: Buchliste sortieren
      map(books => [...books].sort((a, b) => b.rating - a.rating))
    )
  );

  /*searchResult = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      filter((e) => e.length >= 3),
      switchMap((term) => this.bs.search(term)),
      // ZUSATZAUFGABE: Buchliste sortieren
    )
  );*/
}

import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { concatMap, filter, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  private route = inject(ActivatedRoute);
  private bs = inject(BookStoreService);

  // book?: Book;
  // xbook = signal<Book | undefined>(undefined);
  book$: Observable<Book>;

  constructor() {
    // PULL
    // const isbn = this.route.snapshot.paramMap.get('isbn'); // path: 'books/:isbn'
    // console.log(isbn);

    // PUSH
    this.book$ = this.route.paramMap.pipe(
      map(params => params.get('isbn')),
      filter(isbn => isbn !== null),
      concatMap(isbn => this.bs.getSingle(isbn))
    );





  }

  /*
  AUFGABE
  - Buch abrufen (HTTP getSingle)
  - Buch anzeigen (z.B. Titel und Text)
  */
}

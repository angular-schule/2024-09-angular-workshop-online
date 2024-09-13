import { Component, inject, signal } from '@angular/core';
import { Book } from '../shared/book';
import { BookComponent } from '../book/book.component';
import { BookRatingService } from '../shared/book-rating.service';
import { JsonPipe } from '@angular/common';
import { BookStoreService } from '../shared/book-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookComponent, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private rs = inject(BookRatingService);
  private bs = inject(BookStoreService);

  // books: Book[] = [];
  books = signal<Book[]>([]);

  constructor() {
    this.bs.getAll().subscribe({
      next: books => {
        this.books.set(books);
        // this.books = books;
      },
      error: (err: HttpErrorResponse) => {}
    })
  }

  doRateUp(book: Book) {
    const ratedBook = this.rs.rateUp(book);
    this.updateList(ratedBook);
  }

  doRateDown(book: Book) {
    const ratedBook = this.rs.rateDown(book);
    this.updateList(ratedBook);
  }

  private updateList(ratedBook: Book) {
    // [1,2,3,4,5].map(e => e * 10) // [10, 20, 30, 40, 50]
    // [1,2,3,4,5,6,7,8,9].filter(e => e % 2 === 0) // [2,4,6,8]

    /* // ohne Signal
    this.books = this.books.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    });*/

    /* // mit Signal und set()
    this.books.set(this.books().map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    }))*/

    // mit Signal mit update()
    this.books.update(currentBookList => currentBookList.map(b => {
      if (b.isbn === ratedBook.isbn) {
        return ratedBook;
      } else {
        return b;
      }
    }));


  }
}

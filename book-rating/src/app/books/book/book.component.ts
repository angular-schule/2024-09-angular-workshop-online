import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent, CurrencyPipe, RouterLink],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  // @Input() book?: Book;
  book = input.required<Book>();

  @Input() maxRating = 10;
  @Input() minRating = 0;

  // Hier fließen Daten zur Elternkomponente hinaus
  // von unten nach oben
  // @Output() rateUp = new EventEmitter<Book>();
  // @Output() rateDown = new EventEmitter<Book>();
  rateUp = output<Book>();
  rateDown = output<Book>();
  delete = output<Book>();

  doRateUp() {
    this.rateUp.emit(this.book());
  }

  doRateDown() {
    this.rateDown.emit(this.book())
  }

  doDelete() {
    if (!confirm('Buch wirklich löschen?')) {
      return;
    }

    this.delete.emit(this.book());
  }
}

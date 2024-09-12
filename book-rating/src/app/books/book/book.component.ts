import { Component, EventEmitter, input, Input, Output, output } from '@angular/core';
import { Book } from '../shared/book';
import { RatingComponent } from '../rating/rating.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [RatingComponent, CurrencyPipe],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  @Input() book?: Book;

  // @Output() rateUp = new EventEmitter<Book>();
  // @Output() rateDown = new EventEmitter<Book>();
  rateUp = output<Book>();
  rateDown = output<Book>();

  doRateUp() {
    if (this.book) {
      this.rateUp.emit(this.book);
    }
  }

  doRateDown() {
    if (this.book) {
      this.rateDown.emit(this.book);
    }
  }
}

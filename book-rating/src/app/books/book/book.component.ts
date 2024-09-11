import { Component, input, Input } from '@angular/core';
import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  // Hier fließen Daten von der Elternkomponente hinein
  // von oben nach unten
  @Input() book?: Book;
}

import { Component, inject, input, resource, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookStoreService } from '../shared/book-store.service';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent {
  private bs = inject(BookStoreService);
  isbn = input.required<string>();

  /*bookResource = resource({
    request: this.isbn,
    loader: ({ request }) => {
      return firstValueFrom(this.bs.getSingle(request))
      // return firstValueFrom(this.bs.getSingle(this.isbn()))
    }
  });*/

  bookResource = rxResource({
    request: this.isbn,
    loader: ({ request }) => this.bs.getSingle(request)
  });
}

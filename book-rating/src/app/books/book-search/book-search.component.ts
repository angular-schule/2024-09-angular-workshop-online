import { Component, inject, resource } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, mergeMap, switchMap } from 'rxjs';
import { BookStoreService } from '../shared/book-store.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-book-search',
    imports: [ReactiveFormsModule],
    templateUrl: './book-search.component.html',
    styleUrl: './book-search.component.scss',
})
export class BookSearchComponent {
  searchControl = new FormControl('', { nonNullable: true });
  private bs = inject(BookStoreService);

  private searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      filter((e) => e.length >= 3),
      distinctUntilChanged()
    )
  );

  results = rxResource({
    request: this.searchTerm,
    loader: ({ request: term }) => this.bs.search(term)
  });
}

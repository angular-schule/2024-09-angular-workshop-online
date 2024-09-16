import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Book } from './book';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';
  private http = inject(HttpClient);

  constructor() { }

  getAll() {
    return this.http.get<Book[]>(this.apiUrl + '/books');
  }

  getSingle(isbn: string) {
    return this.http.get<Book>(this.apiUrl + '/books/' + isbn);
  }

  create(book: Book) {
    return this.http.post<Book>(this.apiUrl + '/books', book);
  }

  search(term: string) {
    return this.http.get<Book[]>(this.apiUrl + '/books/search/' + term);
  }

  delete(isbn: string) {
    return this.http.delete<unknown>(this.apiUrl + '/books/' + isbn);
  }
}

import { createFeature, createReducer, on } from '@ngrx/store';
import { BookActions } from './book.actions';
import { Book } from '../shared/book';

export const bookFeatureKey = 'book';

export interface State {
  books: Book[];
  loading: boolean;
}

export const initialState: State = {
  books: [],
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, state => {
    return { ...state, loading: true };
  }),

  on(BookActions.loadBooksSuccess, (state, action) => {
    return {
      ...state,
      books: action.data,
      loading: false
    };
  }),

  on(BookActions.loadBooksFailure, (state, action) => {
    return { ...state, loading: false };
  }),

  on(BookActions.rateUp, (state, action) => {
    const ratedBook = rateUp(action.book);
    const updatedBookList = updateBookList(state.books, ratedBook);
    return { ...state, books: updatedBookList };
  }),

  on(BookActions.rateDown, (state, action) => {
    const ratedBook = rateDown(action.book);
    const updatedBookList = updateBookList(state.books, ratedBook);
    return { ...state, books: updatedBookList };
  }),
);

export const bookFeature = createFeature({
  name: bookFeatureKey,
  reducer,
});



//////////

// lokale Funktionen, die aus dem Reducer ausgelagert werden, sind in Ordnung,
// solange sie auch Pure Functions sind!


function rateUp(book: Book): Book {
  return {
    ...book,
    rating: Math.min(5, book.rating + 1),
  };
}

function rateDown(book: Book): Book {
  return {
    ...book,
    rating: Math.max(1, book.rating - 1)
  }
}


function updateBookList(books: Book[], ratedBook: Book): Book[] {
  return books.map(b => {
    if (b.isbn === ratedBook.isbn) {
      return ratedBook;
    } else {
      return b;
    }
  })
}

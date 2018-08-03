import { Book } from '../../shared/book';
import { BooksActions, BooksActionTypes } from '../actions/books.actions';

export interface BooksState {
  books: Book[],
  loading: boolean
}

const initialState = {
  books: [],
  loading: false
};

export function booksReducer(state: BooksState = initialState, action: BooksActions): BooksState {
  switch (action.type) {

    case BooksActionTypes.LoadBooks: {
      return { ...state, loading: true };
    }

    case BooksActionTypes.LoadBooksSuccess: {
      const books = action.payload;
      return { ...state, loading: false, books }
    }

    case BooksActionTypes.LoadBooksFail: {
      return { ...state, loading: false }
    }

    default: { return state; }
  }
}

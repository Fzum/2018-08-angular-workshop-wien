import { Book } from '../../shared/book';
import { BooksActions, BooksActionTypes } from '../actions/books.actions';

export interface BooksState {
}

const initialState = {
};

export function booksReducer(state: BooksState = initialState, action: BooksActions): BooksState {
  switch (action.type) {
    default: { return state; }
  }
}

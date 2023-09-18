import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Book = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
};

export type BookState = {
  books: Book[];
};

const initialState: BookState = {
  books: [
    {
      id: "Do8E1Et8jdEfIgFoTDSHh",
      name: "Harry Potter and the Prisoner of Azkaban",
      price: "24",
      category: 'Fiction',
      description: 'It is time to PASS THE MAGIC ON'
    },
    {
      id: "Do8E1Et8kdEfIgFoTDSHj",
      name: "A Brief History of Time",
      price: "20",
      category: 'Physics',
      description: 'Big Bang to Black Holes is a book on theoretical cosmology'
    }
  ]
}

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      const book = {
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        price: action.payload.price,
        description: action.payload.description
      }
      state.books.push(book)
    },
    editBook: (state, action: PayloadAction<Book>) => {
      const bookIndex = state.books.findIndex((book) => book.id === action.payload.id);
      if (bookIndex !== -1) {
        state.books[bookIndex] = action.payload;
      }

    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload)
    },
  }
})

export const { addBook, editBook, deleteBook } = bookSlice.actions
export default bookSlice.reducer

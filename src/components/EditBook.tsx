"use client"
import React, { useState } from 'react';
import { Book } from '../redux/reducers/book-slice';
import Form from '../components/reusable/Form';

type EditBookModalProps = {
  book: Book;
  onClose: () => void;
  onSave: (book: Book) => void;
}

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'price', label: 'Price' },
  { name: 'category', label: 'Category' },
  { name: 'description', label: 'Description' },
];

const EditBookForm: React.FC<EditBookModalProps> = ({ book, onClose, onSave }) => {
  const [editedBook, setEditedBook] = useState(book);

  const handleFieldChange = (fieldName: string, value: string) => {
    setEditedBook((prevBook) => ({
      ...prevBook,
      [fieldName]: value,
    }));
  };


  const handleSubmit = () => {
    onSave(editedBook);
    onClose();
  };

  return (
    <Form
      fields={fields}
      initialValues={book}
      onSubmit={handleSubmit}
      onCancel={onClose}
      onFieldChange={handleFieldChange}
    />
  );
};

export default EditBookForm;

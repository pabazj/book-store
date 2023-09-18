"use client"
import React, { useState } from 'react';
import { Book } from '../redux/reducers/book-slice';
import Form from '../components/reusable/Form'

type AddBookFormProps = {
  onClose: () => void;
  onSave: (book: Book) => void;
};

const fields = [
  { name: 'name', label: 'Name' },
  { name: 'price', label: 'Price' },
  { name: 'category', label: 'Category' },
  { name: 'description', label: 'Description' },
];

const AddBookForm: React.FC<AddBookFormProps> = ({ onSave, onClose }) => {

  const [formData, setFormData] = useState<Partial<Book>>({
    name: '',
    price: '',
    category: '',
    description: '',
  });

  const handleSubmit = () => {
    const newBook: Book = {
      id: '',
      name: formData.name || '',
      price: formData.price || '',
      category: formData.category || '',
      description: formData.description || '',
    };
    onSave(newBook);
    onClose();
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  return (
    <Form
      fields={fields}
      initialValues={formData}
      onSubmit={handleSubmit}
      onCancel={onClose}
      onFieldChange={handleFieldChange}
    />
  );
};

export default AddBookForm;

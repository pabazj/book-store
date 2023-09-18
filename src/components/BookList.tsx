"use client"
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook, addBook, editBook } from '../redux/reducers/book-slice';
import { RootState } from '../redux/store';
import { Book } from '../redux/reducers/book-slice';
import Table from '../components/reusable/Table';
import Modal from '../components/reusable/Modal';
import AddBookForm from './AddBook';
import EditBookForm from './EditBook';
import { nanoid } from '@reduxjs/toolkit';

const BookList: React.FC = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();

    const tableData: Book[] = books.map((book) => ({
        id: book.id,
        name: book.name,
        price: book.price,
        category: book.category,
        description: book.description,
    }));

    const handleDeleteClick = (bookId: string) => {
        dispatch(deleteBook(bookId));
    };

    const toggleModal = (editMode: boolean = false, book: Book | null = null) => {
        setIsModalOpen(!isModalOpen);
        setIsEditMode(editMode);
        setSelectedBook(book);
    };

    const handleEditClick = (book: Book) => {
        toggleModal(true, book);
    };

    const handleRowActionClick = (row: Book, action: 'edit' | 'delete') => {
        if (action === 'edit') {
            handleEditClick(row);
        } else if (action === 'delete') {
            handleDeleteClick(row.id);
        }
    };

    const handleAddSave = (formData: Book) => {
        const newBook: Book = {
            id: nanoid(),
            name: formData.name || '',
            price: formData.price || '',
            category: formData.category || '',
            description: formData.description || '',
        };
        dispatch(addBook(newBook));
    };

    const handleEditSave = (formData: Book) => {
        const updatedBook: Book = {
            id: selectedBook?.id || '',
            name: formData.name || '',
            price: formData.price || '',
            category: formData.category || '',
            description: formData.description || '',
        };
        dispatch(editBook(updatedBook));
    };

    return (
        <div>
            <div className="relative">
                <div className="sticky top-10">
                    <div className="flex justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-0 mx-16"
                            onClick={() => toggleModal(false)}
                        >
                            Add Book
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="my-2 overflow-x-auto sm:-max-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 m-4 sm:rounded-lg mx-16">
                                {tableData.length === 0 ? (
                                    <p className="text-center text-gray-500 py-4 font-semibold mx-16">No data available.</p>
                                ) : (
                                    <Table
                                        data={tableData}
                                        onRowActionClick={handleRowActionClick}
                                        columns={[
                                            { title: 'Name', accessor: 'name', onClick: true },
                                            { title: 'Price', accessor: 'price', onClick: true },
                                            { title: 'Category', accessor: 'category', onClick: true },
                                            { title: 'Description', accessor: 'description', onClick: true }
                                        ]}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <Modal open={isModalOpen} onClose={toggleModal}>
                    <h1 className="text-3xl text-center mb-2 font-bold mt-4">
                        {isEditMode ? 'Edit Book' : 'Add Book'}
                    </h1>
                    {isEditMode ? (
                        <EditBookForm book={selectedBook as Book} onClose={toggleModal} onSave={handleEditSave} />
                    ) : (
                        <AddBookForm onClose={toggleModal} onSave={handleAddSave} />
                    )}
                </Modal>
            )}
        </div>
    );
};

export default BookList;


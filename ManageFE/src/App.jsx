import React, { useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const addBook = () => {
    if (!nameInput || !authorInput || !yearInput || !quantityInput || !priceInput) {
      alert("Please fill in all fields");
      return;
    }

    const year = parseInt(yearInput);
    const quantity = parseInt(quantityInput);
    const price = parseFloat(priceInput);

    if (isNaN(year) || year <= 0) {
      alert("Please enter a valid year");
      return;
    }

    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price");
      return;
    }

    const newBook = { 
      id: Date.now(), 
      name: nameInput, 
      author: authorInput, 
      year: year, 
      quantity: quantity, 
      price: price 
    };

    setBooks([...books, newBook]);
    setNameInput('');
    setAuthorInput('');
    setYearInput('');
    setQuantityInput('');
    setPriceInput('');
    alert("Book added successfully");
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='app-frame'>
      <div className='title-box'>
        <div className='title-text'>
          <p>Book Management</p>
        </div>
      </div>
      <div className='book-input'>
        <div>
          <p>Name</p>
          <input className='name-input' type='text' value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
        </div>
        <div>
          <p>Author</p>
          <input className='author-input' type='text' value={authorInput} onChange={(e) => setAuthorInput(e.target.value)} />
        </div>
        <div>
          <p>Year</p>
          <input className='year-input' type='number' value={yearInput} onChange={(e) => setYearInput(e.target.value)} />
        </div>
        <div>
          <p>Quantity</p>
          <input className='quantity-input' type='number' value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} />
        </div>
        <div>
          <p>Price</p>
          <input className='price-input' type='number' value={priceInput} onChange={(e) => setPriceInput(e.target.value)} />
        </div>
        <button onClick={addBook}>Add Book</button>
      </div>
      <div className="book-list">
        <h2>Books</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.quantity}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

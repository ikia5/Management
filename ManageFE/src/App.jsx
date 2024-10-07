import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [authorInput, setAuthorInput] = useState('');
  const [yearInput, setYearInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:4000/allbook');
        if (!response.ok) throw new Error('Failed to fetch books');
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clearInputs = () => {
    setNameInput('');
    setAuthorInput('');
    setYearInput('');
    setQuantityInput('');
    setPriceInput('');
  };

  const validateInputs = (year, quantity, price) => {
    if (isNaN(year) || year <= 0) {
      alert("Please enter a valid year");
      return false;
    }
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity");
      return false;
    }
    if (isNaN(price) || price < 0) {
      alert("Please enter a valid price");
      return false;
    }
    return true;
  };

  const addBook = async () => {
    if (!nameInput || !authorInput || !yearInput || !quantityInput || !priceInput) {
      alert("Please fill in all fields");
      return;
    }

    const year = parseInt(yearInput);
    const quantity = parseInt(quantityInput);
    const price = parseFloat(priceInput);

    if (validateInputs(year, quantity, price)) {
      const newBook = {
        id: Date.now(), 
        name: nameInput, 
        author: authorInput, 
        year, 
        quantity, 
        price 
      };

      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:4000/addbook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBook),
        });

        if (!response.ok) throw new Error('Failed to add book');
        const result = await response.json();
        setBooks([...books, newBook]);
        clearInputs();
        alert(`Book added successfully: ${result.name}`);
      } catch (err) {
        setError(err.message);
        alert("There was an error adding the book");
      } finally {
        setLoading(false);
      }
    }
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
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
            {currentBooks.map(book => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td>{book.quantity}</td>
                <td>{book.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {totalPages > 1 && (
          Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
              {index + 1}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BooksList from './features/books/BooksList';
import DonorsList from './features/donors/DonorsList';
import NeededList from './features/booksNeeded/NeededList';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/donors" />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/donors" element={<DonorsList />} />
          <Route path="/booksNeeded" element={<NeededList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
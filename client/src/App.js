import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./features/NavBar";
import HomePage from './features/home/HomePage';
import BooksList from './features/books/BooksList';
import DonorsList from './features/donors/DonorsList';
import NeededList from './features/booksNeeded/NeededList';
import MessageList from './features/messages/MessagesList';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/donors" element={<DonorsList />} />
            <Route path="/booksNeeded" element={<NeededList />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
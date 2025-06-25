import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "../src/features/NavBar";
import HomePage from './features/home/HomePage';
import BooksList from './features/books/BooksList';
import DonorsList from './features/donors/DonorsList';
import NeededList from './features/booksNeeded/NeededList';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';
import MessageList from './features/messages/MessagesList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="p-4">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/" element={<Navigate to="/donors" />} />
            <Route path="/books" element={<BooksList />} />
            <Route path="/donors" element={<DonorsList />} />
            <Route path="/booksNeeded" element={<NeededList />} />
            <Route path="/message" element={<MessageList />} />
          </Routes>
        </Router >
      </div>
    </div >
  );
}

export default App;
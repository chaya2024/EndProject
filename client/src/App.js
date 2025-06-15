import BooksList from './features/books/BooksList';
import React from 'react';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <BooksList />
    </div>
  );
}

export default App;
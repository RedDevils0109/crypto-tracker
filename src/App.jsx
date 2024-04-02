import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import './App.css';
import { Homepage } from './Pages/Homepage';
import { Coinpage } from './Pages/Coinpage';

function App() {
  return (
    <BrowserRouter>
      <div style={{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh"
      }}>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<Coinpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

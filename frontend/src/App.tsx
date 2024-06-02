import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Game } from './screens/Game';
import React from 'react';
import { Home } from './screens/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
   <div className='h-screen bg-slate-800'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  
  </div>
  );
}

export default App;

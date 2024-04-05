import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './style.css';
import Home from './components/Home';

import Pets from './components/Pets';
import Signup from './components/Signup';
import Login from './components/Login';
import Addpets from './components/Addpets';
import Update from './components/Update';
import SinglePet from './components/SinglePet';
import Adoptform from './components/Adoptform';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/addpets" element={<Addpets />} />
        {/* Update the route for the update page to include the pet ID */}
        <Route path="/update/:id" element={<Update />} />
        {/* Update the route for single pet page to include the pet ID */}
        <Route path="/pets/:id" element={<SinglePet />} />
        <Route path='/adoptform' element={<Adoptform />} />
        
      </Routes>
    </div>
  );
}

export default App;

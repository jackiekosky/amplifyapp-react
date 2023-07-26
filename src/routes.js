import React from 'react';
import { Home } from './views/Home';
import { Account } from './views/Account';
import { Products } from './views/Products';
import { AddProduct } from './views/Products/AddProduct';
import { NavBar } from './components/NavBar';
import { Route, Routes, Navigate } from 'react-router-dom';

export const Switch = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/products' element={<Products/>} />
        <Route path='/products/add' element={<AddProduct/>} />
        <Route path='/account' element={<Account/>} />
        <Route path='/Home' element={<Navigate to="/" replace={true} />} />
      </Routes>
    </div>
  );
};
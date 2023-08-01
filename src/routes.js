import React from 'react';
import { Home } from './views/Home';
import { Account } from './views/Account';
import { Products } from './views/Products';
import { Product } from './views/Product';
import { SignUp } from './views/SignUp';
import { NavBar } from './components/NavBar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Route, Routes, Navigate } from 'react-router-dom';


export const Switch = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/product' element={<Product/>} />
        <Route path='/Home' element={<Navigate to="/" replace={true} />} />
        <Route  path="/account" element={
                <ProtectedRoute>
                    <Account />
                </ProtectedRoute>
          } />
        <Route  path="/products" element={
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
          } />
      </Routes>
    </div>
  );
};
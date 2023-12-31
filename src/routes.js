import React, { useState } from "react";
import { Home } from './views/Home';
import { Account } from './views/Account';
import { Orders } from './views/Orders';
import { Products } from './views/Products';
import { Product } from './views/Product';
import { Order } from './views/Order';
import { SignUp } from './views/SignUp';
import { Cart } from './views/Cart';
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
          <Route  path="/product" element={
                  <ProtectedRoute>
                      <Product />
                  </ProtectedRoute>
            } />
          <Route  path="/orders" element={
                  <ProtectedRoute>
                      <Orders />
                  </ProtectedRoute>
            } />
            <Route  path="/order" element={
                    <ProtectedRoute>
                        <Order />
                    </ProtectedRoute>
              } />
              <Route  path="/cart" element={
                      <ProtectedRoute>
                          <Cart />
                      </ProtectedRoute>
                } />
              {/*<Route  path="/push" element={
                      <ProtectedRoute>
                          <Push />
                      </ProtectedRoute>
                } />*/}
      </Routes>
    </div>
  );
};
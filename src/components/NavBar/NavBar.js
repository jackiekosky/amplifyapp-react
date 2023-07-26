import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    View,
    withAuthenticator,
} from '@aws-amplify/ui-react';

import './NavBar.css';

const NavBar = ({ signOut }) =>  {
  return (
    <><div>
          <h5>NAVBAR</h5>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <ul>
                <li><Link to="/products/add_product">Add Product</Link></li>
              </ul>
              <li><Link to="/account">My Account</Link></li>
              <li><Link onClick={signOut}>Sign Out</Link></li>
            </ul>
      </div></>
  );
};

export default withAuthenticator(NavBar);
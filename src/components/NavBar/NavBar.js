import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Auth } from 'aws-amplify';
import './NavBar.css';
import { FiLogIn, FiLogOut, FiUser, FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { View } from '@aws-amplify/ui-react';

const NavBar = () =>  {
  const navigate = useNavigate();
  const location = useLocation();

  const [SignedIn, setSignedIn] = React.useState(false);

  function clickSignOut() {
    Auth.signOut();
    setSignedIn(false);
    navigate("/");
    window.location.reload(false);
  }

  useEffect(() => {
    fetchUser();
  }, [location]);

  async function fetchUser()  {
    Auth.currentAuthenticatedUser()
      .then(user => {
        setSignedIn(true);
      })
      .catch(err => {
        setSignedIn(false);
      });
  }

  return ( 
    
    <Navbar expand="lg" sticky="top">
    <Container>
      <Navbar.Brand href="/">InkTrax Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          { SignedIn ? <>
            <Nav.Link href="/products">
              <View className="icon"><FiShoppingBag /> </View>
                Products
            </Nav.Link>
            <Nav.Link href="/orders">
              <View className="icon"><FiShoppingCart /> </View>
                My Orders
            </Nav.Link>
            <Nav.Link href="/account">
            <View className="icon"><FiUser /></View>
              My Account
            </Nav.Link>
            <Nav.Link  onClick={clickSignOut}>
            <View className="icon"><FiLogOut /></View>
              Sign Out
            </Nav.Link></> : <Nav.Link href="/signup">
            <View className="icon"><FiLogIn /> </View>
              Sign In
            </Nav.Link> }

        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavBar;
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Flex,
    Text,
    View,
    Menu,
    MenuButton,
    MenuItem,
    Button,
    Authenticator
} from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

import './NavBar.css';


const NavBar = () =>  {
  const navigate = useNavigate();
  const location = useLocation();

  const [SignedIn, setSignedIn] = React.useState(false);
  
  function clickSignOut() {
    Auth.signOut();
    navigate("/");
    setSignedIn(false);
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
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="10px 0" >
      <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="stretch"
      alignContent="flex-start"
      wrap="nowrap"
      gap="1rem" >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link 
          style={{ textDecoration: 'none' }}
          to="/" >
            <Text fontSize="1.5em">InkTrax Portal</Text>
          </Link>
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Button  as={Link} to={'/products'} >Products</Button>
          <Button  as={Link} to={'/orders'}>My Orders</Button>
          { SignedIn ? <><Button  as={Link} to={'/account'}>My Account</Button><Button onClick={clickSignOut}>Sign Out</Button></> : 
          <Button  as={Link} to={'/signup'}>Sign In</Button> }
            
        </Flex>
      </Flex>
    </View>
  );
};

export default NavBar;
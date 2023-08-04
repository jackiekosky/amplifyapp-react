import React from 'react';
import { Link, useNavigate } from "react-router-dom";
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


  function clickSignOut() {
    Auth.signOut();
    navigate("/");
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
          <Button onClick={() => navigate("/products")} >Products</Button>
          <Button onClick={() => navigate("/orders")} >My Orders</Button>
          <Authenticator.Provider>
            <Button onClick={() => navigate("/account")} >My Account</Button>
            <Button  onClick={clickSignOut}>Sign Out</Button>
            </Authenticator.Provider>
        </Flex>
      </Flex>
    </View>
  );
};

export default NavBar;
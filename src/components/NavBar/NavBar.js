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
    withAuthenticator,
} from '@aws-amplify/ui-react';

import './NavBar.css';


const NavBar = ({ signOut }) =>  {
 
const navigate = useNavigate();
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
          <Menu
            trigger={
              <MenuButton>
                Products
              </MenuButton>
            } >
            <MenuItem onClick={() => navigate("/products")} >All Products</MenuItem>
            <MenuItem onClick={() => navigate("/products/add")} >Add Product</MenuItem>
          </Menu>
          <Button onClick={() => navigate("/account")} >My Account</Button>
          <Button onClick={signOut} >Sign Out</Button>
        </Flex>
      </Flex>
    </View>
  );
};

export default withAuthenticator(NavBar);
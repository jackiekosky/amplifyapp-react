

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { View, Heading } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


const Home = ({ signOut }) => {
  const location = useLocation();
  const [SignedIn, setSignedIn] = React.useState(false);

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
    <Container fluid className="hero">
        <Container>
          <Row className="justify-content-md-center">
            <Heading level={1} textAlign="center"> Welcome to Ink Trax Portal </Heading>
            { SignedIn ? <><> </><Button href="/products">Products</Button><Button href="/orders">MY ORDERS</Button><Button href="/account">MY ACCOUNT</Button></>
            : <Button href="/signup">Sign In</Button> }
          </Row>
        </Container>
    </Container>
  );
};

export default Home;
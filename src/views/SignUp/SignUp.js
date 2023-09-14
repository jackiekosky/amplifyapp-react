
import {
  Text,
  Flex
  } from '@aws-amplify/ui-react';
  import { Authenticator  } from "@aws-amplify/ui-react";
  import { useNavigate } from "react-router-dom";
  import Container from 'react-bootstrap/Container';
  import Row from 'react-bootstrap/Row';
  import Button from 'react-bootstrap/Button';

const formFields = {
    signUp: {
      given_name: {
        label: 'First Name'
      },
      family_name: {
        label: 'Last Name'
      },
      'custom:shopworks_number': {
          label: 'ShopWorks Customer ID',
          placeholder: 'Enter your ShopWorks Customer ID',
          isRequired: true,
      },
      'custom:sw_item_code': {
          label: 'ShopWorks Customer Code',
          placeholder: 'Enter your ShopWorks Customer Code',
          isRequired: true,
      }
    }
  };
  
const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row>
        <Authenticator formFields={formFields} hideSignUp={true}>
          <Text textAlign="center">You are now signed in! Please proceed to one of the following pages.</Text>
          <Flex justifyContent="center" marginTop="50px">
            <Button onClick={() => navigate("/products")}  variant="secondary">My Products</Button>
            <Button onClick={() => navigate("/orders")}  variant="secondary">My Orders</Button>
            <Button onClick={() => navigate("/account")}  variant="secondary">My Account</Button>
          </Flex>
        </Authenticator>
        </Row>
      </Container>
  );
};

export default SignUp;
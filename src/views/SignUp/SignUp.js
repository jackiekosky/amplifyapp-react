
import {
  Text,
  Flex,
  Button,
  View,
  } from '@aws-amplify/ui-react';
  import { Authenticator  } from "@aws-amplify/ui-react";
  import { useNavigate } from "react-router-dom";

const formFields = {
    signUp: {
        'custom:shopworks_number': {
            label: 'ShopWorks Customer ID',
            placeholder: 'Enter your ShopWorks Customer ID',
            isRequired: true,
        }
    }
  };
  
const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Authenticator formFields={formFields}>
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0"
    textAlign="center">
      <Text>You are now signed in, please proceed to one of the following pages.</Text>
      <Flex justifyContent="center" marginTop="50px">
        <Button onClick={() => navigate("/products")} >Products</Button>
        <Button onClick={() => navigate("/orders")} >My Orders</Button>
        <Button onClick={() => navigate("/account")} >My Account</Button>
      </Flex>
      </View>
    </Authenticator>
  );
};

export default SignUp;
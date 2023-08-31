import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Heading,
  Authenticator,
  withAuthenticator
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const Account = ({ user }) => {
  return (
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    textAlign="center" 
    padding="50px 0" >
      <Heading 
      level={1}
      marginBottom="20px">Account Information</Heading>
      <Text>Username: {user.username}</Text>
      <Text>Email: {user.attributes.email}</Text>
      <Text>Phone: {user.attributes.phone_number}</Text>
      <Text>Name: {user.attributes.given_name} {user.attributes.family_name}</Text>
      <Text>ShopWorks Customer ID: {user.attributes['custom:shopworks_number']}</Text>
      <Text>ShopWorks Customer Code: {user.attributes['custom:sw_item_code']}</Text>
      <Text>User Level: {user.signInUserSession.accessToken.payload["cognito:groups"]}</Text>
    </View>
  );
};

export default withAuthenticator(Account);
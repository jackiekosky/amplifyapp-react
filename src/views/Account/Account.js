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
      <Text>Company: {user.attributes['custom:company_name']}</Text>
      <Text>User Level: {user.signInUserSession.accessToken.payload["cognito:groups"]}</Text>
    </View>
  );
};

export default withAuthenticator(Account);
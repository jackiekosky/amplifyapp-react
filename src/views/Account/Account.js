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
  <Authenticator>
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
      <Text>Email: {user.email}</Text>
      <Text>User Level: {user.signInUserSession.accessToken.payload["cognito:groups"]}</Text>
    </View>
  </Authenticator>
  );
};

export default withAuthenticator(Account);
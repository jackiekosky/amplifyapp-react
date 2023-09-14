import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Heading,
  Authenticator,
  withAuthenticator
} from '@aws-amplify/ui-react';


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
      <Text><b>Username</b>: {user.username}</Text>
      <Text><b>Email</b>: {user.attributes.email}</Text>
      <Text><b>Phone</b>: {user.attributes.phone_number}</Text>
      <Text><b>Name</b>: {user.attributes.given_name} {user.attributes.family_name}</Text>
      <Text><b>ShopWorks Customer ID</b>: {user.attributes['custom:shopworks_number']}</Text>
      <Text><b>ShopWorks Customer Code</b>: {user.attributes['custom:sw_item_code']}</Text>
      <Text fontStyle="italic" marginTop="40px" fontSize="0.8em">If you need any of this information updated place contact your InkTrax sales representative.</Text>
    </View>
  );
};

export default withAuthenticator(Account);
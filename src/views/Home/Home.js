import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import {
    Button,
    View,
    Heading,
    withAuthenticator,
} from '@aws-amplify/ui-react';

const Home = ({ signOut }) => {
  return (
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0">
      <Heading
        level={1}
        textAlign="center" 
      >
        Welcome to InkTrax Portal
      </Heading>
    </View>
  );
};

export default Home;
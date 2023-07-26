import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator,withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Account = ({ signOut }) => {
  return (
    <Authenticator>
    {({ signOut, user }) => (
      <main>
       <h1>Account Information</h1>
        <h2>Hello {user.username}</h2>
        <h3>{user.signInUserSession.accessToken.payload["cognito:groups"]}</h3>
        <button onClick={signOut}>Sign out</button>
      </main>
    )}
  </Authenticator>
  );
};

export default withAuthenticator(Account);
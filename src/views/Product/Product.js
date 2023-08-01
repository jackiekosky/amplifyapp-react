

import React, { useState, useEffect } from "react";
import {
View,
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";

const Product = ({ user }) => {
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");

  const API_BASE_URL = "https://twermdd9bc.execute-api.us-east-2.amazonaws.com/staging/api";
  
  const TOKEN_URL = "https://manageordersapi.com/v1/manageorders/signin";
  
  var TOKEN_DATA = {
      username: "josh@inktrax.com",
      password: "1NKT3E$9m#",
  }

  TOKEN_DATA = JSON.stringify(TOKEN_DATA);

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {

    /* Get Access Token */
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        "url": TOKEN_URL,
        "data": TOKEN_DATA,
        "method": "POST"
      }), 
    });

    const TOKEN_RES_DATA = await res.json();
    const TOKEN = TOKEN_RES_DATA.id_token;

    console.log(TOKEN);

    var PRODUCTS_URL = `https://manageordersapi.com/v1/manageorders/orders/${id}`;

    const res_prods = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        "url": PRODUCTS_URL,
        "token": TOKEN,
        "method": "GET"
      }), 
    });
    

  return (
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0">
    </View>
  );
  };
}

  export default Product;
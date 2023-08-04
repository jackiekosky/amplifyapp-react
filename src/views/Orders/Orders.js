import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
Text,
Card,
View,
Grid
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";

const Orders = () => {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);

  const API_BASE_URL = "https://twermdd9bc.execute-api.us-east-2.amazonaws.com/staging/api";
  
  const TOKEN_URL = "https://manageordersapi.com/v1/manageorders/signin";
  
  var TOKEN_DATA = {
      username: "josh@inktrax.com",
      password: "1NKT3E$9m#",
  }

  TOKEN_DATA = JSON.stringify(TOKEN_DATA);


  useEffect(() => {
    fetchOrders();
  }, []);

  var SW_CUSTOMER_ID = 0;

  async function fetchOrders() {
    /* Get user customer ID */
    try {
      const currentUserInfo = await Auth.currentUserInfo()
      SW_CUSTOMER_ID = currentUserInfo.attributes['custom:shopworks_number'];
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
    
    var PRODUCTS_URL = `https://manageordersapi.com/v1/manageorders/orders?id_Customer=${SW_CUSTOMER_ID}`;
  

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
  
    const res_prods = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        "url": PRODUCTS_URL,
        "token": TOKEN,
        "method": "GET"
      }), 
    });
    
    const PRODUCTS = await res_prods.json();

    // Process the data as needed and convert it to the required format
    const ordersData = PRODUCTS.result.map((item) => {
      return {
        id: item.id_Order,
        name: item.DesignName
      };
    });
    setOrders(ordersData);
  }

  return (
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0">
      <Grid templateColumns="1fr 1fr 1fr">
      {Orders.map((Order) => (
        <Card key={Order.id}
        preprint={Order.preprint}
        variation="elevated"
        textAlign="center"
        margin="20px"
        onClick={() => navigate(`/order?id=${Order.id}`)}
        borderRadius="10px">
          <Text as="strong" fontWeight={700}>
            {Order.id} {Order.name}
          </Text>
        </Card>
        ))}
        </Grid>
    </View>
  );
  };

  export default Orders;
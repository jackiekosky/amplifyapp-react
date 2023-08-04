import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
Text,
Heading,
Button,
Card,
Divider,
View,
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";

const Order = () => {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [Items, setItems] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const TOKEN_URL =  process.env.REACT_APP_GET_TOKEN_URL;
  var TOKEN_DATA = {
    username: process.env.REACT_APP_TOKEN_DATA_USER,
    password: process.env.REACT_APP_TOKEN_DATA_PASS
  }
  TOKEN_DATA = JSON.stringify(TOKEN_DATA);


  useEffect(() => {
    fetchOrder();
  }, []);

  var SW_CUSTOMER_ID = 0;

  async function fetchOrder() {
    
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
  
    var PRODUCTS_URL = process.env.REACT_APP_ORDERS_URL + `/${id}`;
  

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
        name: item.DesignName,
        CustomerName: item.CustomerName,
        ContactFirstName: item.ContactFirstName,
        ContactLastName: item.ContactLastName,
        CustomerServiceRep: item.CustomerServiceRep,
        id_Design: item.id_Design
      };
    });
    setOrders(ordersData);

    var ORDERS_LIST = [];
    PRODUCTS.result.forEach(async (result) => {
      var ORDER_URL = process.env.REACT_APP_LINEITEMS_URL + `/${result.id_Order}`;
  
      const orders_res = await fetch(API_BASE_URL, {
        method: "POST",
        body: JSON.stringify({
          "url": ORDER_URL,
          "token": TOKEN,
          "method": "GET"
        }), 
      });
      var order_items = await orders_res.json();
      if (order_items.status === "success") {
        order_items.result.forEach((item) => {
          ORDERS_LIST.push(item);
        });
      }
      
    const itemsData = order_items.result.map((item) => {
      return {
        PartDescription: item.PartDescription,
        PartColor: item.PartColor,
        PartNumber: item.PartNumber,
        LineQuantity: item.LineQuantity
      };
    });
    setItems(itemsData);
      console.log(itemsData);
    });
    
  }

  return (
    <View
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0">
      {Orders.map((Order) => (
          <><Heading level="1" fontSize="30px" marginBottom="10px">
          {Order.id} {Order.name}
        </Heading>
        <Text><b>Customer</b>: {Order.CustomerName}</Text>
        <Text><b>Contact</b>: {Order.ContactFirstName} {Order.ContactLastName}</Text>
        <Text><b>Customer Service Rep</b>: {Order.CustomerServiceRep}</Text>
        <Text><b>Design ID</b>: {Order.id_Design}</Text>
        </>
        ))}
        <Divider orientation="horizontal" margin="20px 0" />
        <Heading level="2" fontSize="20px" marginBottom="10px">
          Line Items in Order
        </Heading>
        {Items.map((Item) => (
          <Card key={Item.PartNumber}
          variation="elevated"
          margin="20px 0"
          width="auto"
          borderRadius="10px">
            <Text>{Item.PartNumber} {Item.PartDescription} {Item.PartColor}</Text>
            <Text>Line Qty: {Item.LineQuantity}</Text>
        </Card>
        ))}
      <Button onClick={() => navigate('/orders')} marginTop="20px">
        Back to my orders
      </Button>
    </View>
  );
  };

  export default Order;
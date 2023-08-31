import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
Collection,
Loader
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Orders = () => {
  const navigate = useNavigate();
  const [Orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = React.useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const TOKEN_URL =  process.env.REACT_APP_GET_TOKEN_URL;
  var TOKEN_DATA = {
    username: process.env.REACT_APP_TOKEN_DATA_USER,
    password: process.env.REACT_APP_TOKEN_DATA_PASS
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
    
    var PRODUCTS_URL = process.env.REACT_APP_ORDERS_URL + `?id_Customer=${SW_CUSTOMER_ID}`;
  

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
    setShowOrders(true);
  }

    return (
      <Container className="py-4">
        
          { showOrders ? <Row><Collection type="grid" templateColumns={{base:"1fr", large:"1fr 1fr 1fr 1fr", medium: "1fr 1fr"}} gap="20px" items={Orders}>
            {(Order, index) => (
              <Card key={Order.id} preprint={Order.preprint}>
                  <Card.Body>
                    <Card.Title style={{textAlign:'center'}}>{Order.id} {Order.name}</Card.Title>
                    <Button variant="secondary" style={{ width: '100%', display:'block' }} onClick={() => navigate(`/order?id=${Order.id}`)}>View</Button>
                  </Card.Body>
              </Card>
            )}
          </Collection></Row> : <Loader margin="auto" display="block"/> }
        
      </Container>
    );
  };

  export default Orders;
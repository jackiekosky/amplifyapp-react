import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
View,
Heading,
Text,
TextField,
Table,
TableCell,
TableBody,
Flex,
TableHead,
TableRow,
Loader
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import { createPushedOrders } from '../../graphql/mutations';
import { FiX } from "react-icons/fi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Cart = () => {
const navigate = useNavigate();
const [Products, setProducts] = useState([]);
const [Total, setTotal] = useState(0);
const [showProducts, setShowProducts] = React.useState(false);

const [SW_NUM, setSW_NUM] = useState([]);
const [USER_EMAIL, setUSER_EMAIL] = useState([]);
const [USER_FIRSTNAME, setUSER_FIRSTNAME] = useState([]);
const [USER_LASTNAME, setUSER_LASTNAME] = useState([]);
const [USER_PHONE, setUSER_PHONE] = useState([]);


const [RequestedShip, setRequestedShip] = useState([]);
const [ShippingAddress, setShippingAddress] = useState([]);
const [ShippingCity, setShippingCity] = useState([]);
const [ShippingState, setShippingState] = useState([]);
const [ShippingZip, setShippingZip] = useState([]);
const [ShippingMethod, setShippingMethod] = useState([]);

var queryParameters = new URLSearchParams(window.location.search);
var part_num = queryParameters.get("part_num");
var part_color = queryParameters.get("color");

const BASE_API_URL = process.env.REACT_APP_API_BASE_URL;

var TOKEN_DATA = {
  username: process.env.REACT_APP_TOKEN_DATA_USER,
  password: process.env.REACT_APP_TOKEN_DATA_PASS
}
TOKEN_DATA = JSON.stringify(TOKEN_DATA);

async function handleSubmit(event) {
  event.preventDefault();
  var newID = await createOrderInDB();

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = mm + '/' + dd + '/' + yyyy;

  const shipDate = new Date(RequestedShip);
  const shipyyyy = shipDate.getFullYear();
  let shipmm = shipDate.getMonth() + 1; // Months start at 0!
  let shipdd = shipDate.getDate();
  if (shipdd < 10) shipdd = '0' + shipdd;
  if (shipmm < 10) shipmm = '0' + shipmm;
  const FormattedShipDate = shipmm + '/' + shipdd + '/' + shipyyyy;

  var cart = localStorage.getItem("cart");
  var lineItems = JSON.parse(cart);

  var orderQtys = {
    "ExtSource": "INKTrax Portal",
    'ExtOrderID': newID,
    'ExtCustomerID': SW_NUM,
    'LinesOE' : lineItems,
    "id_Customer": SW_NUM,
    "date_OrderPlaced": formattedToday,
    "date_OrderRequestedToShip": FormattedShipDate,
    "ContactEmail": USER_EMAIL,
    "ContactNameFirst": USER_FIRSTNAME,
    "ContactNameLast": USER_LASTNAME,
    "ContactPhone": USER_PHONE,
    "ShippingAddresses": [
      {
        "ShipMethod": ShippingMethod,
        "ShipAddress01": ShippingAddress,
        "ShipCity": ShippingCity,
        "ShipState": ShippingState,
        "ShipZip": ShippingZip,
        "ShipCountry": "US",
      }
    ],
  }

  orderQtys = JSON.stringify(orderQtys);

  const res_access_token = await fetch(BASE_API_URL, {
    method: "POST",
    body: JSON.stringify({
      "url": process.env.REACT_APP_GET_PUSH_TOKEN_URL,
      "data": TOKEN_DATA,
      "method": "POST"
    }), 
  });

  const TOKEN_PUSH_RES_DATA = await res_access_token.json();

  const PUSH_TOKEN = TOKEN_PUSH_RES_DATA.id_token;

  const res_push = await fetch(BASE_API_URL, {
    method: "POST",
    body: JSON.stringify({
      "url": process.env.REACT_APP_PUSH_URL,
      "token": PUSH_TOKEN,
      "method": "POST",
      "data": orderQtys
    }), 
  });

  const PUSH_RESULT = await res_push.json();
  alert(PUSH_RESULT.result);
  localStorage.setItem('cart', "");
  setShowProducts(false);
  window.location.reload(false);
}

async function createOrderInDB() {
  const newPushedOrders = await API.graphql({
      query: createPushedOrders,
      variables: {
          input: {
          "customerID": SW_NUM,
          "product": part_num
        }
      }
  });
  return newPushedOrders.data.createPushedOrders.id;
}

useEffect(() => {
  fetchCart();
}, []);

function updateCart(index) {
  var cart = localStorage.getItem("cart");
  var cartObj = JSON.parse(cart);
  var length = cartObj.length;
  cartObj.splice(index, 1); // 2nd parameter means remove one item only
  var cartString = JSON.stringify(cartObj);
  localStorage.setItem('cart', cartString);
  setProducts(cartObj);
  if (length <= 1) {
    setShowProducts(false);
  }
}

async function fetchCart() {
  try {
    const currentUserInfo = await Auth.currentUserInfo()
    setSW_NUM(currentUserInfo.attributes['custom:shopworks_number']);
    setUSER_EMAIL(currentUserInfo.attributes['email']);
    setUSER_FIRSTNAME(currentUserInfo.attributes['given_name']);
    setUSER_LASTNAME(currentUserInfo.attributes['family_name']);
    setUSER_PHONE(currentUserInfo.attributes['phone_number']);
    
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
  //localStorage.removeItem("cart");
  var cart = localStorage.getItem("cart");
  if (cart) {
    var cartObj = JSON.parse(cart);
    if (cartObj.length > 0) {
      setShowProducts(true);
      setProducts(cartObj);
      var total = 0;
      cartObj.forEach(item => {
          var price = parseFloat(item.Price);
          total += price;
      });
      setTotal(total);
    }
  }
}

return (
  
  <Container className="py-4" as="form" onSubmit={handleSubmit}>
     { showProducts ? <Row>
      <Table type="list"> 
        <TableHead>
          <TableRow>
            <TableCell as="th">Item</TableCell>
            <TableCell as="th" textAlign="center">Size</TableCell>
            <TableCell as="th" textAlign="center">Quantity</TableCell>
            <TableCell as="th" textAlign="center"></TableCell>
          </TableRow>
        </TableHead>
            
        <TableBody>

        {Products.map((Product, index) => (
          <TableRow key={index}>
            <TableCell>{Product.Description} - {Product.PartNumber} {Product.Color}</TableCell>
            <TableCell textAlign="center">{Product.Size}</TableCell>
            <TableCell textAlign="center">{Product.Qty}</TableCell>
            <TableCell textAlign="center"><FiX onClick={() => updateCart(index)}/></TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <Text marginTop="20px" marginBottom="20px">ShopWorks Customer Number: {SW_NUM}</Text>
      <View maxWidth="300px">
      <TextField label="Requested to Ship Date" type= "date" marginBottom="5px" onChange={(e) => setRequestedShip(e.target.value) } />
      {/*<TextField label="Shipping Address" marginBottom="5px" onChange={(e) => setShippingAddress(e.target.value) } />
      <TextField label="Shipping City" marginBottom="5px" onChange={(e) => setShippingCity(e.target.value) } />
      <TextField label="Shipping State" marginBottom="5px" onChange={(e) => setShippingState(e.target.value) } />
      <TextField label="Shipping Zipcode" marginBottom="5px" onChange={(e) => setShippingZip(e.target.value) } />
      <SelectField label="Shipping Method" onChange={(e) => setShippingMethod(e.target.value) }>
        <option value="UPS">UPS</option>
        <option value="Pickup">Pickup</option>
        <option value="Delivery">Delivery</option>
      </SelectField>*/}

      <Button variant="secondary" type="submit" style={{ margin: '20px 0 0'}} >Order all</Button>
      </View>
    </Row> : <>
          <Text textAlign="center">Currently no items in order.</Text>
          <Flex justifyContent="center" marginTop="50px">
            <Button onClick={() => navigate("/products")}  variant="secondary">Products</Button>
            <Button onClick={() => navigate("/orders")}  variant="secondary">My Orders</Button>
            <Button onClick={() => navigate("/account")}  variant="secondary">My Account</Button>
          </Flex>
          </>}
  </Container>
);
}

export default Cart;
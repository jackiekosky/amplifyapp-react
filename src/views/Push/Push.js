import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
View,
Card,
Grid,
Heading,
Text,
StepperField,
TextField,
SelectField,
Flex,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import { createPushedOrders } from '../../graphql/mutations';

const Push = () => {
const [Products, setProducts] = useState([]);

const [SW_NUM, setSW_NUM] = useState([]);
const [USER_EMAIL, setUSER_EMAIL] = useState([]);
const [USER_FIRSTNAME, setUSER_FIRSTNAME] = useState([]);
const [USER_LASTNAME, setUSER_LASTNAME] = useState([]);
const [USER_PHONE, setUSER_PHONE] = useState([]);

const [MainProduct, setMainProduct] = useState([]);

const [qty1, setQty1] = useState([]);
const [qty2, setQty2] = useState([]);
const [qty3, setQty3] = useState([]);
const [qty4, setQty4] = useState([]);
const [qty5, setQty5] = useState([]);
const [qty6, setQty6] = useState([]);


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
  var currentdate = new Date(); 

  var partNum = MainProduct.PartNumber;
  var partColor = MainProduct.Color;
  var partDesc = MainProduct.PartDescription;
  var partUnitCost = MainProduct.UnitCost;
  var qty1Item = [];
  var qty2Item = [];
  var qty3Item = [];
  var qty4Item = [];
  var qty5Item = [];
  var qty6Item = [];

  if (qty1 > 0) {
    qty1Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "S",
      "Qty": qty1,
      "Price": partUnitCost,
    }
  }
  if (qty2 > 0) {
    qty2Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "M",
      "Qty": qty2,
      "Price": partUnitCost,
    }
  }
  if (qty3 > 0) {
    qty3Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "LG",
      "Qty": qty3,
      "Price": partUnitCost,
    }
  }
  if (qty4 > 0) {
    qty4Item =  {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "XL",
      "Qty": qty4,
      "Price": partUnitCost,
    }
  }
  if (qty5 > 0) {
    qty5Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "XXL",
      "Qty": qty5,
      "Price": partUnitCost,
    }
  }
  if (qty6 > 0) {
    qty6Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "3X-5X",
      "Qty": qty6,
      "Price": partUnitCost,
    }
  }
  var lineItems = [qty1Item, qty2Item, qty3Item, qty4Item, qty5Item, qty6Item]
  var orderQtys = {
    "ExtSource": "INKTrax Portal",
    'ExtOrderID': newID,
    'ExtCustomerID': SW_NUM,
    'LinesOE' : lineItems,
    "id_Customer": SW_NUM,
    "ContactEmail": USER_EMAIL,
    "ContactNameFirst": USER_FIRSTNAME,
    "ContactNameLast": USER_LASTNAME,
    "ContactPhone": USER_PHONE,
    "date_OrderPlaced": currentdate,
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
  fetchProduct();
}, []);



async function fetchProduct() {


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

  setQty1(0);
  setQty2(0);
  setQty3(0);
  setQty4(0);
  setQty5(0);
  setQty6(0);

  queryParameters = new URLSearchParams(window.location.search);
  part_num = queryParameters.get("part_num");
  part_color = queryParameters.get("color");

  /* Get Access Token */
  const res = await fetch(BASE_API_URL, {
    method: "POST",
    body: JSON.stringify({
      "url": process.env.REACT_APP_GET_TOKEN_URL,
      "data": TOKEN_DATA,
      "method": "POST"
    }), 
  });

  const TOKEN_RES_DATA = await res.json();
  const TOKEN_DATA_NEW = TOKEN_RES_DATA.id_token;

  const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL + `?PartNumber=${part_num}&Color=${part_color}`;

  const res_prods = await fetch(BASE_API_URL, {
    method: "POST",
    body: JSON.stringify({
      "url": PRODUCTS_URL,
      "token": TOKEN_DATA_NEW,
      "method": "GET"
    }), 
  });

  const PRODUCT = await res_prods.json();
  setMainProduct(PRODUCT.result[0]);

  
  // Process the data as needed and convert it to the required format
  const productsData = PRODUCT.result.map((item) => {
    return {
      id: item.ID_InvLevel,
      name: item.PartDescription,
      cost: item.TotalCost,
      color: item.Color,
      part_num: item.PartNumber,
      id_Vendor: item.id_Vendor,
      UnitCost: item.UnitCost,
      preprint: item.PreprintGroup,
      type: item.ProductType,
      size_1_qty: item.Size01,
      size_2_qty: item.Size02,
      size_3_qty: item.Size03,
      size_4_qty: item.Size04,
      size_5_qty: item.Size05,
      size_6_qty: item.Size06,
      find_Code: item.FindCode
    };
  });
  setProducts(productsData);
}

return (
  <View
  maxWidth="1200px"
  margin="auto"
  padding="50px 0" as="form" onSubmit={handleSubmit}>
  
  {Products.map((Product) => (
    <View key={Product.id}>
      <Heading level="1" fontWeight="600">{Product.name} - {Product.color}</Heading>
      <Heading level="2" fontWeight="600">{Product.UnitCost}</Heading>
      <Table caption="" highlightOnHover={false} margin="20px 0">
        <TableHead>
          <TableRow>
            <TableCell as="th">Size</TableCell>
            <TableCell as="th">Current Qty</TableCell>
            <TableCell as="th">Qty to order</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>S</TableCell>
            <TableCell>{Product.size_1_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_1_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block"  value={qty1} onStepChange={(e) => setQty1(e) } /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>M</TableCell>
            <TableCell>{Product.size_2_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_2_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty2} onStepChange={(e) => setQty2(e) }/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>LG</TableCell>
            <TableCell>{Product.size_3_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_3_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty3} onStepChange={(e) => setQty3(e) }/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XL</TableCell>
            <TableCell>{Product.size_4_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_4_qty}step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty4} onStepChange={(e) => setQty4(e) }/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>XXL</TableCell>
            <TableCell>{Product.size_5_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_5_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty5} onStepChange={(e) => setQty5(e) }/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3X-5X</TableCell>
            <TableCell>{Product.size_6_qty}</TableCell>
            <TableCell><StepperField min={0} max={Product.size_6_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty6} onStepChange={(e) => setQty6(e)} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </View>

    ))}
    <Text marginBottom="20px">ShopWorks Customer Number: {SW_NUM}</Text>
    <View maxWidth="300px">
    <TextField label="Shipping Address" marginBottom="5px" onChange={(e) => setShippingAddress(e.target.value) } />
    <TextField label="Shipping City" marginBottom="5px" onChange={(e) => setShippingCity(e.target.value) } />
    <TextField label="Shipping State" marginBottom="5px" onChange={(e) => setShippingState(e.target.value) } />
    <TextField label="Shipping Zipcode" marginBottom="5px" onChange={(e) => setShippingZip(e.target.value) } />
    <SelectField label="Shipping Method" onChange={(e) => setShippingMethod(e.target.value) }>
      <option value="UPS">UPS</option>
      <option value="Pickup">Pickup</option>
      <option value="Delivery">Delivery</option>
    </SelectField>
    </View>
    <Button type="submit" marginTop="20px">
      Order
    </Button>
  </View>
);
}

export default Push;
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
Loader,
TableBody
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API, Auth } from "aws-amplify";
import { createPushedOrders } from '../../graphql/mutations';

const Product = () => {
const [Products, setProducts] = useState([]);

const [showProducts, setShowProducts] = React.useState(false);

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

  var partNum = MainProduct.PartNumber;
  var partColor = MainProduct.Color;
  var partDesc = MainProduct.PartDescription;
  var partUnitCost = MainProduct.UnitCost;

  var lineItems = [];

  if (qty1 > 0) {
    var qty1Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "S",
      "Qty": qty1.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty1Item);
  }
  if (qty2 > 0) {
    var qty2Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "M",
      "Qty": qty2.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty2Item);
  }
  if (qty3 > 0) {
    var qty3Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "LG",
      "Qty": qty3.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty3Item);
  }
  if (qty4 > 0) {
    var qty4Item =  {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "XL",
      "Qty": qty4.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty4Item);
  }
  if (qty5 > 0) {
    var qty5Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "XXL",
      "Qty": qty5.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty5Item);
  }
  if (qty6 > 0) {
    var qty6Item = {
      "PartNumber": partNum,
      "Color": partColor,
      "Description": partDesc,
      "Size": "3X-5X",
      "Qty": qty6.toString(),
      "Price": partUnitCost.toString(),
    }
    lineItems.push(qty6Item);
  }

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
  setShowProducts(true);
}

return (
  <View
  maxWidth="1200px"
  margin="auto"
  padding="50px 0" as="form" onSubmit={handleSubmit}>
  { showProducts ? <View>
    {Products.map((Product) => (
      <View key={Product.id}>
        <Heading level="1" fontWeight="600">{Product.part_num}</Heading>
        <Heading level="2" fontWeight="600">{Product.name} - {Product.color}</Heading>
        <Heading level="3" fontWeight="600">${Product.UnitCost}</Heading>
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
    </View> : <Loader margin="auto" display="block"/> }

    <Text marginBottom="20px">ShopWorks Customer Number: {SW_NUM}</Text>
    <View maxWidth="300px">
    <TextField label="Requested to Ship Date" type= "date" marginBottom="5px" onChange={(e) => setRequestedShip(e.target.value) } />
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

export default Product;
/*import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
View,
Card,
Collection,
Heading,
Text,
TextField,
Flex,
Button,
Loader
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API, Auth  } from "aws-amplify";
import { createProductIDs, updateProductIDs } from '../../graphql/mutations';
import { listProductIDs } from "../../graphql/queries";

const Product = () => {
  const [Products, setProducts] = useState([]);
  const [ProductLink, setProductLink] = useState([]);
  const [MainProduct, setMainProduct] = useState([]);
  const [showEdit, setShowEdit] = React.useState(false);

  const [showProducts, setShowProducts] = React.useState(false);
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const TOKEN_URL =  process.env.REACT_APP_GET_TOKEN_URL;
  var TOKEN_DATA = {
    username: process.env.REACT_APP_TOKEN_DATA_USER,
    password: process.env.REACT_APP_TOKEN_DATA_PASS
  }
  TOKEN_DATA = JSON.stringify(TOKEN_DATA);
  
  var queryParameters = new URLSearchParams(window.location.search);
  var part_num = queryParameters.get("part_num");
  
  async function getProductIDCurrent(part_num_var) {
      const listProductID = await API.graphql({
          query: listProductIDs,
          variables: {
            filter: {part_num: {eq: part_num_var}}
          }
      });
      if (listProductID.data.listProductIDs.items.length === 0) {
        return 0;
      } else {
        return listProductID.data.listProductIDs.items[0].customerIDs.toString()
      }
    } 

  async function getProductID(part_num_var) {
    const listProductID = await API.graphql({
        query: listProductIDs,
        variables: {
          filter: {part_num: {eq: part_num_var}}
        }
    });
    if (listProductID.data.listProductIDs.items.length === 0) {
      return false;
    } else {
      return listProductID.data.listProductIDs.items[0].id;
    }
  }


  async function createProductID(part_num_var, link) {
    const addingIDs = link.split(',');
    const ifID = await getProductID(part_num_var);
    if ( (ifID) === false ) {
        const newProductIDs = await API.graphql({
          query: createProductIDs,
          variables: {
              input: {
                "part_num": part_num_var,
                "customerIDs": addingIDs
              }
            }
        });
        return "Added the following ShipHawk IDs to the product " + newProductIDs.data.createProductIDs.customerIDs.toString();
    } else {
      return updatedProductIDs(ifID, part_num_var, link);
    }
  }
  
  async function updatedProductIDs(new_id, part_num_var, link) {
    const addingIDs = link.split(',');
    try {
      const updatedProductIDs = await API.graphql({
        query: updateProductIDs,
        variables: {
          input: {
            id: new_id,
            "part_num": part_num_var,
            "customerIDs": addingIDs
          }
        }
      });
      return "ShipHawk Customer IDs have been updated to " + link;
    } catch {
      return "Error on update";
    }
  }

 
async function handleSubmit(event) {
    event.preventDefault();
    if (ProductLink === "") {
      alert('Cannot be empty')
    } else {
      const prodIDcreate = await createProductID(part_num, ProductLink);
      alert(prodIDcreate);
    }
  }
  
  const handleChange = (event) => {
    setProductLink(event.target.value);
  };

  useEffect(() => {
    fetchProduct();
  }, []);


  
  async function fetchProduct() {
    
    queryParameters = new URLSearchParams(window.location.search);
    part_num = queryParameters.get("part_num");
    var currentProds = await getProductIDCurrent(part_num);
    setProductLink(currentProds);


    const currentUserInfo = await Auth.currentAuthenticatedUser();
    const groups = currentUserInfo.signInUserSession.idToken.payload['cognito:groups'];
    
    if ( groups && groups.includes("Admin") ) {
      setShowEdit(true);
    }

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
    
    const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL + `?PartNumber=${part_num}`;

    const res_prods = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        "url": PRODUCTS_URL,
        "token": TOKEN,
        "method": "GET"
      }), 
    });

    const PRODUCT = await res_prods.json();
    setMainProduct(PRODUCT.result[0]);
    setShowProducts(true);
    
    const productsData = PRODUCT.result.map((item) => {
      return {
        id: item.ID_InvLevel,
        name: item.PartDescription,
        cost: item.TotalCost,
        color: item.Color,
        part_num: item.PartNumber,
        id_Vendor: item.id_Vendor,
        TotalCost: item.TotalCost,
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
    <View as="div" maxWidth="1200px" margin="auto" padding="50px 0">
      { showProducts ? <View>
        <View marginBottom="20px">
          <Heading level="1" marginBottom="15px">{MainProduct.PartDescription}</Heading>
          <Heading level="2" marginBottom="15px">{MainProduct.TotalCost}</Heading>
        </View>
      <Collection
      type="grid"
      templateColumns="1fr 1fr 1fr 1fr"
      gap="20px"
      items={Products}
      marginBottom="20px"
    >  
    {(Product, index) => (
          <Card key={Product.id}
          variation="elevated">
          <Heading level="2" fontSize="20px" fontWeight="600">{Product.color}</Heading>
          <Heading level="3" fontSize="16px" margin="10px 0 5px" fontWeight="600">Quantity</Heading>
          <Text> S: {Product.size_1_qty}</Text>
          <Text> M: {Product.size_2_qty}</Text>
          <Text> LG: {Product.size_3_qty}</Text>
          <Text> XL: {Product.size_4_qty}</Text>
          <Text> XXL: {Product.size_5_qty}</Text>
          <Text> 3X-5X: {Product.size_6_qty}</Text>
          <Button as={Link} to={`/push?part_num=${Product.part_num}&color=${Product.color}`} marginTop="20px" >
            Order This Color
          </Button>
          </Card>
    )}
    </Collection></View> : <Loader margin="auto" display="block"/> }
        { showEdit ?  <Flex as="form" onSubmit={handleSubmit} alignItems="flex-end">
      <TextField
        descriptiveText="Enter the ShipHawk Customer IDs for the users you want to connect to this item, seperate IDs by commas"
        label="ShipHawk Customers"
        errorMessage="There is an error"
        defaultValue={ProductLink}
        onChange={handleChange}
        alignItems="flex-start"
      />
      <Button type="submit">Submit</Button>
    </Flex> : null }
        <Button  as={Link} to={'/products'} marginTop="20px" >
          Back to all products
        </Button>
    </View>
  );
  }

  export default Product;*/

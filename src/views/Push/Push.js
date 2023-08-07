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
Flex,
Button,
Table,
TableHead,
TableRow,
TableCell,
TableBody
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Auth } from "aws-amplify";

const Push = () => {
  const [Products, setProducts] = useState([]);
  const [SW_NUM, setSW_NUM] = useState([]);
  const [ProductLink, setProductLink] = useState([]);
  const [MainProduct, setMainProduct] = useState([]);
  const [showEdit, setShowEdit] = React.useState(false);

  const [qty1, setQty1] = useState([]);
  const [qty2, setQty2] = useState([]);
  const [qty3, setQty3] = useState([]);
  const [qty4, setQty4] = useState([]);
  const [qty5, setQty5] = useState([]);
  const [qty6, setQty6] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const TOKEN_URL =  process.env.REACT_APP_GET_TOKEN_URL;
  var TOKEN_DATA = {
    username: process.env.REACT_APP_TOKEN_DATA_USER,
    password: process.env.REACT_APP_TOKEN_DATA_PASS
  }
  TOKEN_DATA = JSON.stringify(TOKEN_DATA);

  var queryParameters = new URLSearchParams(window.location.search);
  var part_num = queryParameters.get("part_num");
  var part_color = queryParameters.get("color");


  async function handleSubmit(event) {
    event.preventDefault();
    console.log(qty4)
    var orderQtys = {
      'ExtCustomerID': SW_NUM,
      'PartNumber': part_num,
      'Size01' : qty1,
      'Size02' : qty2,
      'Size03' : qty3,
      'Size04' : qty4,
      'Size05' : qty5,
    }
    console.log(orderQtys)
  }


  useEffect(() => {
    fetchProduct();
  }, []);



  async function fetchProduct() {
    try {
      const currentUserInfo = await Auth.currentUserInfo()
      setSW_NUM(currentUserInfo.attributes['custom:shopworks_number']);
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

    const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL + `?PartNumber=${part_num}&Color=${part_color}`;

    const res_prods = await fetch(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        "url": PRODUCTS_URL,
        "token": TOKEN,
        "method": "GET"
      }), 
    });

    const PRODUCT = await res_prods.json();
    
    // Process the data as needed and convert it to the required format
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
    <View
    maxWidth="1200px"
    margin="auto"
    padding="50px 0" as="form" onSubmit={handleSubmit}>
    
    {Products.map((Product) => (
      <View key={Product.id}>
        <Heading level="1" fontWeight="600">{Product.name} - {Product.color}</Heading>
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
              <TableCell>Size 1</TableCell>
              <TableCell>{Product.size_1_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_1_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block"  value={qty1} onStepChange={(e) => setQty1(e) } /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Size 2</TableCell>
              <TableCell>{Product.size_2_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_2_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty2} onStepChange={(e) => setQty2(e) }/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Size 3</TableCell>
              <TableCell>{Product.size_3_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_3_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty3} onStepChange={(e) => setQty3(e) }/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Size 4</TableCell>
              <TableCell>{Product.size_4_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_4_qty}step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty4} onStepChange={(e) => setQty4(e) }/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Size 5</TableCell>
              <TableCell>{Product.size_5_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_5_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty5} onStepChange={(e) => setQty5(e) }/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Size 6</TableCell>
              <TableCell>{Product.size_6_qty}</TableCell>
              <TableCell><StepperField min={0} max={Product.size_6_qty} step={1} label="Stepper" labelHidden marginLeft="20px" display="inline-block" value={qty6} onStepChange={(e) => setQty6(e)} /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </View>

      ))}
      <Text>ShopWorks Customer Number: {SW_NUM}</Text>
      <Button type="submit" marginTop="20px">
        Order
      </Button>
    </View>
  );
}

export default Push;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
View,
Card,
Grid,
Heading,
Loader,
Text,
Divider,
TextField,
Button
} from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import { createProductLink, updateProductLink } from '../../graphql/mutations';
import { listProductLinks, getProductLink } from "../../graphql/queries";



const Product = () => {
  const [Products, setProducts] = useState([]);
  const [MainProduct, setMainProduct] = useState([]);
  const [ProductLink, setProductLink] = useState([]);
  const navigate = useNavigate();
  
  const queryParameters = new URLSearchParams(window.location.search);
  const part_num = queryParameters.get("part_num");

  async function getProduct(event) {
    try {
      const oneProductLink = await API.graphql({
        query: getProductLink,
        variables: { "productIDS": part_num }
      });
      return oneProductLink;
    } catch {
      return "";
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ProductLink === "") {
      alert('Cannot be empty')
    } else {
      alert(`The updated product: ${ProductLink}`)
    }
    
  }
  
  async function createProduct(ProductLink) {
    await API.graphql({
      query: createProductLink,
      variables: { 
        input: {
          "customerID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
          "productIDS": ProductLink
        }
       },
    });
  }
  
  async function updateProduct(event) {
    await API.graphql({
      query: updateProductLink,
      variables: { 
        input: {
          "customerID": "a3f4095e-39de-43d2-baf4-f8c16f0f6f4d",
          "productIDS": "Lorem ipsum dolor sit amet"
        }
       },
    });
  }
  
  
  const handleChange = (event) => {
    setProductLink(event.target.value);
  };

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

    var output = await getProduct();
    
    setProductLink(output);

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
    
    const PRODUCTS_URL = `https://manageordersapi.com/v1/manageorders/inventorylevels?PartNumber=${part_num}`;

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
    as="div"
    maxWidth="1200px"
    margin="auto"
    padding="50px 0">
    <View as="form" onSubmit={handleSubmit}>
      <TextField
        descriptiveText="Enter the ShipHawk Customer IDs for the users you want to connect to this item, seperate IDs by commas"
        label="ShipHawk Customers"
        errorMessage="There is an error"
        defaultValue={ProductLink}
        onChange={handleChange}
      />
      <Button type="submit">Submit</Button>
    </View>
      <Heading level="1" fontSize="30px" fontWeight="600" marginBottom="10px">{MainProduct.PartNumber} {MainProduct.PartDescription}</Heading>
      <Heading level="2" fontSize="20px" fontWeight="600">{MainProduct.ProductType}</Heading>
      <Grid templateColumns="1fr 1fr 1fr 1fr" margin="20px -20px">
        {Products.map((Product) => (
          <Card key={Product.id}
          variation="elevated"
          margin="20px"
          borderRadius="10px">
          <Heading level="2" fontSize="20px" fontWeight="600">{Product.color}</Heading>
          <Heading level="3" fontSize="16px" margin="10px 0 5px" fontWeight="600">Quantity</Heading>
          <Text> Size 1: {Product.size_1_qty}</Text>
          <Text> Size 2: {Product.size_2_qty}</Text>
          <Text> Size 3: {Product.size_3_qty}</Text>
          <Text> Size 4: {Product.size_4_qty}</Text>
          <Text> Size 5: {Product.size_4_qty}</Text>
          <Text> Size 6: {Product.size_5_qty}</Text>
          <Button onClick={() => navigate('/products')} marginTop="20px" >
            Order This Color
          </Button>
          </Card>
          ))}
        </Grid>
        <Button onClick={() => navigate('/products')} marginTop="20px" >
          Back to all products
        </Button>
    </View>
  );
  }

  export default Product;
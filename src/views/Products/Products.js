import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
Text,
Card,
View,
Grid,
Loader,
withAuthenticator,
} from '@aws-amplify/ui-react';
import { API, Auth  } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { listProductIDs } from "../../graphql/queries";

const Products = () => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = React.useState(false);

  const API_BASE_URL = "https://twermdd9bc.execute-api.us-east-2.amazonaws.com/staging/api";
  const TOKEN_URL = process.env.SW_GET_TOKEN_URL;

  var TOKEN_DATA = {username: "josh@inktrax.com",password: "1NKT3E$9m#"}
  TOKEN_DATA = JSON.stringify(TOKEN_DATA);
  var PRODUCTS_URL = "https://manageordersapi.com/v1/manageorders/";
  const date = new Date().toISOString().slice(0, 10);
  PRODUCTS_URL = PRODUCTS_URL + `inventorylevels?date_Modification_start=1990-01-01&date_Modification_end=${date}`;



  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const currentUserInfo = await Auth.currentAuthenticatedUser();
    const groups = currentUserInfo.signInUserSession.idToken.payload['cognito:groups'];
    const user_number = currentUserInfo.attributes['custom:shopworks_number'];
    console.log(user_number);

    if ( groups && groups.includes("Admins") ) {
      setShowEdit(true);
    } else {
      const listProductID = await API.graphql({
          query: listProductIDs,
          variables: {
            filter: {customerIDs: {contains: user_number}}
          }
      });
      const items = listProductID.data.listProductIDs.items
      console.log(items);
      var product_numbers = items.map(item => item.part_num);
      product_numbers = product_numbers.toString()
      console.log(product_numbers);
      PRODUCTS_URL = PRODUCTS_URL + `&PartNumber=${product_numbers}`;
    }

    console.log(PRODUCTS_URL);

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
    const productsData = PRODUCTS.result.map((item) => {
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
    <Grid 
    templateColumns="1fr 1fr 1fr">
      {Products.map((Product) => (
        <Card key={Product.id}
        preprint={Product.preprint}
        onClick={() => navigate(`/product?part_num=${Product.part_num}`)}
        variation="elevated"
        textAlign="center"
        margin="20px"
        borderRadius="10px">
          <Text as="strong" fontWeight={700}>
            {Product.part_num} - {Product.name} {Product.color}
          </Text>
        </Card>
        ))}
    </Grid>
    </View>
  );
  };
  export default withAuthenticator(Products);
  //export default Products;
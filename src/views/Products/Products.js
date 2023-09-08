import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
Text,
Flex,
Icon,
TextField,
Loader,
Collection,
withAuthenticator,
} from '@aws-amplify/ui-react';
import { API, Auth  } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { listProductIDs } from "../../graphql/queries";
import './Products.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Products = () => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [AllProducts, setAllProducts] = useState([]);

  const [showSearch, setShowSearch] = React.useState(false);
  const [showProducts, setShowProducts] = React.useState(false);
  

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const TOKEN_URL =  process.env.REACT_APP_GET_TOKEN_URL;
  var TOKEN_DATA = {
    username: process.env.REACT_APP_TOKEN_DATA_USER,
    password: process.env.REACT_APP_TOKEN_DATA_PASS
  }
  TOKEN_DATA = JSON.stringify(TOKEN_DATA);
  var PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL;
  const date = new Date().toISOString().slice(0, 10);
  PRODUCTS_URL = PRODUCTS_URL + `?date_Modification_start=1990-01-01&date_Modification_end=${date}`;

  useEffect(() => {
    fetchProducts();
  }, []);
/*
  function searchItems() {
    var searchedProductData = AllProducts.filter(item => item.part_num.includes(SearchPhrase));
    setProducts(searchedProductData);
  };
*/
  
  const searchItems = (e) => {
    var searchedProductData = AllProducts.filter(item => item.part_num.includes(e.currentTarget.value));
    setProducts(searchedProductData);
  };
  
  async function fetchProducts() {
    const currentUserInfo = await Auth.currentAuthenticatedUser();
    const groups = currentUserInfo.signInUserSession.idToken.payload['cognito:groups'];
    const user_number = currentUserInfo.attributes['custom:shopworks_number'];
    const user_code = currentUserInfo.attributes['custom:sw_item_code'];

    if ( groups && groups.includes("Admin") ) {
      setShowSearch(true);
    }
    /*if ( groups && groups.includes("Admins") ) {
      setShowSearch(true);
    } else {
      const listProductID = await API.graphql({
          query: listProductIDs,
          variables: {
            filter: {customerIDs: {contains: user_number}}
          }
      });
      const items = listProductID.data.listProductIDs.items
      var product_numbers = items.map(item => item.part_num);
      product_numbers = product_numbers.toString()
      PRODUCTS_URL = PRODUCTS_URL + `&PartNumber=${product_numbers}`;
    }*/


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
    console.log(PRODUCTS);
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

    setAllProducts(productsData);

    if ( groups && groups.includes("Admin") ) {
      setProducts(productsData);
    } else {
      var filteredProductData = productsData.filter(item => item.part_num.includes(`${user_code}_`));
      setProducts(filteredProductData);
    }
    setShowProducts(true);
  }

    return (
      <Container className="py-4">
        { showProducts ? <Row>
          { showSearch ? <Flex justifyContent="end" marginBottom="30px">
            <TextField innerEndComponent={
              <Text padding="8px 16px">
                <Icon pathData="M142.938822,125.786164 L133.905089,125.786164 L130.703259,122.698685 C142.296993,109.25125 148.66898,92.0834126 148.656375,74.3281875 C148.656375,33.2778631 115.378512,0 74.3281875,0 C33.2778631,0 0,33.2778631 0,74.3281875 C0,115.378512 33.2778631,148.656375 74.3281875,148.656375 C92.7387078,148.656375 109.662664,141.909663 122.698685,130.703259 L125.786164,133.905089 L125.786164,142.938822 L182.961692,200 L200,182.961692 L142.938822,125.786164 Z M73.5042735,124.786325 C45.1282051,124.786325 22.2222222,101.880342 22.2222222,73.5042735 C22.2222222,45.1282051 45.1282051,22.2222222 73.5042735,22.2222222 C101.880342,22.2222222 124.786325,45.1282051 124.786325,73.5042735 C124.786325,101.880342 101.880342,124.786325 73.5042735,124.786325 Z" viewBox={{width: 200, height: 200, }} ariaLabel="Search"/>
              </Text>
            } onChange={searchItems} ></TextField>
          </Flex> : null }
          <Collection type="grid" templateColumns={{base:"1fr", large:"1fr 1fr 1fr 1fr", medium: "1fr 1fr"}} gap="20px" items={Products} isPaginated itemsPerPage={24} > 
            {(Product, index) => (
              <Card key={Product.id} preprint={Product.preprint}  >
                <Card.Body>
                  <Card.Title>{Product.part_num}</Card.Title>
                  <Card.Text style={{ minHeight: '30px'}} >{Product.name} {Product.color}
                  </Card.Text>
                  
                  {(Product.size_1_qty === 0 && Product.size_2_qty === 0 && Product.size_3_qty === 0 && Product.size_4_qty === 0 && Product.size_4_qty === 0 && Product.size_5_qty === 0) ? <Card.Text style={{ textAlign: 'center', fontWeight: '600', fontSize: "11px", fontStyle: 'italic'}}>CURRENTLY NO STOCK</Card.Text> : <Card.Text style={{ textAlign: 'center', fontSize: "11px"}}>IN STOCK</Card.Text>}
                 
                </Card.Body>
                
                <Button variant="secondary" style={{ width: '100%', display:'block' }} onClick={() => navigate(`/product?part_num=${Product.part_num}&color=${Product.color}`)}>Order</Button>
              </Card>
            )}
          </Collection>
        </Row> : <Loader margin="auto" display="block"/> }
      </Container>
    );
  };


  export default withAuthenticator(Products);
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
View,
Card,
Grid,
Heading,
Text,
TextField,
Flex,
Button
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
      
      <Grid templateColumns="1fr 1fr 1fr 1fr" margin="20px -20px">
        {Products.map((Product) => (
          <Card key={Product.id}
          variation="elevated"
          margin="20px"
          borderRadius="10px">
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
          ))}
        </Grid>{ showEdit ? 
    <Flex as="form" onSubmit={handleSubmit} alignItems="flex-end">
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

  export default Product;
/*import React, { useState, useEffect } from "react";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
Button,
Flex,
Heading,
Image,
Text,
TextField,
View,
withAuthenticator,
} from '@aws-amplify/ui-react';
import { listProducts } from "../../graphql/queries";
import {
createProduct as createProductMutation,
deleteProduct as deleteProductMutation,
} from "../../graphql/mutations";

const Products = ({ signOut }) => {
const [Products, setProducts] = useState([]);
const [Token, setToken] = useState([]);

useEffect(() => {
  componentDidMount();
  fetchProducts();
}, []);



async function fetchProducts() {
  const apiData = await API.graphql({ query: listProducts });
  const ProductsFromAPI = apiData.data.listProducts.items;
  await Promise.all(
    ProductsFromAPI.map(async (Product) => {
      if (Product.image) {
        const url = await Storage.get(Product.name);
        Product.image = url;
      }
      return Product;
    })
  );
  setProducts(ProductsFromAPI);
}

async function createProduct(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const image = form.get("image");
  const data = {
    name: form.get("name"),
    description: form.get("description"),
    image: image.name,
  };
  if (!!data.image) await Storage.put(data.name, image);
  await API.graphql({
    query: createProductMutation,
    variables: { input: data },
  });
  fetchProducts();
  event.target.reset();
}


async function deleteProduct({ id, name }) {
  const newProducts = Products.filter((Product) => Product.id !== id);
  setProducts(newProducts);
  await Storage.remove(name);
  await API.graphql({
    query: deleteProductMutation,
    variables: { input: { id } },
  });
}


return (
  <View className="App">
    <Heading level={2}>Products</Heading>
    <View margin="3rem 0">
    {Products.map((Product) => (
<Flex
  key={Product.id || Product.name}
  direction="row"
  justifyContent="center"
  alignItems="center"
>
  <Text as="strong" fontWeight={700}>
    {Product.name}
  </Text>
  <Text as="span">{Product.description}</Text>
  {Product.image && (
    <Image
      src={Product.image}
      alt={`visual aid for ${Products.name}`}
      style={{ width: 400 }}
    />
  )}
  <Button variation="link" onClick={() => deleteProduct(Product)}>
    Delete Product
  </Button>
</Flex>
))}
    </View>
  </View>
);
};

export default Products;*/

import React, { useState, useEffect } from "react";
import axios from "axios";



const Products = () => {
  const API_BASE_URL = "https://twermdd9bc.execute-api.us-east-2.amazonaws.com/staging/api";
  
  const TOKEN_URL = "https://manageordersapi.com/v1/manageorders/signin";
  
  var TOKEN_DATA = {
      username: "josh@inktrax.com",
      password: "1NKT3E$9m#",
  }

  TOKEN_DATA = JSON.stringify(TOKEN_DATA);

  console.log(TOKEN_DATA);

  const TOKEN_CALL = {
    "url": TOKEN_URL,
    "data": TOKEN_DATA
  }
  
  const getAPIToken = async (username) => {
    const res = await fetch(API_BASE_URL, TOKEN_CALL);
    const data = await res.json();
    console.log(res.json())
    return data.access_token.access_token;
  };

  
  useEffect(() => {
    getAPIToken();
  }, []);



  /*
  const [token, setToken] = useState([]);
  const [products, setProducts] = useState([]);


  const getAPIToken = async (username) => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.access_token.access_token;
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  async function fetchProducts() {
    const API_ID_TOKEN = await getAPIToken()
    console.log(API_ID_TOKEN);
    try {
      const date = new Date().toISOString().slice(0, 10);
      const url =
      GET_PRODUCTS_URL +
        `inventorylevels?date_Modification_start=1990-01-01&date_Modification_end=${date}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_ID_TOKEN}`,
        },
      });
      const responseData = response.data;
      // Process the data as needed and convert it to the required format
      const productsData = responseData.result.map((item) => {
        return {
          name: item.PartDescription,
          cost: item.TotalCost,
          color: item.Color,
          part_num: item.PartNumber,
          size_1_qty: item.Size01,
          size_2_qty: item.Size02,
          size_3_qty: item.Size03,
          size_4_qty: item.Size04,
          size_5_qty: item.Size05,
          size_6_qty: item.Size06,
        };
      });
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  }*/
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="product-list-wrapper">
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
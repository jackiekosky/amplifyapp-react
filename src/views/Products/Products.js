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

  useEffect(() => {
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

export default withAuthenticator(Products);*/
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_API_URL = "https://manageordersapi.com/v1/manageorders/";

async function getToken() {
    try {
      const response = await axios.post(`${BASE_API_URL}signin`, {
        username: "josh@inktrax.com",
        password: "1NKT3E$9m#",
        'Access-Control-Allow-Origin': '*'
      });

      return response.data.id_token;
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

const Products = () => {
  const API_ID_TOKEN = getToken();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const url =
        BASE_API_URL +
        `inventorylevels?date_Modification_start=1990-01-01&date_Modification_end=${date}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${API_ID_TOKEN}`,
          'Access-Control-Allow-Origin': '*'
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
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="product-list-wrapper">
            {products.map((product) => (
              <a key={product.part_num} href={`./single-product.php?part_num=${product.part_num}`}>
                <div className="product white-bg rounder-borders">
                  <img src="" alt="Product Image" />
                  <div className="product-info">
                    <div className="product-title">{product.name}</div>
                    <div className="product-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    <div className="product-colors">
                      {product.color.map((color, index) => (
                        <span key={index} className="color" style={{ backgroundColor: color }} title={color}></span>
                      ))}
                      {product.color.length > 11 && (
                        <span className="color-text">+ <span className="product-color-num">{product.color.length - 11}</span></span>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
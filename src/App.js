import React, { useState, useEffect } from "react";
import "./App.css";
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
import { listProducts } from "./graphql/queries";
import {
  createProduct as createProductMutation,
  deleteProduct as deleteProductMutation,
} from "./graphql/mutations";


const App = ({ signOut }) => {
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
   <></>
  );
};

export default App;
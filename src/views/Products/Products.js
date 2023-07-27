import React, { useState, useEffect } from "react";
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

export default withAuthenticator(Products);
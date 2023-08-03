/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProductLink = /* GraphQL */ `
  query GetProductLink($id: ID!) {
    getProductLink(id: $id) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProductLinks = /* GraphQL */ `
  query ListProductLinks(
    $filter: ModelProductLinkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductLinks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerID
        productIDS
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      id
      name
      price
      color
      part_num
      id_Vendor
      size_1_qty
      size_2_qty
      size_3_qty
      size_4_qty
      size_5_qty
      size_6_qty
      type
      cost
      PreprintGroup
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProducts = /* GraphQL */ `
  query ListProducts(
    $filter: ModelProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        price
        color
        part_num
        id_Vendor
        size_1_qty
        size_2_qty
        size_3_qty
        size_4_qty
        size_5_qty
        size_6_qty
        type
        cost
        PreprintGroup
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

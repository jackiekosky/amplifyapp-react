/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPushedOrders = /* GraphQL */ `
  query GetPushedOrders($id: ID!) {
    getPushedOrders(id: $id) {
      id
      customerID
      product
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPushedOrders = /* GraphQL */ `
  query ListPushedOrders(
    $filter: ModelPushedOrdersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPushedOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customerID
        product
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getProductIDs = /* GraphQL */ `
  query GetProductIDs($id: ID!) {
    getProductIDs(id: $id) {
      id
      part_num
      customerIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listProductIDs = /* GraphQL */ `
  query ListProductIDs(
    $filter: ModelProductIDsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductIDs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        part_num
        customerIDs
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

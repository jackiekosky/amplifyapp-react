/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomerIDs = /* GraphQL */ `
  query GetCustomerIDs($id: ID!) {
    getCustomerIDs(id: $id) {
      id
      customer_id
      ProductIDs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCustomerIDs = /* GraphQL */ `
  query ListCustomerIDs(
    $filter: ModelCustomerIDsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerIDs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        customer_id
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
      customeridsID
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
        customeridsID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const productIDsByCustomeridsID = /* GraphQL */ `
  query ProductIDsByCustomeridsID(
    $customeridsID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelProductIDsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productIDsByCustomeridsID(
      customeridsID: $customeridsID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        part_num
        customeridsID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
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

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCustomerIDs = /* GraphQL */ `
  subscription OnCreateCustomerIDs(
    $filter: ModelSubscriptionCustomerIDsFilterInput
  ) {
    onCreateCustomerIDs(filter: $filter) {
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
export const onUpdateCustomerIDs = /* GraphQL */ `
  subscription OnUpdateCustomerIDs(
    $filter: ModelSubscriptionCustomerIDsFilterInput
  ) {
    onUpdateCustomerIDs(filter: $filter) {
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
export const onDeleteCustomerIDs = /* GraphQL */ `
  subscription OnDeleteCustomerIDs(
    $filter: ModelSubscriptionCustomerIDsFilterInput
  ) {
    onDeleteCustomerIDs(filter: $filter) {
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
export const onCreateProductIDs = /* GraphQL */ `
  subscription OnCreateProductIDs(
    $filter: ModelSubscriptionProductIDsFilterInput
  ) {
    onCreateProductIDs(filter: $filter) {
      id
      part_num
      customeridsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProductIDs = /* GraphQL */ `
  subscription OnUpdateProductIDs(
    $filter: ModelSubscriptionProductIDsFilterInput
  ) {
    onUpdateProductIDs(filter: $filter) {
      id
      part_num
      customeridsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProductIDs = /* GraphQL */ `
  subscription OnDeleteProductIDs(
    $filter: ModelSubscriptionProductIDsFilterInput
  ) {
    onDeleteProductIDs(filter: $filter) {
      id
      part_num
      customeridsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProductLink = /* GraphQL */ `
  subscription OnCreateProductLink(
    $filter: ModelSubscriptionProductLinkFilterInput
  ) {
    onCreateProductLink(filter: $filter) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateProductLink = /* GraphQL */ `
  subscription OnUpdateProductLink(
    $filter: ModelSubscriptionProductLinkFilterInput
  ) {
    onUpdateProductLink(filter: $filter) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteProductLink = /* GraphQL */ `
  subscription OnDeleteProductLink(
    $filter: ModelSubscriptionProductLinkFilterInput
  ) {
    onDeleteProductLink(filter: $filter) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct($filter: ModelSubscriptionProductFilterInput) {
    onCreateProduct(filter: $filter) {
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
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct($filter: ModelSubscriptionProductFilterInput) {
    onUpdateProduct(filter: $filter) {
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
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct($filter: ModelSubscriptionProductFilterInput) {
    onDeleteProduct(filter: $filter) {
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

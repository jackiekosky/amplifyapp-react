/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateProductIDs = /* GraphQL */ `
  subscription OnCreateProductIDs(
    $filter: ModelSubscriptionProductIDsFilterInput
  ) {
    onCreateProductIDs(filter: $filter) {
      id
      part_num
      customerIDs
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
      customerIDs
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
      customerIDs
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

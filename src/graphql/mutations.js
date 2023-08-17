/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPushedOrders = /* GraphQL */ `
  mutation CreatePushedOrders(
    $input: CreatePushedOrdersInput!
    $condition: ModelPushedOrdersConditionInput
  ) {
    createPushedOrders(input: $input, condition: $condition) {
      id
      customerID
      product
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePushedOrders = /* GraphQL */ `
  mutation UpdatePushedOrders(
    $input: UpdatePushedOrdersInput!
    $condition: ModelPushedOrdersConditionInput
  ) {
    updatePushedOrders(input: $input, condition: $condition) {
      id
      customerID
      product
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePushedOrders = /* GraphQL */ `
  mutation DeletePushedOrders(
    $input: DeletePushedOrdersInput!
    $condition: ModelPushedOrdersConditionInput
  ) {
    deletePushedOrders(input: $input, condition: $condition) {
      id
      customerID
      product
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProductIDs = /* GraphQL */ `
  mutation CreateProductIDs(
    $input: CreateProductIDsInput!
    $condition: ModelProductIDsConditionInput
  ) {
    createProductIDs(input: $input, condition: $condition) {
      id
      part_num
      customerIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProductIDs = /* GraphQL */ `
  mutation UpdateProductIDs(
    $input: UpdateProductIDsInput!
    $condition: ModelProductIDsConditionInput
  ) {
    updateProductIDs(input: $input, condition: $condition) {
      id
      part_num
      customerIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProductIDs = /* GraphQL */ `
  mutation DeleteProductIDs(
    $input: DeleteProductIDsInput!
    $condition: ModelProductIDsConditionInput
  ) {
    deleteProductIDs(input: $input, condition: $condition) {
      id
      part_num
      customerIDs
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct(
    $input: CreateProductInput!
    $condition: ModelProductConditionInput
  ) {
    createProduct(input: $input, condition: $condition) {
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
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct(
    $input: UpdateProductInput!
    $condition: ModelProductConditionInput
  ) {
    updateProduct(input: $input, condition: $condition) {
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
export const deleteProduct = /* GraphQL */ `
  mutation DeleteProduct(
    $input: DeleteProductInput!
    $condition: ModelProductConditionInput
  ) {
    deleteProduct(input: $input, condition: $condition) {
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

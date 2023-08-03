/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomerIDs = /* GraphQL */ `
  mutation CreateCustomerIDs(
    $input: CreateCustomerIDsInput!
    $condition: ModelCustomerIDsConditionInput
  ) {
    createCustomerIDs(input: $input, condition: $condition) {
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
export const updateCustomerIDs = /* GraphQL */ `
  mutation UpdateCustomerIDs(
    $input: UpdateCustomerIDsInput!
    $condition: ModelCustomerIDsConditionInput
  ) {
    updateCustomerIDs(input: $input, condition: $condition) {
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
export const deleteCustomerIDs = /* GraphQL */ `
  mutation DeleteCustomerIDs(
    $input: DeleteCustomerIDsInput!
    $condition: ModelCustomerIDsConditionInput
  ) {
    deleteCustomerIDs(input: $input, condition: $condition) {
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
export const createProductIDs = /* GraphQL */ `
  mutation CreateProductIDs(
    $input: CreateProductIDsInput!
    $condition: ModelProductIDsConditionInput
  ) {
    createProductIDs(input: $input, condition: $condition) {
      id
      part_num
      customeridsID
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
      customeridsID
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
      customeridsID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createProductLink = /* GraphQL */ `
  mutation CreateProductLink(
    $input: CreateProductLinkInput!
    $condition: ModelProductLinkConditionInput
  ) {
    createProductLink(input: $input, condition: $condition) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateProductLink = /* GraphQL */ `
  mutation UpdateProductLink(
    $input: UpdateProductLinkInput!
    $condition: ModelProductLinkConditionInput
  ) {
    updateProductLink(input: $input, condition: $condition) {
      id
      customerID
      productIDS
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteProductLink = /* GraphQL */ `
  mutation DeleteProductLink(
    $input: DeleteProductLinkInput!
    $condition: ModelProductLinkConditionInput
  ) {
    deleteProductLink(input: $input, condition: $condition) {
      id
      customerID
      productIDS
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

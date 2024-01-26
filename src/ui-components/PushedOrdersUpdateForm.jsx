/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { getPushedOrders } from "../graphql/queries";
import { updatePushedOrders } from "../graphql/mutations";
export default function PushedOrdersUpdateForm(props) {
  const {
    id: idProp,
    pushedOrders: pushedOrdersModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    customerID: "",
    product: "",
  };
  const [customerID, setCustomerID] = React.useState(initialValues.customerID);
  const [product, setProduct] = React.useState(initialValues.product);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = pushedOrdersRecord
      ? { ...initialValues, ...pushedOrdersRecord }
      : initialValues;
    setCustomerID(cleanValues.customerID);
    setProduct(cleanValues.product);
    setErrors({});
  };
  const [pushedOrdersRecord, setPushedOrdersRecord] = React.useState(
    pushedOrdersModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await API.graphql({
              query: getPushedOrders.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getPushedOrders
        : pushedOrdersModelProp;
      setPushedOrdersRecord(record);
    };
    queryData();
  }, [idProp, pushedOrdersModelProp]);
  React.useEffect(resetStateValues, [pushedOrdersRecord]);
  const validations = {
    customerID: [],
    product: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          customerID: customerID ?? null,
          product: product ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: updatePushedOrders.replaceAll("__typename", ""),
            variables: {
              input: {
                id: pushedOrdersRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "PushedOrdersUpdateForm")}
      {...rest}
    >
      <TextField
        label="Customer id"
        isRequired={false}
        isReadOnly={false}
        value={customerID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID: value,
              product,
            };
            const result = onChange(modelFields);
            value = result?.customerID ?? value;
          }
          if (errors.customerID?.hasError) {
            runValidationTasks("customerID", value);
          }
          setCustomerID(value);
        }}
        onBlur={() => runValidationTasks("customerID", customerID)}
        errorMessage={errors.customerID?.errorMessage}
        hasError={errors.customerID?.hasError}
        {...getOverrideProps(overrides, "customerID")}
      ></TextField>
      <TextField
        label="Product"
        isRequired={false}
        isReadOnly={false}
        value={product}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customerID,
              product: value,
            };
            const result = onChange(modelFields);
            value = result?.product ?? value;
          }
          if (errors.product?.hasError) {
            runValidationTasks("product", value);
          }
          setProduct(value);
        }}
        onBlur={() => runValidationTasks("product", product)}
        errorMessage={errors.product?.errorMessage}
        hasError={errors.product?.hasError}
        {...getOverrideProps(overrides, "product")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || pushedOrdersModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || pushedOrdersModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

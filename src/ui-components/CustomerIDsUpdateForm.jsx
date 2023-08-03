/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { CustomerIDs } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CustomerIDsUpdateForm(props) {
  const {
    id: idProp,
    customerIDs: customerIDsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    customer_id: "",
  };
  const [customer_id, setCustomer_id] = React.useState(
    initialValues.customer_id
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = customerIDsRecord
      ? { ...initialValues, ...customerIDsRecord }
      : initialValues;
    setCustomer_id(cleanValues.customer_id);
    setErrors({});
  };
  const [customerIDsRecord, setCustomerIDsRecord] =
    React.useState(customerIDsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(CustomerIDs, idProp)
        : customerIDsModelProp;
      setCustomerIDsRecord(record);
    };
    queryData();
  }, [idProp, customerIDsModelProp]);
  React.useEffect(resetStateValues, [customerIDsRecord]);
  const validations = {
    customer_id: [],
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
          customer_id,
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            CustomerIDs.copyOf(customerIDsRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CustomerIDsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Customer id"
        isRequired={false}
        isReadOnly={false}
        value={customer_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              customer_id: value,
            };
            const result = onChange(modelFields);
            value = result?.customer_id ?? value;
          }
          if (errors.customer_id?.hasError) {
            runValidationTasks("customer_id", value);
          }
          setCustomer_id(value);
        }}
        onBlur={() => runValidationTasks("customer_id", customer_id)}
        errorMessage={errors.customer_id?.errorMessage}
        hasError={errors.customer_id?.hasError}
        {...getOverrideProps(overrides, "customer_id")}
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
          isDisabled={!(idProp || customerIDsModelProp)}
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
              !(idProp || customerIDsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

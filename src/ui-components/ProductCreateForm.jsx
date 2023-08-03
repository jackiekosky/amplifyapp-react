/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Product } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ProductCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    price: "",
    color: "",
    part_num: "",
    id_Vendor: "",
    size_1_qty: "",
    size_2_qty: "",
    size_3_qty: "",
    size_4_qty: "",
    size_5_qty: "",
    size_6_qty: "",
    type: "",
    cost: "",
    PreprintGroup: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [price, setPrice] = React.useState(initialValues.price);
  const [color, setColor] = React.useState(initialValues.color);
  const [part_num, setPart_num] = React.useState(initialValues.part_num);
  const [id_Vendor, setId_Vendor] = React.useState(initialValues.id_Vendor);
  const [size_1_qty, setSize_1_qty] = React.useState(initialValues.size_1_qty);
  const [size_2_qty, setSize_2_qty] = React.useState(initialValues.size_2_qty);
  const [size_3_qty, setSize_3_qty] = React.useState(initialValues.size_3_qty);
  const [size_4_qty, setSize_4_qty] = React.useState(initialValues.size_4_qty);
  const [size_5_qty, setSize_5_qty] = React.useState(initialValues.size_5_qty);
  const [size_6_qty, setSize_6_qty] = React.useState(initialValues.size_6_qty);
  const [type, setType] = React.useState(initialValues.type);
  const [cost, setCost] = React.useState(initialValues.cost);
  const [PreprintGroup, setPreprintGroup] = React.useState(
    initialValues.PreprintGroup
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setPrice(initialValues.price);
    setColor(initialValues.color);
    setPart_num(initialValues.part_num);
    setId_Vendor(initialValues.id_Vendor);
    setSize_1_qty(initialValues.size_1_qty);
    setSize_2_qty(initialValues.size_2_qty);
    setSize_3_qty(initialValues.size_3_qty);
    setSize_4_qty(initialValues.size_4_qty);
    setSize_5_qty(initialValues.size_5_qty);
    setSize_6_qty(initialValues.size_6_qty);
    setType(initialValues.type);
    setCost(initialValues.cost);
    setPreprintGroup(initialValues.PreprintGroup);
    setErrors({});
  };
  const validations = {
    name: [],
    price: [],
    color: [],
    part_num: [],
    id_Vendor: [],
    size_1_qty: [],
    size_2_qty: [],
    size_3_qty: [],
    size_4_qty: [],
    size_5_qty: [],
    size_6_qty: [],
    type: [],
    cost: [],
    PreprintGroup: [],
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
          name,
          price,
          color,
          part_num,
          id_Vendor,
          size_1_qty,
          size_2_qty,
          size_3_qty,
          size_4_qty,
          size_5_qty,
          size_6_qty,
          type,
          cost,
          PreprintGroup,
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
          await DataStore.save(new Product(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ProductCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Price"
        isRequired={false}
        isReadOnly={false}
        value={price}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price: value,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.price ?? value;
          }
          if (errors.price?.hasError) {
            runValidationTasks("price", value);
          }
          setPrice(value);
        }}
        onBlur={() => runValidationTasks("price", price)}
        errorMessage={errors.price?.errorMessage}
        hasError={errors.price?.hasError}
        {...getOverrideProps(overrides, "price")}
      ></TextField>
      <TextField
        label="Color"
        isRequired={false}
        isReadOnly={false}
        value={color}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color: value,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.color ?? value;
          }
          if (errors.color?.hasError) {
            runValidationTasks("color", value);
          }
          setColor(value);
        }}
        onBlur={() => runValidationTasks("color", color)}
        errorMessage={errors.color?.errorMessage}
        hasError={errors.color?.hasError}
        {...getOverrideProps(overrides, "color")}
      ></TextField>
      <TextField
        label="Part num"
        isRequired={false}
        isReadOnly={false}
        value={part_num}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num: value,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.part_num ?? value;
          }
          if (errors.part_num?.hasError) {
            runValidationTasks("part_num", value);
          }
          setPart_num(value);
        }}
        onBlur={() => runValidationTasks("part_num", part_num)}
        errorMessage={errors.part_num?.errorMessage}
        hasError={errors.part_num?.hasError}
        {...getOverrideProps(overrides, "part_num")}
      ></TextField>
      <TextField
        label="Id vendor"
        isRequired={false}
        isReadOnly={false}
        value={id_Vendor}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor: value,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.id_Vendor ?? value;
          }
          if (errors.id_Vendor?.hasError) {
            runValidationTasks("id_Vendor", value);
          }
          setId_Vendor(value);
        }}
        onBlur={() => runValidationTasks("id_Vendor", id_Vendor)}
        errorMessage={errors.id_Vendor?.errorMessage}
        hasError={errors.id_Vendor?.hasError}
        {...getOverrideProps(overrides, "id_Vendor")}
      ></TextField>
      <TextField
        label="Size 1 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_1_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty: value,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_1_qty ?? value;
          }
          if (errors.size_1_qty?.hasError) {
            runValidationTasks("size_1_qty", value);
          }
          setSize_1_qty(value);
        }}
        onBlur={() => runValidationTasks("size_1_qty", size_1_qty)}
        errorMessage={errors.size_1_qty?.errorMessage}
        hasError={errors.size_1_qty?.hasError}
        {...getOverrideProps(overrides, "size_1_qty")}
      ></TextField>
      <TextField
        label="Size 2 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_2_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty: value,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_2_qty ?? value;
          }
          if (errors.size_2_qty?.hasError) {
            runValidationTasks("size_2_qty", value);
          }
          setSize_2_qty(value);
        }}
        onBlur={() => runValidationTasks("size_2_qty", size_2_qty)}
        errorMessage={errors.size_2_qty?.errorMessage}
        hasError={errors.size_2_qty?.hasError}
        {...getOverrideProps(overrides, "size_2_qty")}
      ></TextField>
      <TextField
        label="Size 3 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_3_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty: value,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_3_qty ?? value;
          }
          if (errors.size_3_qty?.hasError) {
            runValidationTasks("size_3_qty", value);
          }
          setSize_3_qty(value);
        }}
        onBlur={() => runValidationTasks("size_3_qty", size_3_qty)}
        errorMessage={errors.size_3_qty?.errorMessage}
        hasError={errors.size_3_qty?.hasError}
        {...getOverrideProps(overrides, "size_3_qty")}
      ></TextField>
      <TextField
        label="Size 4 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_4_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty: value,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_4_qty ?? value;
          }
          if (errors.size_4_qty?.hasError) {
            runValidationTasks("size_4_qty", value);
          }
          setSize_4_qty(value);
        }}
        onBlur={() => runValidationTasks("size_4_qty", size_4_qty)}
        errorMessage={errors.size_4_qty?.errorMessage}
        hasError={errors.size_4_qty?.hasError}
        {...getOverrideProps(overrides, "size_4_qty")}
      ></TextField>
      <TextField
        label="Size 5 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_5_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty: value,
              size_6_qty,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_5_qty ?? value;
          }
          if (errors.size_5_qty?.hasError) {
            runValidationTasks("size_5_qty", value);
          }
          setSize_5_qty(value);
        }}
        onBlur={() => runValidationTasks("size_5_qty", size_5_qty)}
        errorMessage={errors.size_5_qty?.errorMessage}
        hasError={errors.size_5_qty?.hasError}
        {...getOverrideProps(overrides, "size_5_qty")}
      ></TextField>
      <TextField
        label="Size 6 qty"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={size_6_qty}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty: value,
              type,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.size_6_qty ?? value;
          }
          if (errors.size_6_qty?.hasError) {
            runValidationTasks("size_6_qty", value);
          }
          setSize_6_qty(value);
        }}
        onBlur={() => runValidationTasks("size_6_qty", size_6_qty)}
        errorMessage={errors.size_6_qty?.errorMessage}
        hasError={errors.size_6_qty?.hasError}
        {...getOverrideProps(overrides, "size_6_qty")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type: value,
              cost,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Cost"
        isRequired={false}
        isReadOnly={false}
        value={cost}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost: value,
              PreprintGroup,
            };
            const result = onChange(modelFields);
            value = result?.cost ?? value;
          }
          if (errors.cost?.hasError) {
            runValidationTasks("cost", value);
          }
          setCost(value);
        }}
        onBlur={() => runValidationTasks("cost", cost)}
        errorMessage={errors.cost?.errorMessage}
        hasError={errors.cost?.hasError}
        {...getOverrideProps(overrides, "cost")}
      ></TextField>
      <TextField
        label="Preprint group"
        isRequired={false}
        isReadOnly={false}
        value={PreprintGroup}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              price,
              color,
              part_num,
              id_Vendor,
              size_1_qty,
              size_2_qty,
              size_3_qty,
              size_4_qty,
              size_5_qty,
              size_6_qty,
              type,
              cost,
              PreprintGroup: value,
            };
            const result = onChange(modelFields);
            value = result?.PreprintGroup ?? value;
          }
          if (errors.PreprintGroup?.hasError) {
            runValidationTasks("PreprintGroup", value);
          }
          setPreprintGroup(value);
        }}
        onBlur={() => runValidationTasks("PreprintGroup", PreprintGroup)}
        errorMessage={errors.PreprintGroup?.errorMessage}
        hasError={errors.PreprintGroup?.hasError}
        {...getOverrideProps(overrides, "PreprintGroup")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

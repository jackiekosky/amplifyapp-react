/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProductIDsCreateFormInputValues = {
    part_num?: string;
    customerIDs?: string[];
};
export declare type ProductIDsCreateFormValidationValues = {
    part_num?: ValidationFunction<string>;
    customerIDs?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductIDsCreateFormOverridesProps = {
    ProductIDsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    part_num?: PrimitiveOverrideProps<TextFieldProps>;
    customerIDs?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductIDsCreateFormProps = React.PropsWithChildren<{
    overrides?: ProductIDsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProductIDsCreateFormInputValues) => ProductIDsCreateFormInputValues;
    onSuccess?: (fields: ProductIDsCreateFormInputValues) => void;
    onError?: (fields: ProductIDsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductIDsCreateFormInputValues) => ProductIDsCreateFormInputValues;
    onValidate?: ProductIDsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProductIDsCreateForm(props: ProductIDsCreateFormProps): React.ReactElement;

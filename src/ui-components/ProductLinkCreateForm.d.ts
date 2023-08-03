/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProductLinkCreateFormInputValues = {
    customerID?: string;
    productIDS?: string;
};
export declare type ProductLinkCreateFormValidationValues = {
    customerID?: ValidationFunction<string>;
    productIDS?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductLinkCreateFormOverridesProps = {
    ProductLinkCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    productIDS?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductLinkCreateFormProps = React.PropsWithChildren<{
    overrides?: ProductLinkCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProductLinkCreateFormInputValues) => ProductLinkCreateFormInputValues;
    onSuccess?: (fields: ProductLinkCreateFormInputValues) => void;
    onError?: (fields: ProductLinkCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductLinkCreateFormInputValues) => ProductLinkCreateFormInputValues;
    onValidate?: ProductLinkCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProductLinkCreateForm(props: ProductLinkCreateFormProps): React.ReactElement;

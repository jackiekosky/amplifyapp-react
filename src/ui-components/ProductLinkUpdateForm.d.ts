/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ProductLink } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProductLinkUpdateFormInputValues = {
    customerID?: string;
    productIDS?: string;
};
export declare type ProductLinkUpdateFormValidationValues = {
    customerID?: ValidationFunction<string>;
    productIDS?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductLinkUpdateFormOverridesProps = {
    ProductLinkUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    productIDS?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductLinkUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProductLinkUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    productLink?: ProductLink;
    onSubmit?: (fields: ProductLinkUpdateFormInputValues) => ProductLinkUpdateFormInputValues;
    onSuccess?: (fields: ProductLinkUpdateFormInputValues) => void;
    onError?: (fields: ProductLinkUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductLinkUpdateFormInputValues) => ProductLinkUpdateFormInputValues;
    onValidate?: ProductLinkUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProductLinkUpdateForm(props: ProductLinkUpdateFormProps): React.ReactElement;

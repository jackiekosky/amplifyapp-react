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
export declare type PushedOrdersUpdateFormInputValues = {
    customerID?: string;
    product?: string;
};
export declare type PushedOrdersUpdateFormValidationValues = {
    customerID?: ValidationFunction<string>;
    product?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PushedOrdersUpdateFormOverridesProps = {
    PushedOrdersUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    product?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PushedOrdersUpdateFormProps = React.PropsWithChildren<{
    overrides?: PushedOrdersUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    pushedOrders?: any;
    onSubmit?: (fields: PushedOrdersUpdateFormInputValues) => PushedOrdersUpdateFormInputValues;
    onSuccess?: (fields: PushedOrdersUpdateFormInputValues) => void;
    onError?: (fields: PushedOrdersUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PushedOrdersUpdateFormInputValues) => PushedOrdersUpdateFormInputValues;
    onValidate?: PushedOrdersUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PushedOrdersUpdateForm(props: PushedOrdersUpdateFormProps): React.ReactElement;

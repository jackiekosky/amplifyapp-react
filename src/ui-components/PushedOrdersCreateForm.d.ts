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
export declare type PushedOrdersCreateFormInputValues = {
    customerID?: string;
    product?: string;
};
export declare type PushedOrdersCreateFormValidationValues = {
    customerID?: ValidationFunction<string>;
    product?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PushedOrdersCreateFormOverridesProps = {
    PushedOrdersCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customerID?: PrimitiveOverrideProps<TextFieldProps>;
    product?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PushedOrdersCreateFormProps = React.PropsWithChildren<{
    overrides?: PushedOrdersCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: PushedOrdersCreateFormInputValues) => PushedOrdersCreateFormInputValues;
    onSuccess?: (fields: PushedOrdersCreateFormInputValues) => void;
    onError?: (fields: PushedOrdersCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PushedOrdersCreateFormInputValues) => PushedOrdersCreateFormInputValues;
    onValidate?: PushedOrdersCreateFormValidationValues;
} & React.CSSProperties>;
export default function PushedOrdersCreateForm(props: PushedOrdersCreateFormProps): React.ReactElement;

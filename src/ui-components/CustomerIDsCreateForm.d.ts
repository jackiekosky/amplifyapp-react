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
export declare type CustomerIDsCreateFormInputValues = {
    customer_id?: string;
};
export declare type CustomerIDsCreateFormValidationValues = {
    customer_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerIDsCreateFormOverridesProps = {
    CustomerIDsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customer_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerIDsCreateFormProps = React.PropsWithChildren<{
    overrides?: CustomerIDsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CustomerIDsCreateFormInputValues) => CustomerIDsCreateFormInputValues;
    onSuccess?: (fields: CustomerIDsCreateFormInputValues) => void;
    onError?: (fields: CustomerIDsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerIDsCreateFormInputValues) => CustomerIDsCreateFormInputValues;
    onValidate?: CustomerIDsCreateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerIDsCreateForm(props: CustomerIDsCreateFormProps): React.ReactElement;

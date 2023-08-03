/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { CustomerIDs } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CustomerIDsUpdateFormInputValues = {
    customer_id?: string;
};
export declare type CustomerIDsUpdateFormValidationValues = {
    customer_id?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CustomerIDsUpdateFormOverridesProps = {
    CustomerIDsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    customer_id?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CustomerIDsUpdateFormProps = React.PropsWithChildren<{
    overrides?: CustomerIDsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    customerIDs?: CustomerIDs;
    onSubmit?: (fields: CustomerIDsUpdateFormInputValues) => CustomerIDsUpdateFormInputValues;
    onSuccess?: (fields: CustomerIDsUpdateFormInputValues) => void;
    onError?: (fields: CustomerIDsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CustomerIDsUpdateFormInputValues) => CustomerIDsUpdateFormInputValues;
    onValidate?: CustomerIDsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CustomerIDsUpdateForm(props: CustomerIDsUpdateFormProps): React.ReactElement;

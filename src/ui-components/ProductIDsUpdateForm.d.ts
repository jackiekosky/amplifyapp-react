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
export declare type ProductIDsUpdateFormInputValues = {
    part_num?: string;
    customerIDs?: string[];
};
export declare type ProductIDsUpdateFormValidationValues = {
    part_num?: ValidationFunction<string>;
    customerIDs?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductIDsUpdateFormOverridesProps = {
    ProductIDsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    part_num?: PrimitiveOverrideProps<TextFieldProps>;
    customerIDs?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductIDsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProductIDsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    productIDs?: any;
    onSubmit?: (fields: ProductIDsUpdateFormInputValues) => ProductIDsUpdateFormInputValues;
    onSuccess?: (fields: ProductIDsUpdateFormInputValues) => void;
    onError?: (fields: ProductIDsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductIDsUpdateFormInputValues) => ProductIDsUpdateFormInputValues;
    onValidate?: ProductIDsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProductIDsUpdateForm(props: ProductIDsUpdateFormProps): React.ReactElement;

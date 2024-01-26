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
export declare type ProductUpdateFormInputValues = {
    name?: string;
    price?: string;
    color?: string;
    part_num?: string;
    id_Vendor?: string;
    size_1_qty?: number;
    size_2_qty?: number;
    size_3_qty?: number;
    size_4_qty?: number;
    size_5_qty?: number;
    size_6_qty?: number;
    type?: string;
    cost?: string;
    PreprintGroup?: string;
};
export declare type ProductUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    price?: ValidationFunction<string>;
    color?: ValidationFunction<string>;
    part_num?: ValidationFunction<string>;
    id_Vendor?: ValidationFunction<string>;
    size_1_qty?: ValidationFunction<number>;
    size_2_qty?: ValidationFunction<number>;
    size_3_qty?: ValidationFunction<number>;
    size_4_qty?: ValidationFunction<number>;
    size_5_qty?: ValidationFunction<number>;
    size_6_qty?: ValidationFunction<number>;
    type?: ValidationFunction<string>;
    cost?: ValidationFunction<string>;
    PreprintGroup?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProductUpdateFormOverridesProps = {
    ProductUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    price?: PrimitiveOverrideProps<TextFieldProps>;
    color?: PrimitiveOverrideProps<TextFieldProps>;
    part_num?: PrimitiveOverrideProps<TextFieldProps>;
    id_Vendor?: PrimitiveOverrideProps<TextFieldProps>;
    size_1_qty?: PrimitiveOverrideProps<TextFieldProps>;
    size_2_qty?: PrimitiveOverrideProps<TextFieldProps>;
    size_3_qty?: PrimitiveOverrideProps<TextFieldProps>;
    size_4_qty?: PrimitiveOverrideProps<TextFieldProps>;
    size_5_qty?: PrimitiveOverrideProps<TextFieldProps>;
    size_6_qty?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    cost?: PrimitiveOverrideProps<TextFieldProps>;
    PreprintGroup?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProductUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProductUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    product?: any;
    onSubmit?: (fields: ProductUpdateFormInputValues) => ProductUpdateFormInputValues;
    onSuccess?: (fields: ProductUpdateFormInputValues) => void;
    onError?: (fields: ProductUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ProductUpdateFormInputValues) => ProductUpdateFormInputValues;
    onValidate?: ProductUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProductUpdateForm(props: ProductUpdateFormProps): React.ReactElement;

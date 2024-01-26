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
export declare type ProdcutLinkFormInputValues = {
    Field0?: string;
};
export declare type ProdcutLinkFormValidationValues = {
    Field0?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProdcutLinkFormOverridesProps = {
    ProdcutLinkFormGrid?: PrimitiveOverrideProps<GridProps>;
    Field0?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProdcutLinkFormProps = React.PropsWithChildren<{
    overrides?: ProdcutLinkFormOverridesProps | undefined | null;
} & {
    onSubmit: (fields: ProdcutLinkFormInputValues) => void;
    onChange?: (fields: ProdcutLinkFormInputValues) => ProdcutLinkFormInputValues;
    onValidate?: ProdcutLinkFormValidationValues;
} & React.CSSProperties>;
export default function ProdcutLinkForm(props: ProdcutLinkFormProps): React.ReactElement;

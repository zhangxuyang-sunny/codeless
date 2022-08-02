/**
 * 设置器协议：描述如何定义设置器的数据结构，支持多种选择或输入的方式
 * 例如下拉单选，单选按钮，输入框等等
 */
declare type CommonAttrs = {
    title: string;
    description: string;
    prop: string;
    disabled: boolean;
};
/**
 * 使用枚举的方式选择
 */
export declare type UseEnum<T extends string | number> = {
    use: "select" | "radio";
    enums: Array<{
        label: string;
        value: T;
    }>;
    default: T;
};
export declare type UseSwitch = {
    use: "switch";
    default: boolean;
};
export declare type UseInputString = {
    use: "input";
    default: string;
};
export declare type UseInputNumber = {
    use: "inputNumber";
    default: number;
};
export declare type UseMulti = {
    oneOf: TypeMaterialPropOptions[];
};
export declare type PropReadonly = {
    readonly: true;
};
export declare type PropString = CommonAttrs & {
    type: "string";
} & (UseEnum<string> | UseInputString);
export declare type PropNumber = CommonAttrs & {
    type: "number";
} & (UseEnum<number> | UseInputNumber);
export declare type PropObject = CommonAttrs & {
    type: "object";
    default: object;
};
export declare type PropBoolean = CommonAttrs & {
    type: "boolean";
} & UseSwitch;
export declare type PropMulti = CommonAttrs & {
    type: "multi";
} & UseMulti;
export declare type TypeMaterialPropOptions = PropString | PropNumber | PropBoolean | PropObject | PropMulti;
export {};

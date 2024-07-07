/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type vo_ExecutionVO = {
    /**
     * 代码
     */
    code?: string;
    /**
     * 代码执行时间戳
     */
    createAt?: string;
    /**
     * id
     */
    id?: number;
    /**
     * 所有的输入用例
     */
    inputList?: Array<string>;
    /**
     * 使用的密钥对ID
     */
    keyPairId?: number;
    /**
     * 编程语言
     */
    language?: string;
    /**
     * 单个输入用例的最大内存消耗
     */
    maxMemoryCost?: number;
    /**
     * 单个输入用例的最大时间消耗
     */
    maxTimeCost?: number;
    /**
     * 所有的输入用例
     */
    outputList?: Array<string>;
    /**
     * 执行状态
     */
    status?: number;
};

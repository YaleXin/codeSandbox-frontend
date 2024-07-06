/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 用户需要提交的代码执行请求参数
 */
export type dto_ExecuteCodeRequest = {
    code?: string;
    /**
     * 运行用例组，每一个元素代表一个用例，例如 1 2\n
     */
    inputList?: Array<string>;
    language?: string;
};

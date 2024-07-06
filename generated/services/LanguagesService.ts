/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { responses_Response } from '../models/responses_Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LanguagesService {

    /**
     * 获取支持的语言列表
     * 获取支持的语言列表，只有在该列表中的语言代码才能运行
     * @returns any 成功响应
     * @throws ApiError
     */
    public static getApiV1Languages(): CancelablePromise<(responses_Response & {
data?: Array<string>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/languages',
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

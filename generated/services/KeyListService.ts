/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { responses_Response } from '../models/responses_Response';
import type { vo_KeyPairVO } from '../models/vo_KeyPairVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class KeyListService {

    /**
     * 展示用户的密钥对
     * 展示用户的密钥对
     * @returns any 成功响应
     * @throws ApiError
     */
    public static getApiV1UserKeys(): CancelablePromise<(responses_Response & {
data?: Array<vo_KeyPairVO>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/user/keys',
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

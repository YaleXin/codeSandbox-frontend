/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { responses_Response } from '../models/responses_Response';
import type { vo_KeyPairVO } from '../models/vo_KeyPairVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class NewKeyService {

    /**
     * 生成密钥对
     * 生成密钥对，用于通过程序式提交代码
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1UserNewKey(): CancelablePromise<(responses_Response & {
data?: vo_KeyPairVO;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/newKey',
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

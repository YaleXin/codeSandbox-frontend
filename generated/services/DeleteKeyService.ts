/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_DeleteKeyRequest } from '../models/dto_DeleteKeyRequest';
import type { responses_Response } from '../models/responses_Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DeleteKeyService {

    /**
     * 删除指定 id 的密钥对
     * 删除指定 id 的密钥对
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param deleteKeyRequest 删除表单
     * @returns any 成功响应
     * @throws ApiError
     */
    public static deleteApiV1UserDelKey(
token: string,
deleteKeyRequest: dto_DeleteKeyRequest,
): CancelablePromise<(responses_Response & {
data?: number;
})> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/user/delKey',
            headers: {
                'Token': token,
            },
            body: deleteKeyRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

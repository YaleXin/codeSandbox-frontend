/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_ChangePasswordRequest } from '../models/dto_ChangePasswordRequest';
import type { responses_Response } from '../models/responses_Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChangePasswordService {

    /**
     * 修改密码
     * 修改密码
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param changePasswordRequest 修改密码表单
     * @returns any 成功响应
     * @throws ApiError
     */
    public static putApiV1UserChangePwd(
token: string,
changePasswordRequest: dto_ChangePasswordRequest,
): CancelablePromise<(responses_Response & {
data?: number;
})> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/user/changePwd',
            headers: {
                'Token': token,
            },
            body: changePasswordRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

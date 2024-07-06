/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_UserRegisterRequest } from '../models/dto_UserRegisterRequest';
import type { responses_Response } from '../models/responses_Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RegisterService {

    /**
     * 用户注册
     * 提交用户名，邮箱和密码
     * @param userRegisterRequest 用户信息
     * @returns responses_Response 成功响应
     * @throws ApiError
     */
    public static postApiV1UserRegister(
userRegisterRequest: dto_UserRegisterRequest,
): CancelablePromise<responses_Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/register',
            body: userRegisterRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

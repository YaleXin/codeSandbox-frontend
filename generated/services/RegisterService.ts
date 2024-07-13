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
     * @param cptToken 验证码凭证，获取”验证码“接口后会返回该凭证
     * @param userRegisterRequest 用户信息
     * @param captcha 验证码,对应于图片中的内容
     * @returns responses_Response 成功响应
     * @throws ApiError
     */
    public static postApiV1UserRegister(
cptToken: string,
userRegisterRequest: dto_UserRegisterRequest,
captcha: string,
): CancelablePromise<responses_Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/register',
            headers: {
                'CPT-Token': cptToken,
            },
            query: {
                'captcha': captcha,
            },
            body: userRegisterRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

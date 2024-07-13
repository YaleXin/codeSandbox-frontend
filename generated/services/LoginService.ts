/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_UserLoginRequest } from '../models/dto_UserLoginRequest';
import type { responses_Response } from '../models/responses_Response';
import type { vo_UserVO } from '../models/vo_UserVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LoginService {

    /**
     * 用户登录
     * 提交用户名和密码
     * @param userLoginRequest 登录表单
     * @param cptToken 验证码凭证，获取”验证码“接口后会返回该凭证
     * @param captcha 验证码,对应于图片中的内容
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1UserLogin(
userLoginRequest: dto_UserLoginRequest,
cptToken: string,
captcha: string,
): CancelablePromise<(responses_Response & {
data?: vo_UserVO;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/login',
            headers: {
                'CPT-Token': cptToken,
            },
            query: {
                'captcha': captcha,
            },
            body: userLoginRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

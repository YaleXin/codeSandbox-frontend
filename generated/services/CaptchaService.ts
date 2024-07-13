/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { responses_Response } from '../models/responses_Response';
import type { vo_CaptchaVO } from '../models/vo_CaptchaVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CaptchaService {

    /**
     * 生成验证码
     * 生成验证码，需要用验证码的地方有登录和注册
     * @returns any 成功响应
     * @throws ApiError
     */
    public static getApiV1Captcha(): CancelablePromise<(responses_Response & {
data?: vo_CaptchaVO;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/captcha',
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

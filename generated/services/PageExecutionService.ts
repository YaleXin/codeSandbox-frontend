/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_PageExecutionRequest } from '../models/dto_PageExecutionRequest';
import type { responses_Response } from '../models/responses_Response';
import type { vo_ExecutionVO } from '../models/vo_ExecutionVO';
import type { vo_PageDataVO } from '../models/vo_PageDataVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PageExecutionService {

    /**
     * 获取用户的代码执行记录
     * 获取用户的代码执行记录
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 分页信息
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1UserExecution(
token: string,
pageExecutionRequest: dto_PageExecutionRequest,
): CancelablePromise<(responses_Response & {
data?: Array<(vo_PageDataVO & {
data?: Array<vo_ExecutionVO>;
})>;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/user/execution',
            headers: {
                'Token': token,
            },
            body: pageExecutionRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

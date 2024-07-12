/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_ExecuteCodeRequest } from '../models/dto_ExecuteCodeRequest';
import type { dto_ExecuteCodeResponse } from '../models/dto_ExecuteCodeResponse';
import type { responses_Response } from '../models/responses_Response';
import type { vo_ExecuteMessageVO } from '../models/vo_ExecuteMessageVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CodeExecutionService {

    /**
     * 执行代码
     * 根据用户提交的代码和语言执行代码并返回结果
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param executeCodeRequest 执行代码请求
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1ExecuteCode(
token: string,
executeCodeRequest: dto_ExecuteCodeRequest,
): CancelablePromise<(responses_Response & {
data?: (dto_ExecuteCodeResponse & {
executeMessages?: Array<vo_ExecuteMessageVO>;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/executeCode',
            headers: {
                'Token': token,
            },
            body: executeCodeRequest,
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

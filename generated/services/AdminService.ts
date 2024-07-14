/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { dto_PageExecutionRequest } from '../models/dto_PageExecutionRequest';
import type { dto_UserIdRequest } from '../models/dto_UserIdRequest';
import type { responses_Response } from '../models/responses_Response';
import type { vo_AdminExecutionVO } from '../models/vo_AdminExecutionVO';
import type { vo_PageDataVO } from '../models/vo_PageDataVO';
import type { vo_UserDetailVO } from '../models/vo_UserDetailVO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AdminService {

    /**
     * 审核通过用户
     * 审核通过用户
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 用户id表单
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1AdminAuditUser(
token: string,
pageExecutionRequest: dto_UserIdRequest,
): CancelablePromise<(responses_Response & {
data?: boolean;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/auditUser',
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

    /**
     * 审核禁用用户
     * 审核禁用用户
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 用户id表单
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1AdminBanUser(
token: string,
pageExecutionRequest: dto_UserIdRequest,
): CancelablePromise<(responses_Response & {
data?: boolean;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/banUser',
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

    /**
     * 审核从禁用状态中恢复用户
     * 审核从禁用状态中恢复用户
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 用户id表单
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1AdminCancelBanUser(
token: string,
pageExecutionRequest: dto_UserIdRequest,
): CancelablePromise<(responses_Response & {
data?: boolean;
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/cancelBanUser',
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

    /**
     * 获取用户的代码执行记录
     * 获取用户的代码执行记录
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 分页信息
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1AdminExecution(
token: string,
pageExecutionRequest: dto_PageExecutionRequest,
): CancelablePromise<(responses_Response & {
data?: (vo_PageDataVO & {
data?: Array<vo_AdminExecutionVO>;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/execution',
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

    /**
     * 获取用户列表
     * 获取用户列表
     * @param token 登录凭证，登录成功后会返回该凭证
     * @param pageExecutionRequest 分页信息
     * @returns any 成功响应
     * @throws ApiError
     */
    public static postApiV1AdminUser(
token: string,
pageExecutionRequest: dto_PageExecutionRequest,
): CancelablePromise<(responses_Response & {
data?: (vo_PageDataVO & {
data?: Array<vo_UserDetailVO>;
});
})> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/admin/user',
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

/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { responses_Response } from '../models/responses_Response';
import type { vo_QuestionAndAnswer } from '../models/vo_QuestionAndAnswer';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionAndAnswerService {

    /**
     * 获取问答列表
     * 获取问答列表
     * @returns any 成功响应
     * @throws ApiError
     */
    public static getApiV1Qas(): CancelablePromise<(responses_Response & {
data?: Array<vo_QuestionAndAnswer>;
})> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/qas',
            errors: {
                400: `错误响应`,
                500: `系统内部错误`,
            },
        });
    }

}

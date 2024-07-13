/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type vo_UserVO = {
    /**
     * 是否已通过审核
     */
    audit?: boolean;
    id?: number;
    /**
     * 权限 1:管理员 10: 普通用户
     */
    role?: number;
    /**
     * 登陆凭证
     */
    token?: string;
    /**
     * 用户名
     */
    username?: string;
};

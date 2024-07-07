/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type vo_UserDetailVO = {
    /**
     * 注册时间
     */
    createAt?: string;
    /**
     * 每月已用额度
     */
    currentUsage?: number;
    /**
     * 邮箱
     */
    email?: string;
    id?: number;
    /**
     * 每月限额
     */
    monthLimit?: number;
    /**
     * 权限 0管理员 1 普通用户
     */
    role?: number;
    /**
     * 用户名
     */
    username?: string;
};

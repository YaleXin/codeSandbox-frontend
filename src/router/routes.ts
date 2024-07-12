import { RouteRecordRaw } from "vue-router";
import UserInfo from "@/components/user/UserInfo.vue"
import UserExecution from "@/components/user/UserExecution.vue"
import UserKey from "@/components/user/UserKey.vue"
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserIndexView from "@/views/user/UserIndexView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue"
import NotFoundView from "@/views/404.vue"

import AdminIndexView from "@/views/admin/AdminIndexView.vue"
import AdminUsers from "@/components/admin/AdminUsers.vue"

import IndexView from "@/views/IndexView.vue";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "首页",
    component: IndexView,
  },
  {
    path: "/user",
    name: "用户首页",
    component: UserIndexView,
    children: [
      {
        path: "/user/",
        redirect: "/user/info"
      },
      {
        path: "/user/info",
        name: "用户信息",
        component: UserInfo,
      },
      {
        path: "/user/execution",
        name: "执行记录",
        component: UserExecution,
      },
      {
        path: "/user/key",
        name: "程序调用key",
        component: UserKey,
      }
    ],
    meta: {
      role: ACCESS_ENUM.NORMAL_USER_ROLE,
    }
  },
  {
    path: "/user/login",
    name: "用户登录",
    component: UserLoginView,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: "/user/register",
    name: "用户注册",
    component: UserRegisterView,
    meta: {
      hideInMenu: true
    }
  },

  {
    path: "/admin",
    name: "管理员首页",
    component: AdminIndexView,
    children: [
      {
        path: "/admin/",
        redirect: "/admin/users"
      },
      {
        path: "/admin/users",
        name: "用户列表",
        component: AdminUsers,
      },
    ],
    meta: {
      role: ACCESS_ENUM.ADMIN_USER_ROLE,
      hideInMenu: true,
    }
  },

  {
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  }

];

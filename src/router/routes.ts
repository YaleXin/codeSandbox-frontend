import { RouteRecordRaw } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
    meta: {
      hideInMenu: true,
    }
  },
  {
    path: "/index",
    name: "首页",
    component: () => import("@/views/IndexView.vue"),
  },
  {
    path: "/qa",
    name: "Q&A",
    component: () => import("@/views/QuestionAndAnswer.vue"),
  },
  {
    path: "/user",
    name: "用户首页",
    component: () => import("@/views/user/UserIndexView.vue"),
    children: [
      {
        path: "/user/",
        redirect: "/user/info"
      },
      {
        path: "/user/info",
        name: "用户信息",
        component: () => import("@/components/user/UserInfo.vue"),
      },
      {
        path: "/user/execution",
        name: "执行记录",
        component: () => import("@/components/user/UserExecution.vue"),
      },
      {
        path: "/user/key",
        name: "程序调用key",
        component: () => import("@/components/user/UserKey.vue"),
      }
    ],
    meta: {
      role: ACCESS_ENUM.NORMAL_USER_ROLE,
    }
  },
  {
    path: "/user/login",
    name: "用户登录",
    component: () => import("@/views/user/UserLoginView.vue"),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: "/user/register",
    name: "用户注册",
    component: () => import("@/views/user/UserRegisterView.vue"),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: "/admin",
    name: "管理员首页",
    component: () => import("@/views/admin/AdminIndexView.vue"),
    children: [
      {
        path: "/admin/",
        redirect: "/admin/users"
      },
      {
        path: "/admin/users",
        name: "用户列表",
        component: () => import("@/components/admin/AdminUsers.vue"),
      },
      {
        path: "/admin/executions",
        name: "用户执行记录",
        component: () => import("@/components/admin/AdminExecutions.vue"),
      },
    ],
    meta: {
      role: ACCESS_ENUM.ADMIN_USER_ROLE,
      hideInMenu: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import("@/views/404.vue"),
    meta: {
      hideInMenu: true,
    }
  }
];
import { RouteRecordRaw } from "vue-router";
import UserInfo from "@/components/UserInfo.vue"
import UserExecution from "@/components/UserExecution.vue"
import UserKey from "@/components/UserKey.vue"
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserIndexView from "@/views/user/UserIndexView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue"
import NotFoundView from "@/views/404.vue"

import IndexView from "@/views/IndexView.vue";

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
    ]
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
    path: '/:pathMatch(.*)*',
    component: NotFoundView,
  }

];

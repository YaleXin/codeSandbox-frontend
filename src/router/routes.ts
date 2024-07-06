import { RouteRecordRaw } from "vue-router";
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
    path: "/user/index",
    name: "用户首页",
    component: UserIndexView,

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

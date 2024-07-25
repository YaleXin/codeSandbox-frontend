<template>
  <a-row
    id="globalHeader"
    style="margin-bottom: 16px"
    align="center"
    :wrap="false"
  >
    <a-col  flex="auto">
      <a-menu
        :auto-scroll-into-view="true"
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" />
            <div class="title">CodeSandbox</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          <template #icon>
            <icon-home v-if="item.name == '首页'" />
            <icon-user v-else-if="item.name == '用户首页'" />
            <icon-bulb v-else-if="item.name == 'Q&A'" />
          </template>
          {{ item.name }}
        </a-menu-item>
        <!-- <a-menu-item key="/index">index</a-menu-item>
        <a-menu-item key="/user/info">info</a-menu-item> -->
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div v-if="store.getters['user/getUser']?.id > 0">
        <a-popover title="">
          <a-button>{{ store.getters["user/getUser"]?.username }}</a-button>
          <template #content>
            <a-button status="danger" @click="logoutClick">注销</a-button>
          </template>
        </a-popover>
      </div>
      <div v-else>
        <a-popover title="">
          <a-button>未登录</a-button>
          <template #content>
            <a-space>
              <a-button type="primary" @click="loginClick">登录</a-button>
              <a-button type="primary" status="warning" @click="registerClick">注册</a-button>
            </a-space>

            {{ store.getters["user/getUser"].username }}
          </template>
        </a-popover>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "../router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { IconUser, IconHome,IconBulb } from "@arco-design/web-vue/es/icon";
import { UserControllerService } from "../../generated/user";

const loginClick = async () => {
  router.push({
    path: "/user/login",
    replace: false,
  });
};

const registerClick = async () => {
  router.push({
    path: "/user/register",
    replace: false,
  });
};

const logoutClick = async () => {
  // 注销成功,跳转到主页
  store
    .dispatch("user/clearLoginUser")
    .then((res) => {
      router.push({
        path: "/",
        replace: true, //不会占用浏览器历史页面的堆栈,直接替换当前的登录页
      });
    })
    .catch((e) => {
    });
};
const router = useRouter();
const store = useStore();

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  const currentUserRole = store.getters["user/getUser"]?.role;
  return routes.filter((item, index) => {
    // 如果指明了要隐藏，则不显示
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 如果指明了权限
    if (item.meta?.role) {
      // 权限值越小，权限越大
      return currentUserRole <= item.meta?.role;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后,更新选中的菜单项
router.afterEach((to, from, failure) => {
  // console.log('to.path=',to.path);
  const parts = to.path.split("/");
  if (parts.length >= 1) {
    selectedKeys.value = ["/" + parts[1]];
  } else {
    selectedKeys.value = [to.path];
  }
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>

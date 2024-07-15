<template>
  <a-row>
    <a-col :span="4">
      <a-menu :selected-keys="selectedKeys" @menu-item-click="memuClk">
        <a-menu-item key="/user/info">
          <template #icon><icon-user /></template>
          信息
        </a-menu-item>
        <a-menu-item key="/user/execution">
          <template #icon><icon-list /></template>
          执行记录
        </a-menu-item>
        <a-menu-item key="/user/key">
          <template #icon><icon-tool /></template>
          API key
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col :span="20">
      <router-view />
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import message from "@arco-design/web-vue/es/message";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { IconUser, IconList, IconTool } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const selectedKeys = ref([""]);
const memuClk = (key) => {
  router.push({
    path: key,
  });
};
const routesPath = ["/user/info", "/user/key", "/user/execution"];
// 路由跳转后,更新选中的菜单项
router.afterEach((to, from, failure) => {
  const curPath = to.path;
  for (let item of routesPath) {
    if (curPath.includes(item)) {
      selectedKeys.value = [item];
      return;
    }
  }
  selectedKeys.value = ["/user/info"];
});
const updateMenu = () => {
  const route = useRoute();
  selectedKeys.value = [route.path];
};
onMounted(() => {
  updateMenu();
});
</script>

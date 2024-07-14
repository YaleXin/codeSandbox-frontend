<template>
  <a-row>
    <a-col :span="4">
      <a-menu
        :default-selected-keys="['/admin/users']"
        @menu-item-click="memuClk"
      >
        <a-menu-item key="/admin/users">
          <template #icon><icon-user /></template>
          用户
        </a-menu-item>
        <a-menu-item key="/admin/executions">
          <template #icon><icon-list /></template>
          执行记录
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
import { useRouter } from "vue-router";
import { IconUser,IconList,IconTool } from "@arco-design/web-vue/es/icon";

const router = useRouter();

const memuClk = (key) => {
  router.push({
    path: key,
  });
};
</script>

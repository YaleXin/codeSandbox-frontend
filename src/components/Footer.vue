<template>
  <div>
    <a-row justify="center">
      <icon-common :size="20" />
      代码沙箱
      <icon-common :size="20" />
    </a-row>
    <a-row justify="center">
      <a-link  href="//beian.miit.gov.cn" target="_blank">
      <template #icon>
        <icon-stamp />
      </template>
      桂ICP备20003049号-1
    </a-link>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { IconCommon,IconStamp } from "@arco-design/web-vue/es/icon";
</script>

<style>
</style>
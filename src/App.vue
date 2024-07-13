<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { jwtDecode } from "jwt-decode";

const route = useRoute();
const store = useStore();
/**
 * 全局初始化函数,有全局单次调用的代码,都可以写到这里
 */
const doInit = () => {
  const token = store.getters["user/getUser"].token;
  if (token != "") {
    const jwtObj = jwtDecode<JwtPayload>(token);
    // jwtObj 中的时间变量是秒为单位
    const nowTime = new Date();
    const timestamp = parseInt(nowTime.getTime() / 1000);
    // 如果过期了，则清除用户数据
    if (timestamp > jwtObj.exp) {
      store.dispatch("user/clearLoginUser");
    }
  }
};

onMounted(() => {
  doInit();
});
</script>

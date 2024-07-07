<template>
  <div>
    <a-card :style="{ width: '40%' }" title="个人信息" hoverable>
      <template #extra>
        <a-link>修改密码</a-link>
      </template>
      <a-row >
        <a-col :span="8">邮箱</a-col>
        <a-col :span="16">{{ info.email }}</a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">用户名</a-col>
        <a-col :span="16">{{ info.username }}</a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">身份</a-col>
        <a-col :span="16">{{ info.role }}</a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">注册时间</a-col>
        <a-col :span="16">{{ info.createAt }}</a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">每月额度</a-col>
        <a-col :span="16">{{ info.monthLimit }}</a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">当月已用</a-col>
        <a-col :span="16">{{ info.currentUsage }}</a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { UserInfoService, vo_UserDetailVO } from "../../generated";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

const store = useStore();
const router = useRouter();

const info = ref<vo_UserDetailVO>({
  createAt: "",
  currentUsage: 0,
  email: "",
  id: 0,
  monthLimit: 0,
  role: 0,
  username: "",
});
onMounted(() => {
  loadData();
});
const loadData = async () => {
  if (store.getters["user/getUser"]?.id == 0) {
    // 未登录
    message.error("未登录，即将跳转登录页面");
    setTimeout(() => {
      router.push({
        path: "/user/login",
        replace: false,
      });
    }, 500);
  } else {
    UserInfoService.getApiV1UserInfo(store.state.user.loginUser.token)
      .then((res) => {
        if (res.code != 200) {
          message.error("获取失败:" + res.msg);
          setTimeout(() => {
            router.push({
              path: "/user/login",
              replace: false,
            });
          }, 500);
        } else {
          info.value = res.data;
        }
      })
      .catch((e) => {
        message.error("获取失败:" + e);
      });
  }
};
</script>

<style>
</style>
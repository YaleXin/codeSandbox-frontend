<template>
  <div class="userLoginView">
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="username" label="账号">
        <a-input v-model="form.username" placeholder="请输入账号" >
          <template #prefix>
            <icon-user :size="20" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" >
          <template #prefix>
            <icon-lock :size="20" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { dto_UserLoginRequest, LoginService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IconUser,  IconLock } from "@arco-design/web-vue/es/icon";

/**
 * 表单信息
 */
const form = ref<dto_UserLoginRequest>({
  password: "",
  username: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  let res = await LoginService.postApiV1UserLogin(form.value);
  console.log("login res = ", res);
  if (res.code == 200) {
    message.success("登录成功");
    // 登录成功, 保存到 vuex 并跳转
    store
      .dispatch("user/saveLoginUser", res.data)
      .then((ans) => {
        router.push({
          path: "/",
          replace: true, //不会占用浏览器历史页面的堆栈,直接替换当前的登录页
        });
      })
      .catch((e) => {
        message.error("保存用户到本地失败，错误原因：" + e);
      });
  } else {
    message.error("登录失败，" + res.msg);
  }
};
</script>

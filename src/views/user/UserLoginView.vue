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
        <a-input v-model="form.username" placeholder="请输入账号">
          <template #prefix>
            <icon-user :size="20" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item field="password" tooltip="密码不少于 8 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码">
          <template #prefix>
            <icon-lock :size="20" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item tooltip="点击图片可更换" label="验证码">
        <a-input placeholder="请输入验证码" allow-clear v-model="captchaInput">
          <template #prefix>
            <icon-user :size="20" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-image
          :src="captchaImageData"
          :preview="false"
          @click="loadCaptcha"
        />
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
import { reactive, ref, onMounted } from "vue";
import {
  dto_UserLoginRequest,
  LoginService,
  CaptchaService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";

/**
 * 表单信息
 */
const form = ref<dto_UserLoginRequest>({
  password: "",
  username: "",
} as UserLoginRequest);
const captchaImageData = ref<string>("data:image/jpeg;base64,");
const captchaToken = ref<string>("");
const captchaInput = ref<string>("");

const router = useRouter();
const store = useStore();
const checkForm = () => {
  if (form.value.username == "") {
    message.error("请输入用户名");
    return false;
  }
  if (form.value.password == "") {
    message.error("请输入密码");
    return false;
  }
  if (captchaInput.value == "") {
    message.error("请输入验证码");
    return false;
  }
  return true;
};
/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  if (!checkForm()) {
    return;
  }
  let res = await LoginService.postApiV1UserLogin(
    form.value,
    captchaToken.value,
    captchaInput.value
  );

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
const loadCaptcha = () => {
  CaptchaService.getApiV1Captcha()
    .then((res) => {
      if (res.code == 200) {
        captchaImageData.value =
          "data:image/jpeg;base64," + res.data.imageBase64;
        captchaToken.value = res.data.token;
      } else {
        message.error("获取验证码失败：" + res.msg + "，请刷新页面");
      }
    })
    .catch((e) => {
      message.error("获取验证码失败：" + e + "，请刷新页面");
    });
};
onMounted(() => {
  loadCaptcha();
});
</script>

<template>
  <div class="userRegisterView">
    <a-form
      style="max-width: 480px; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="email" label="邮箱">
        <a-input v-model="form.email" placeholder="请输入邮箱">
          <template #prefix>
            <icon-email :size="20" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item field="username" label="账号">
        <a-input v-model="form.username" placeholder="请输入账号">
          <template #prefix>
            <icon-user :size="20" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item
        field="password"
        tooltip="密码不少于 8 位不多于 16 位且必须包含小写字母、大写字母和数字"
        label="密码"
      >
        <a-input-password v-model="form.password" placeholder="请输入密码">
          <template #prefix>
            <icon-lock :size="20" />
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item
        field="checkPassword"
        tooltip="两次输入的密码要一致"
        label="重复"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        >
          <template #prefix>
            <icon-lock :size="20" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item tooltip="点击图片可更换" label="验证码">
        <a-input placeholder="请输入验证码" allow-clear v-model="captchaInput">
          <template #prefix>
            <icon-bulb :size="20" />
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
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, ref } from "vue";
import {
  RegisterService,
  dto_UserRegisterRequest,
  CaptchaService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  IconUser,
  IconEmail,
  IconLock,
  IconBulb,
} from "@arco-design/web-vue/es/icon";

/**
 * 表单信息
 */
const form = reactive({
  username: "",
  email: "",
  password: "",
  checkPassword: "",
} as dto_UserRegisterRequest);

const router = useRouter();

const captchaImageData = ref<string>("data:image/jpeg;base64,");
const captchaToken = ref<string>("");
const captchaInput = ref<string>("");

const checkForm = () => {
  if (form.password != form.checkPassword) {
    message.error("密码不一致");
    return false;
  }
  if (form.password?.length < 8 || form.password?.length > 16) {
    message.error("密码长度必须在8~16位之内");
    return false;
  }
  const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!pwdReg.test(form.password)) {
    message.error("密码错误，必须包含小写字母、大写字母和数字");
    return false;
  }

  const emailReg = /^([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})+$/;
  if (!emailReg.test(form.email)) {
    message.error("邮箱格式错误");
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
  RegisterService.postApiV1UserRegister(
    captchaToken.value,
    {
      username: form.username,
      email: form.email,
      password: form.password,
    },
    captchaInput.value
  )
    .then((res) => {
      if (res.code == 200) {
        message.success("注册成功，等待管理员审核后即可使用");
        setTimeout(() => {
          // 注册成功,跳转到主页
          router.push({
            path: "/",
            replace: true,
          });
        }, 1000);
      } else if (res.code == 42900) {
        message.info("请求过快，请稍后再试");
      } else {
        message.error("注册失败，" + res.msg);
      }
    })
    .catch((e) => {});
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

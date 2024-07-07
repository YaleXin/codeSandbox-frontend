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

      <a-form-item field="password" tooltip="密码不少于 8 位不多于 16 位且必须包含小写字母、大写字母和数字" label="密码">
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

      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >注册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { RegisterService, dto_UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { IconUser, IconEmail, IconLock } from "@arco-design/web-vue/es/icon";

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

const checkForm = () => {
  if (form.password != form.checkPassword) {
    message.error("密码不一致");
    return false;
  }
  if (form.password?.length < 8 || form.password?.length > 16) {
    message.error("密码长度必须在8~16位之内");
    return false;
  }
  const pwdReg =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if(!pwdReg.test(form.password)){
    message.error("密码错误，必须包含小写字母、大写字母和数字");
    return false;
  }
  
  const emailReg =
    /^([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})+$/;
  if (!emailReg.test(form.email)) {
    message.error("邮箱格式错误");
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
  let res = await RegisterService.postApiV1UserRegister({
    username: form.username,
    email: form.email,
    password: form.password,
  });
  if (res.code == 200) {
    message.success("注册成功，等待管理员审核后即可使用");
    setTimeout(() => {
      // 注册成功,跳转到主页
      router.push({
        path: "/",
        replace: true,
      });
    }, 1000);
  } else {
    message.error("注册失败，" + res.msg);
  }
};
</script>

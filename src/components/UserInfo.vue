<template>
  <div>
    <a-card :style="{ width: '40%' }" title="个人信息" hoverable>
      <template #extra>
        <a-link @click="changePwdVisible = true">修改密码</a-link>
      </template>
      <a-modal v-model:visible="changePwdVisible" width="50%">
        <template #title>修改密码</template>
        <a-form
          style="max-width: 480px; margin: 0 auto"
          label-align="left"
          auto-label-width
          :model="form"
          @submit="handleSubmit"
        >
          <a-form-item field="password" tooltip="当前密码" label="旧密码">
            <a-input-password
              v-model="form.oldPassword"
              placeholder="请输入密码"
            >
              <template #prefix>
                <icon-lock :size="20" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item
            field="password"
            tooltip="密码不少于 8 位不多于 16 位且必须包含小写字母、大写字母和数字"
            label="新密码"
          >
            <a-input-password
              v-model="form.newPassword"
              placeholder="请输入密码"
            >
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
              >修改</a-button
            >
          </a-form-item>
        </a-form>
      </a-modal>

      <a-row>
        <a-col :span="8">邮箱</a-col>
        <a-col :span="16">{{ info.email }}</a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">用户名</a-col>
        <a-col :span="16">{{ info.username }}</a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">身份</a-col>
        <a-col :span="16">{{ info.role }}</a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">注册时间</a-col>
        <a-col :span="16">{{ info.createAt }}</a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">每月额度</a-col>
        <a-col :span="16">{{ info.monthLimit }}</a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="8">当月已用</a-col>
        <a-col :span="16">{{ info.currentUsage }}</a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {
  UserInfoService,
  vo_UserDetailVO,
  ChangePasswordService,
} from "../../generated";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { IconLock } from "@arco-design/web-vue/es/icon";

const changePwdVisible = ref(false);

const store = useStore();
const router = useRouter();

/**
 * 表单信息
 */
const form = ref({
  oldPassword: "",
  newPassword: "",
  checkPassword: "",
});

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

const checkForm = () => {
  if (form.value.newPassword != form.value.checkPassword) {
    message.error("密码不一致");
    return false;
  }
  if (
    form.value.newPassword?.length < 8 ||
    form.value.newPassword?.length > 16
  ) {
    message.error("密码长度必须在8~16位之内");
    return false;
  }
  const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
  if (!pwdReg.test(form.value.newPassword)) {
    message.error("密码错误，必须包含小写字母、大写字母和数字");
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
  console.log("form=",form);
  ChangePasswordService.putApiV1UserChangePwd(
    store.state.user.loginUser.token,
    {
      oldPassword: form.value.oldPassword,
      newPassword: form.value.newPassword,
    }
  )
    .then((res) => {
      if (res.code == 200) {
        message.success("修改成功");
        // 删除本地数据，并跳转 登录页面
        store
          .dispatch("user/clearLoginUser")
          .then((ans) => {
            router.push({
              path: "/user/login",
              replace: true, //不会占用浏览器历史页面的堆栈,直接替换当前的登录页
            });
          })
          .catch((e) => {
            console.log("保存用户到本地失败，错误原因：" + e);
          });
      } else {
        message.error("修改失败：" + res.msg);
      }
    })
    .catch((e) => {
      console.log("putApiV1UserChangePwd fail:" + e);
    });
};
</script>

<style>
</style>
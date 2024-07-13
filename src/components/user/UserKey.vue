<template>
  <a-table
    :stripe="true"
    :loading="dataLoading"
    :columns="columns"
    :data="data"
    :pagination="false"
    :page-position="bottom"
  >
    <template #accessOptional="{ record, rowIndex }">
      <a-button
        type="outline"
        shape="round"
        @click="accessListShow[rowIndex] = true"
        >查看</a-button
      >
      <a-modal v-model:visible="accessListShow[rowIndex]" width="70%">
        <template #title>AccessKey-用于程序式调用</template>
        <a-row justify="center">
          <a-col :span="24">
            {{ record.accessKey }}
          </a-col>
        </a-row>
      </a-modal>
    </template>

    <template #secretOptional="{ record, rowIndex }">
      <a-button
        type="outline"
        shape="round"
        status="danger"
        @click="secretListShow[rowIndex] = true"
        >查看</a-button
      >
      <a-modal v-model:visible="secretListShow[rowIndex]" width="70%">
        <template #title>SecretKey-用于程序式调用</template>
        <a-row justify="center">
          <a-col :span="24">
            {{ record.secretKey }}
          </a-col>
        </a-row>
      </a-modal>
    </template>
    <template #operateOptional="{ rowIndex, record }">
      <a-button
        type="primary"
        status="danger"
        @click="delBtnClk(rowIndex, record.id)"
        >删除</a-button
      >
    </template>
  </a-table>
  <a-divider />
  <a-tooltip :content="tooltipContent">
    <a-button
      type="primary"
      @click="addBtnClk"
      :disabled="data?.length >= MAX_KEY_LEN || addBtnAntiShake"
    >
      <template #icon>
        <icon-plus />
      </template>
      <template #default>新增</template>
    </a-button>
  </a-tooltip>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  KeyListService,
  NewKeyService,
  DeleteKeyService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { IconPlus } from "@arco-design/web-vue/es/icon";
import { Modal } from "@arco-design/web-vue";

const store = useStore();
const router = useRouter();

const dataLoading = ref<boolean>(true);

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "AccessKey",
    slotName: "accessOptional",
  },
  {
    title: "SecretKey",
    slotName: "secretOptional",
  },
  {
    title: "创建时间",
    dataIndex: "createdAt",
  },
  {
    title: "操作",
    slotName: "operateOptional",
  },
];
const MAX_KEY_LEN: number = 5;
const tooltipContent = ref("最多同时持有" + MAX_KEY_LEN + "对Key");
// 表格数据
const data = ref([]);

// 控制 secret key 是否显示
const secretListShow = ref([]);

// 控制 public key 是否显示
const accessListShow = ref([]);

// 防抖控制
const addBtnAntiShake = ref(false);

const goLogin = () => {
  setTimeout(() => {
    router.push({
      path: "/user/login",
      replace: false,
    });
  }, 500);
};
const loadCurrentData = () => {
  // 开启加载遮罩
  dataLoading.value = true;
  if (store.getters["user/getUser"]?.id == 0) {
    // 未登录
    message.error("未登录，即将跳转登录页面");
    goLogin();
  } else {
    KeyListService.getApiV1UserKeys(store.state.user.loginUser.token)
      .then((res) => {
        if (res.code != 200) {
          message.error("获取失败:" + res.msg);
          goLogin();
        } else {
          console.log("res data = ", res);
          data.value = res.data;
          secretListShow.value = new Array(data.value.length).fill(false);
          accessListShow.value = new Array(data.value.length).fill(false);
        }
        // 关闭加载遮罩
        dataLoading.value = false;
      })
      .catch((e) => {
        message.error("获取失败:" + e);
        // 关闭加载遮罩
        dataLoading.value = false;
      });
  }
};
// 添加按钮回调
const addBtnClk = () => {
  // 防抖开启
  addBtnAntiShake.value = true;
  NewKeyService.postApiV1UserNewKey(store.state.user.loginUser.token)
    .then((res) => {
      if (res.code == 200) {
        message.success("增加成功！");
        data.value.push(res.data);
        secretListShow.value.push(false);
        accessListShow.value.push(false);
        // 防抖结束
        addBtnAntiShake.value = false;
      } else {
        message.error("增加失败：" + res.msg);
      }
    })
    .catch((e) => {
      message.error("增加失败！，原因：" + e);
    });
};
// 删除按钮回调
const delBtnClk = (rowIndx: number, keyId: number) => {
  Modal.confirm({
    title: "警告",
    content:
      "你确定要删除这个输入 key 吗，后续将无法通过该 key 进行程序式调用？",
    onOk: () => {
      console.log("removeBtnClk, rowIndx=", rowIndx, ", keyId = ", keyId);
      DeleteKeyService.deleteApiV1UserDelKey(store.state.user.loginUser.token, {
        id: keyId,
      })
        .then((res) => {
          if (res.code == 200) {
            data.value.splice(rowIndx, 1);
            message.success("删除成功");
          } else {
            message.error("删除失败：" + res.msg);
            goLogin();
          }
        })
        .catch((e) => {
          message.error("删除失败：" + e);
          goLogin();
        });
    },
    onCancel: () => {},
  });
};

onMounted(() => {
  loadCurrentData();
});
</script>

<style>
</style>
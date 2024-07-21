<template>
  <a-table
    :stripe="true"
    :loading="dataLoading"
    :columns="columns"
    :data="data"
    :pagination="paginationConfig"
    page-position="bottom"
  >
    <!-- 角色要自定义展示 -->
    <template #roleOptional="{ record }">
      <a-tag
        :color="record.role == ACCESS_ENUM.ADMIN_USER_ROLE ? 'red' : 'blue'"
      >
        {{ record.role == ACCESS_ENUM.ADMIN_USER_ROLE ? "管理员" : "普通用户" }}
      </a-tag>
    </template>
    <!-- 审核状态要自定义展示 -->
    <template #auditOptional="{ record, rowIndex }">
      <a-tag v-if="record.audit" color="green"> 已审核 </a-tag>
      <a-button
        v-else
        type="outline"
        @click="auditBtnClk(record.id, rowIndex)"
        status="success"
        >点击审核</a-button
      >
    </template>
    <!-- 禁用状态要自定义展示 -->
    <template #banOptional="{ record, rowIndex }">
      <a-button
        v-if="record.ban"
        @click="cancelBanBtnClk(record.id, rowIndex)"
        type="outline"
        status="success"
        >点击恢复</a-button
      >
      <a-button
        v-else
        @click="banBtnClk(record.id, rowIndex)"
        status="danger"
        type="primary"
        >点击禁用</a-button
      >
    </template>
  </a-table>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import { ref, onMounted } from "vue";
import message from "@arco-design/web-vue/es/message";
import { dto_PageExecutionRequest, AdminService,vo_UserDetailVO } from "../../../generated";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ACCESS_ENUM from "@/access/accessEnum";
const store = useStore();
const router = useRouter();

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "用户名",
    dataIndex: "username",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "角色",
    slotName: "roleOptional",
  },
  {
    title: "当月额度",
    dataIndex: "monthLimit",
  },
  {
    title: "当月已用",
    dataIndex: "currentUsage",
  },
  {
    title: "注册时间",
    dataIndex: "createAt",
  },
  {
    title: "审核状态",
    slotName: "auditOptional",
  },
  {
    title: "禁用状态",
    slotName: "banOptional",
  },
];
// 表格数据
const data = ref<vo_UserDetailVO[]>([]);
// 控制代码是否显示
const codeListShow =  ref<boolean[]>([]);
// 控制输入用例是否显示
const inputListShow =  ref<boolean[]>([]);
// 控制输出用例是否显示
const outputListShow =  ref<boolean[]>([]);
const handlePageChange = (pageNo:number, pageSize:number) => {
  paginationConfig.value.current = pageNo;
  loadCurrentData();
};
const handlePageSizeChange = (pageSize:number) => {
  paginationConfig.value.pageSize = pageSize;
  loadCurrentData();
};

const dataLoading = ref<boolean>(true);
// 分页配置
const paginationConfig = ref({
  pageSize: 5, // 每页显示的条数
  showSizeChanger: true, // 是否可以改变每页显示的条数
  showQuickJumper: true, // 是否可以快速跳转到指定页
  showTotal: true, // 显示总条数和当前数据范围
  current: 1, // 当前页数
  total: 0, // 总条数
  onChange: handlePageChange, // 页码改变时的回调函数
  onPageSizeChange: handlePageSizeChange, // 页码大小改变时的回调函数
  showJumper: true, // 支持跳转指定页数
  showPageSize: true, // 支持每页大小更改
  pageSizeOptions: [5, 10, 20, 50],
  autoAdjust: true,
});
const loadCurrentData = () => {
  // 开启加载遮罩
  dataLoading.value = true;
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
    AdminService.postApiV1AdminUser(store.state.user.loginUser.token, {
      pageNum: paginationConfig.value.current,
      pageSize: paginationConfig.value.pageSize,
    })
      .then((res) => {
        if (res.code != 200) {
          message.error("获取失败:" + res.msg);
        } else {
          data.value = res.data.data;
          paginationConfig.value.total = res.data.total;
          codeListShow.value = new Array(data.value.length).fill(false);
          inputListShow.value = new Array(data.value.length).fill(false);
          outputListShow.value = new Array(data.value.length).fill(false);
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
const auditBtnClk = (userId: number, rowIndex: number) => {
  AdminService.postApiV1AdminAuditUser(store.state.user.loginUser.token, {
    userId: userId,
  })
    .then((res) => {
      if (res.code == 200 && res.data) {
        message.success("审核成功!");
        data.value[rowIndex].audit = true;
      } else {
        message.error("审核失败：" + res.msg);
      }
    })
    .catch((e) => {
      message.error("审核失败：" + e);
    });
};

const banBtnClk = (userId: number, rowIndex: number) => {
  AdminService.postApiV1AdminBanUser(store.state.user.loginUser.token, {
    userId: userId,
  })
    .then((res) => {
      if (res.code == 200 && res.data) {
        message.success("禁用成功!");
        data.value[rowIndex].ban = true;
      } else {
        message.error("禁用失败：" + res.msg);
      }
    })
    .catch((e) => {
      message.error("禁用失败：" + e);
    });
};

const cancelBanBtnClk = (userId: number, rowIndex: number) => {
  AdminService.postApiV1AdminCancelBanUser(store.state.user.loginUser.token, {
    userId: userId,
  })
    .then((res) => {
      if (res.code == 200 && res.data) {
        message.success("恢复成功!");
        data.value[rowIndex].ban = false;
      } else {
        message.error("恢复失败：" + res.msg);
      }
    })
    .catch((e) => {
      message.error("恢复失败：" + e);
    });
};
onMounted(() => {
  loadCurrentData();
});
</script>

<style>
</style>
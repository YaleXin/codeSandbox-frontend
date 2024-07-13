<template>
  <a-table
    :stripe="true"
    :loading="dataLoading"
    :columns="columns"
    :data="data"
    :pagination="paginationConfig"
    :page-position="bottom"
  >
    <!-- 代码要单独弹出展示 -->
    <template #codeOptional="{ record, rowIndex }">
      <a-button
        type="outline"
        shape="round"
        @click="codeListShow[rowIndex] = true"
        >查看</a-button
      >
      <a-modal v-model:visible="codeListShow[rowIndex]" width="70%">
        <template #title> {{ record.language }} </template>
        <a-row justify="center">
          <a-col :span="24">
            <CodeEditor
              :value="record.code"
              :read-only="true"
              :language="record.language.split('-')[0].toLowerCase()"
              style="min-height: 400px; height: 70vh"
            />
          </a-col>
        </a-row>
      </a-modal>
    </template>
    <!-- 输入要单独弹出展示 -->
    <template #inputListOptional="{ record, rowIndex }">
      <a-button
        type="outline"
        @click="inputListShow[rowIndex] = true"
        status="success"
        >
        {{ record.inputList?.length }}
        </a-button
      >
      <a-modal v-model:visible="inputListShow[rowIndex]" width="70%">
        <template #title> 你的输入列表</template>

        <a-scrollbar style="height: 500px; overflow: auto">
          <a-row
            justify="center"
            align="center"
            :gutter="24"
            v-for="(inputStr, index) in record.inputList"
            :key="index"
          >
            <a-col :span="2">输入{{ index + 1 }}</a-col>
            <a-col :span="18">
              <CodeEditor
                :value="inputStr"
                :language="plaintext"
                :read-only="true"
                style="height: 20vh"
              />
            </a-col>

            <a-divider orientation="center"></a-divider>
          </a-row>
        </a-scrollbar>
      </a-modal>
    </template>
    <!-- 输出要单独弹出展示 -->
    <template #outputListOptional="{ record, rowIndex }">
      <a-button
        type="outline"
        status="warning"
        @click="outputListShow[rowIndex] = true"
      >
        {{ record.outputList?.length }}
      </a-button>
      <a-modal v-model:visible="outputListShow[rowIndex]" width="70%">
        <template #title> 程序的输出列表</template>

        <a-scrollbar style="height: 500px; overflow: auto">
          <a-row
            justify="center"
            align="center"
            :gutter="24"
            v-for="(outputStr, index) in record.outputList"
            :key="index"
          >
            <a-col :span="2">输出{{ index + 1 }}</a-col>
            <a-col :span="18">
              <CodeEditor
                :value="outputStr"
                :language="plaintext"
                :read-only="true"
                style="height: 20vh"
              />
            </a-col>

            <a-divider orientation="center"></a-divider>
          </a-row>
        </a-scrollbar>
      </a-modal>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import CodeEditor from "@/components/CodeEditor.vue";
import { ref, onMounted } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  dto_PageExecutionRequest,
  PageExecutionService,
} from "../../../generated";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "代码",
    slotName: "codeOptional",
  },
  {
    title: "语言",
    dataIndex: "language",
  },
  {
    title: "输入列表个数",
    slotName: "inputListOptional",
  },
  {
    title: "输出列表",
    slotName: "outputListOptional",
  },
  {
    title: "内存消耗",
    dataIndex: "maxMemoryCost",
  },
  {
    title: "时间消耗",
    dataIndex: "maxTimeCost",
  },
  {
    title: "KeyId",
    dataIndex: "keyPairId",
  },
  {
    title: "执行状态",
    dataIndex: "status",
  },
  {
    title: "执行时间戳",
    dataIndex: "createAt",
  },
];
// 表格数据
const data = ref([]);
// 控制代码是否显示
const codeListShow = ref([]);
// 控制输入用例是否显示
const inputListShow = ref([]);
// 控制输出用例是否显示
const outputListShow = ref([]);
const handlePageChange = (pageNo, pageSize) => {
  paginationConfig.value.current = pageNo;
  loadCurrentData();
};
const handlePageSizeChange = (pageSize) => {
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
    PageExecutionService.postApiV1UserExecution(
      store.state.user.loginUser.token,
      {
        pageNum: paginationConfig.value.current,
        pageSize: paginationConfig.value.pageSize,
      }
    )
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
onMounted(() => {
  loadCurrentData();
});
</script>

<style>
</style>
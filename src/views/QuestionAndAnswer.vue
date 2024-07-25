<template>
  <a-row justify="center">
    <!-- <a-col :span="20"> -->
    <a-card
      title="问答列表"
      :style="{ width: '50%' }"
      :loading="loadingQa"
      class="card-demo"
    >
      <template #extra>
        <a-statistic
          :animation="true"
          :value="qaList.length ?? 0"
          :animation-duration="1000"
          :value-style="{ fontSize: '14px' }"
        >
          <template #suffix> 个 </template>
        </a-statistic>
      </template>
      <a-collapse>
        <a-collapse-item
          :header="qa.question"
          v-for="(qa, index) in qaList"
          :key="index"
          :style="{ margin: '10px' }"
        >
          <template #expand-icon="{ active }">
            <icon-double-down v-if="active" />
            <icon-double-right v-else />
          </template>
          {{ qa.answer }}
        </a-collapse-item>
      </a-collapse>
    </a-card>
    <!-- </a-spin> -->
    <!-- </a-col> -->
  </a-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import message from "@arco-design/web-vue/es/message";
import {
  QuestionAndAnswerService,
  vo_QuestionAndAnswer,
} from "../../generated/";
import { IconDoubleDown, IconDoubleRight } from "@arco-design/web-vue/es/icon";

const qaList = ref<vo_QuestionAndAnswer[]>([]);
const loadingQa = ref<boolean>(true);
const loadData = () => {
  QuestionAndAnswerService.getApiV1Qas()
    .then((res) => {
      if (res.code == 200) {
        qaList.value = res.data;
        loadingQa.value = false;
      } else {
        message.error("获取问答列表失败:" + res.msg);
      }
    })
    .catch((e) => {
      message.error("获取问答列表失败");
    });
};
onMounted(() => {
  loadData();
});
</script>

<style scoped>
.card-demo {
  width: 360px;
  margin-left: 24px;
  transition-property: all;
}
.card-demo:hover {
  transform: translateY(-4px);
}
</style>
<template>
  <div class="index-class">
    <a-row justify="center">
      <a-col :span="20">
        <!--  编程语言下拉组件  开始 -->
        <a-row justify="center">
          <a-col :span="24">
            <a-form :model="form" layout="inline">
              <a-form-item
                field="language"
                label="编程语言"
                style="min-width: 240px"
              >
                <a-select
                  v-model="form.language"
                  :style="{ width: '320px' }"
                  placeholder="选择编程语言"
                >
                  <a-option
                    v-for="(language, index) of languageList"
                    :key="index"
                    >{{ language }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
        <!--  编程语言下拉组件  结束 -->
        <!--  代码输入组件  开始 -->
        <a-row justify="center">
          <a-col :span="24">
            <CodeEditor
              :value="form.code"
              :language="alias2language[form.language]"
              style="min-height: 400px; height: 70vh"
            />
          </a-col>
        </a-row>

        <!--  代码输入组件  结束 -->

        <a-divider orientation="center"
          ><a-button type="primary" status="warning" @click="addBtnClk"
            >添加输入</a-button
          >
          <a-button
            :loading="executeLoad"
            type="primary"
            status="success"
            @click="executeBtnClk"
            >执行</a-button
          >
        </a-divider>

        <a-scrollbar style="height: 300px; overflow: auto">
          <a-row
            justify="center"
            align="center"
            :gutter="24"
            v-for="(inputStr, index) in form.inputList"
            :key="index"
          >
            <a-col :span="2">输入{{ index + 1 }}</a-col>
            <a-col :span="18">
              <CodeEditor
                :value="form.inputList[index]"
                :language="plaintext"
                style="height: 20vh"
              />
            </a-col>
            <a-col :span="2"
              ><a-button @click="removeBtnClk(index)" status="danger"
                >删除</a-button
              ></a-col
            >
            <a-divider orientation="center"></a-divider>
          </a-row>
        </a-scrollbar>

        <a-divider orientation="center"></a-divider>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "@arco-design/web-vue";
import message from "@arco-design/web-vue/es/message";
import { defineComponent, ref, onMounted, reactive } from "vue";
import {
  LanguagesService,
  dto_ExecuteCodeRequest,
  CodeExecutionService,
} from "../../generated/";
import CodeEditor from "@/components/CodeEditor.vue";
import { IconCodeSquare } from "@arco-design/web-vue/es/icon";
// import axios from '@/plugins/axios';
const executeLoad = ref<boolean>(false);
const form = ref<dto_ExecuteCodeRequest>({
  language: "",
  code: "",
  inputList: [],
});
const alias2language = reactive({});
const languageList = ref<String>();

const loadData = async () => {
  //   const response = await axios.get("/api/v1/languages");
  //   console.log('response.data=', response.data);
  const res = await LanguagesService.getApiV1Languages();
  console.log("res=", res);
  if (res.code != 200) {
    message.error("获取编程语言失败");
  } else {
    languageList.value = res.data;
    handleLanguageAlias(res.data);
    // 如果返回的列表非空，则使用第一个作为默认的
    if (languageList.value?.length > 0) {
      form.value.language = languageList.value[0];
    }
  }
};
// 后端返回的是 language<-version>
const handleLanguageAlias = (aliasList: string[]) => {
  aliasList.forEach((alias) => {
    // 将编程语言和版本分离并转小写
    alias2language[alias] = alias.split("-")[0].toLowerCase();
  });
  console.log(alias2language);
};
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
// 添加输入
const MAX_INPUT_ITEM = 5;
const addBtnClk = () => {
  if (form.value.inputList?.length < MAX_INPUT_ITEM) {
    form.value.inputList?.push("");
    message.info("已添加1个输入框，总共" + form.value.inputList?.length + "个");
  } else {
    message.error("最多能添加" + MAX_INPUT_ITEM + "个输入哦!");
  }
};
// 删除输入
const removeBtnClk = (index) => {
  Modal.confirm({
    title: "警告",
    content: "你确定要删除这个输入用例吗？",
    onOk: () => {
      console.log("removeBtnClk, index=", index, " ", typeof index);
      form.value.inputList.splice(index, 1);
      console.log(form.value.inputList?.length);
    },
    onCancel: () => {},
  });
};

const executeBtnClk = async () => {
  executeLoad.value = true;
  const res = await CodeExecutionService.postApiV1ExecuteCode(form.value);
  executeLoad.value = false;
  if (res.code != 200) {
    message.error("请求失败：" + res.msg);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <div class="index-class">
    <a-row justify="center">
      <a-col :span="20">
        <!--  编程语言下拉组件  开始 -->
        <a-row >
          <a-col :span="12">
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
          <a-col :span="12">
             <a-button
              :loading="executeLoad"
              type="primary"
              status="success"
              @click="executeBtnClk"
            >
              <template #icon>
                <icon-play-arrow />
              </template>
              <template #default>执行</template>
            </a-button>
          </a-col>

        </a-row>
        <!--  编程语言下拉组件  结束 -->
        <!--  代码输入组件  开始 -->
        <a-row justify="center">
          <a-col :span="24">
            <CodeEditor
              :value="form.code"
              :read-only="false"
              :editor-name="'codeEditor'"
              :language="alias2language[form.language]"
              :handle-change="changeCode"
              style="min-height: 400px; height: 70vh"
            />
          </a-col>
        </a-row>

        <!--  代码输入组件  结束 -->

        <a-divider orientation="center">
          <a-space>
            <a-tooltip :content="tooltipContent">
              <a-button
                type="primary"
                @click="addBtnClk"
                :disabled="form.inputList?.length >= MAX_INPUT_LEN"
              >
                <template #icon>
                  <icon-plus />
                </template>
                <template #default>添加输入</template>
              </a-button>
            </a-tooltip>

            <a-button
              :loading="executeLoad"
              type="primary"
              status="success"
              @click="executeBtnClk"
            >
              <template #icon>
                <icon-play-arrow />
              </template>
              <template #default>执行</template>
            </a-button>
          </a-space>
        </a-divider>
        <!-- 输入用例滑动组件 -->
        <a-scrollbar
          style="height: 300px; overflow: auto"
          v-show="form.inputList?.length > 0"
        >
          <a-row
          
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
                :read-only="false"
                :editor-name="
                  INPUT_EDITOR_PREFIX + '_' + generateInputId(index)
                "
                :handle-change="changeInputContent"
                style="height: 20vh"
              />
            </a-col>
            <!-- <a-col :span="2">
              <a-button @click="removeBtnClk(index)" status="danger">
                <template #icon>
                  <icon-minus />
                </template>
                <template #default>删除</template>
              </a-button>
            </a-col> -->
            <a-divider orientation="center"></a-divider>
          </a-row>
        </a-scrollbar>

        <a-divider
          orientation="center"
          v-show="form.inputList?.length > 0"
        ></a-divider>

        <!-- 程序输出组件 开始 -->
        <a-scrollbar
          style="height: 300px; overflow: auto"
          v-show="executionResultList?.length > 0"
        >
          <a-row
          
            align="center"
            :gutter="24"
            v-for="(executionResult, index) in executionResultList"
            :key="index"
          >
            <a-col :span="2">输出{{ index + 1 }}</a-col>
            <a-col :span="18">
              <CodeEditor
                :value="executionResult.message"
                :language="plaintext"
                :read-only="true"
                :editor-name="OUTPUT_EDITOR_PREFIX + '_' + index"
                :handle-change="changeOutputContent"
                style="height: 20vh"
              />
            </a-col>
            <a-col :span="2">
              <a-button
                @click="outputListInfoShow[index] = true"
                status="warning"
              >
                <template #icon>
                  <icon-info-circle-fill />
                </template>
                <template #default>额外信息</template>
              </a-button>

              <a-modal v-model:visible="outputListInfoShow[index]" width="50%">
                <a-card
                  :style="{ width: '100%' }"
                  title="额外执行信息"
                  hoverable
                >
                
                  <a-row>
                    <a-col :span="8">执行状态</a-col>
                    <a-col :span="16">{{ executionResult.exitCode }}</a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">错误信息</a-col>
                    <a-col :span="16">{{ executionResult.errorMessage }}</a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">内存消耗</a-col>
                    <a-col :span="16">{{ executionResult.memoryCost }}</a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">时间消耗</a-col>
                    <a-col :span="16">{{ executionResult.timeCost }}</a-col>
                  </a-row>
                  <a-divider />


                </a-card>
              </a-modal>
            </a-col>
            <a-divider orientation="center"></a-divider>
          </a-row>
        </a-scrollbar>

        <!-- 程序输出组件 结束 -->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "@arco-design/web-vue";
import message from "@arco-design/web-vue/es/message";
import { defineComponent, ref, onMounted, reactive, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  LanguagesService,
  dto_ExecuteCodeRequest,
  CodeExecutionService,
} from "../../generated/";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  IconCodeSquare,
  IconPlus,
  IconMinus,
  IconPlayArrow,
  IconInfoCircleFill,
} from "@arco-design/web-vue/es/icon";
// import axios from '@/plugins/axios';
const executeLoad = ref<boolean>(false);
const form = ref<dto_ExecuteCodeRequest>({
  language: "",
  code: "",
  inputList: [],
});

// 程序执行结果
const executionResultList = ref([
  // {
  //   errorMessage: "11143",
  //   exitCode: 1,
  //   memoryCost: 12,
  //   message: "string",
  //   timeCost: 11,
  // },
]);
const alias2language = reactive({});
const languageList = ref<String>();

const store = useStore();
const router = useRouter();

const MAX_INPUT_LEN: number = 5;
const INPUT_EDITOR_PREFIX = "inputEditor";
const OUTPUT_EDITOR_PREFIX = "inputEditor";
const tooltipContent = ref("最多可有" + MAX_INPUT_LEN + "个输入用例");

// 控制输出用例额外信息是否显示
const outputListInfoShow = ref([]);

// 用于标识输入用例 ( changeInputContent 函数通过名字来获取其在 inputList 中的下标，进而更新对应的 inputList[idx] )
const inputIds = ref({});
// 生成 uuid
const guid2: string = () => {
  const S4: string = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};
const generateInputId = (idx: number) => {
  const lastInputId = guid2();
  inputIds.value[lastInputId] = idx;
  return lastInputId;
};

const loadData = async () => {
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
// const removeBtnClk = (index) => {
//   message.info("index:" + index);
//   Modal.confirm({
//     title: "警告",
//     content: "你确定要删除这个输入用例吗？",
//     onOk: async() => {
//       console.log("removeBtnClk, index=", index, " ", typeof index);
//       form.value.inputList.splice(index, 1);
//       console.log("after delete inputList : ", form.value.inputList);
//       await nextTick(); // 等待下次 DOM 更新循环结束
// },
//     onCancel: () => {},
//   });
// };

const addictionBtnClk = (idx) => {};

const checkForm = (): boolean => {
  // 不能仅包含空白字符
  if (form.value.code?.trim().length === 0) {
    message.error("请输入有效的代码！");
    return false;
  }

  return true;
};
const executeBtnClk = async () => {
  if (!checkForm()) {
    return;
  }
  executionResultList.value = []
  console.log(form.value);
  executeLoad.value = true;
  const res = await CodeExecutionService.postApiV1ExecuteCode(
    store.state.user.loginUser.token,
    form.value
  );
  executeLoad.value = false;
  if (res.code != 200) {
    message.error("请求失败：" + res.msg);
  } else {
    console.log("exec res = ", res.data);
    executionResultList.value = res.data.executeMessages;
    console.log("executionResultList = ", executionResultList.value);
    outputListInfoShow.value = new Array(executionResultList.value.length).fill(
      false
    );
  }
};

const changeOutputContent = (editorName: string, value: string) => {};

// 输入列表发生变化会调用该方法
const changeInputContent = (editorName: string, value: string) => {
  const uuidStr = editorName.substring(INPUT_EDITOR_PREFIX.length + 1);
  // 根据子组件传递上来的值，更新数据
  const changeIdx = inputIds.value[uuidStr];
  form.value.inputList[changeIdx] = value;
  console.log("inputList = ", form.value.inputList);
};

// 代码变化会调用该方法
const changeCode = (editorName: string, value: string) => {
  form.value.code = value;
  // console.log("editorName = ", editorName, "code = ", form.value.code);
};

const goLogin = () => {
  setTimeout(() => {
    router.push({
      path: "/user/login",
      replace: false,
    });
  }, 500);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

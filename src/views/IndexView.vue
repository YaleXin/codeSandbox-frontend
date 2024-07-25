<template>
  <div class="index-class">
    <a-row justify="center">
      <a-col :span="20">
        <a-row>
          <!--  编程语言下拉组件  开始 -->
          <a-col :span="12">
            <a-form :model="form" layout="inline">
              <a-form-item
                field="language"
                label="编程语言"
                style="min-width: 150px"
              >
                <a-select v-model="form.language" placeholder="选择编程语言">
                  <a-option
                    v-for="(language, index) of languageList"
                    :key="index"
                    >{{ language }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
          <!--  编程语言下拉组件  结束 -->
          <!--  主题下拉组件  开始 -->
          <a-col :span="12">
            <a-form :model="languageFrom" layout="inline">
              <a-form-item label="主题" style="min-width: 150px">
                <a-select
                  @change="themeChange"
                  v-model="languageFrom.themeSelect"
                  placeholder="选择主题"
                >
                  <a-option v-for="(theme, index) of themeList" :key="index">{{
                    theme
                  }}</a-option>
                </a-select>
              </a-form-item>
            </a-form>
          </a-col>
          <!--  主题下拉组件  结束 -->
          <!-- <a-col :span="12">
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
          </a-col> -->
        </a-row>

        <!--  代码输入组件  开始 -->
        <a-row justify="center">
          <a-col :span="24">
            <CodeEditor
              :value="form.code"
              :read-only="false"
              :editor-name="'codeEditor'"
              :language="alias2language[form.language ?? '']"
              :handle-change="changeCode"
              :theme="languageFrom.themeSelect"
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
                :disabled="(form.inputList?.length ?? 0) >= MAX_INPUT_LEN"
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
          v-show="(form.inputList?.length ?? 0) > 0"
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
                :value="form?.inputList?.[index] ?? ''"
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
          v-show="(form.inputList?.length ?? 0) > 0"
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
            <a-col :span="2"
              ><span
                :style="{
                  color: getStatusColor(executionResult?.exitCode ?? 0),
                }"
                >输出{{ index + 1 }}</span
              ></a-col
            >
            <a-col :span="18">
              <CodeEditor
                :value="executionResult.message ?? ''"
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
                    <a-col :span="16">
                      <a-tag
                        :color="getStatusColor(executionResult.exitCode ?? 0)"
                      >
                        <template #icon>
                          <icon-check-circle-fill
                            v-if="
                              executionResult.exitCode ==
                              GLOBAL.CODE_RUN_STATUS.EXIT_CODE_OK
                            "
                          />
                          <icon-close-circle-fill v-else />
                        </template>
                        {{ getStatusText(executionResult.exitCode) }}
                      </a-tag>
                    </a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">错误信息</a-col>
                    <a-col :span="16">{{ executionResult.errorMessage }}</a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">内存消耗</a-col>
                    <a-col :span="16">
                      <!-- 使用v-if 是为了强制重新渲染，产生对应的动画 -->
                      <a-statistic
                        v-if="outputListInfoShow[index]"
                        :animation="true"
                        :value="(executionResult.memoryCost ?? 0) / 1024"
                        :animation-duration="1000"
                        class="my-statistic"
                        :value-style="{ fontSize: '14px' }"
                      >
                        <template #suffix> KB </template>
                      </a-statistic>
                    </a-col>
                  </a-row>
                  <a-divider />

                  <a-row>
                    <a-col :span="8">时间消耗</a-col>
                    <a-col :span="16">
                      <a-statistic
                        v-if="outputListInfoShow[index]"
                        :animation="true"
                        :value="executionResult.timeCost"
                        :animation-duration="1000"
                        class="my-statistic"
                        :value-style="{ fontSize: '14px' }"
                      >
                        <template #suffix> ms </template>
                      </a-statistic>
                    </a-col>
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
import { defineComponent, ref, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  LanguagesService,
  dto_ExecuteCodeRequest,
  CodeExecutionService,
  vo_ExecuteMessageVO,
} from "../../generated/";
import CodeEditor from "@/components/CodeEditor.vue";
import {
  IconCodeSquare,
  IconPlus,
  IconMinus,
  IconPlayArrow,
  IconInfoCircleFill,
  IconCheckCircleFill,
  IconCloseCircleFill,
} from "@arco-design/web-vue/es/icon";
import GLOBAL from "@/constants/globalConstants";
import type { AxiosError } from "axios";

// import axios from '@/plugins/axios';
const executeLoad = ref<boolean>(false);
const form = ref<dto_ExecuteCodeRequest>({
  language: "",
  code: "",
  inputList: [] as any[],
});

interface LanguageFrom {
  themeSelect?: string;
}
const languageFrom = ref<LanguageFrom>({
  // 默认主题
  themeSelect: "vs-dark",
});

const themeList = ref(["vs-dark", "hc-black", "vs", "hc-light"]);

const plaintext = ref<string>("plaintext");

// 程序执行结果
const executionResultList = ref<vo_ExecuteMessageVO[]>([
  // {
  //   exitCode: 0,
  //   message: "11\n",
  //   errorMessage: "",
  //   timeCost: 311,
  //   memoryCost: 0,
  // },
  // {
  //   exitCode: 1,
  //   message: "",
  //   errorMessage: "COMPILE ERROR",
  //   timeCost: 106,
  //   memoryCost: 4096,
  // },
  // {
  //   exitCode: 2,
  //   message: "",
  //   errorMessage: "TIME OUT",
  //   timeCost: 5120,
  //   memoryCost: 2916352,
  // },
  // {
  //   exitCode: 3,
  //   message: "",
  //   errorMessage: "RUNTIME ERROR",
  //   timeCost: 520,
  //   memoryCost: 0,
  // },
]);
const alias2language = ref<{ [key: string]: string }>({});
const languageList = ref<String>();

const store = useStore();
const router = useRouter();

const MAX_INPUT_LEN: number = 5;
const INPUT_EDITOR_PREFIX = "inputEditor";
const OUTPUT_EDITOR_PREFIX = "inputEditor";
const tooltipContent = ref("最多可有" + MAX_INPUT_LEN + "个输入用例");

// 控制输出用例额外信息是否显示
const outputListInfoShow = ref<boolean[]>([]);

// 用于标识输入用例 ( changeInputContent 函数通过名字来获取其在 inputList 中的下标，进而更新对应的 inputList[idx] )
const inputIds = ref<{ [key: string]: number }>({});
// 生成 uuid
const guid2 = (): string => {
  const S4 = (): string => {
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
  LanguagesService.getApiV1Languages()
    .then((res) => {
      console.log("res=", res);
      if (res.code != 200) {
        message.error("获取编程语言失败");
      } else {
        languageList.value = res.data;
        handleLanguageAlias(res.data);
        // 如果返回的列表非空，则使用第一个作为默认的
        if ((languageList.value?.length ?? 0) > 0) {
          form.value.language = languageList.value?.[0] ?? "";
        }
      }
    })
    .catch((e) => {
      console.log(e);
      message.error("加载【支持的编程语言】失败");
    });
};
// 后端返回的是 language<-version>
const handleLanguageAlias = (aliasList: string[]) => {
  aliasList.forEach((alias) => {
    // 将编程语言和版本分离并转小写
    alias2language.value[alias] = alias.split("-")[0].toLowerCase();
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
  if ((form.value.inputList?.length ?? 0) < MAX_INPUT_ITEM) {
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

const addictionBtnClk = (idx: any) => {};

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
  executionResultList.value = [];
  console.log(form.value);
  executeLoad.value = true;
  CodeExecutionService.postApiV1ExecuteCode(
    store.getters["user/getUser"].token,
    form.value
  )
    .then((res) => {
      executeLoad.value = false;
      if (res.code != 200) {
        message.error("请求失败：" + res.msg);
      } else {
        message.success(
          "执行完成，共" +
            (res.data.executeMessages?.length ?? 0) +
            "个输出，请往下滑动鼠标查看"
        );
        console.log("exec res = ", res.data);
        executionResultList.value = res.data.executeMessages;
        console.log("executionResultList = ", executionResultList.value);
        outputListInfoShow.value = new Array(
          executionResultList.value.length
        ).fill(false);
      }
    })
    .catch((e) => {
      message.error("提交代码失败，服务器出错");
    });
};

const changeOutputContent = (editorName: string, value: string) => {};

// 输入列表发生变化会调用该方法
const changeInputContent = (editorName: string, value: string) => {
  const uuidStr = editorName.substring(INPUT_EDITOR_PREFIX.length + 1);
  // 根据子组件传递上来的值，更新数据
  const changeIdx = inputIds.value[uuidStr];
  if (form.value.inputList) {
    form.value.inputList![changeIdx] = value;
  }

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
// 用于转换执行状态的信息
const statusText = ["正常退出", "编译失败", "超时退出", "运行出错", "其他错误"];
const statusColor = ["green", "magenta", "orange", "red", "gray"];
const getStatusText = (code: number | undefined) => {
  if (code == undefined || code >= statusText.length) {
    return "未知错误";
  } else {
    return statusText[code];
  }
};
const getStatusColor = (code: number) => {
  if (code >= statusText.length) {
    return "gray";
  } else {
    return statusColor[code];
  }
};

const themeChange = (newTheme: any) => {
  // message.info(themeSelect.value)
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

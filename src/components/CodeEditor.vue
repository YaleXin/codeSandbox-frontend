<template>
  <div id="code-editor" ref="codeEditorRef" />
  <!--  <a-button @click="fillValue">填充值</a-button>-->
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { defineProps, onMounted, ref, toRaw, watch, withDefaults } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
  language?: string;
  editorName?: string;
  readOnly?: boolean;
  theme?:string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  language: () => "",
  editorName: () => "",
  theme:() => "vs-dark",
  handleChange: (editorName: string, value: string) => {},
});

const codeEditorRef = ref();
const codeEditor = ref();

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

watch(
  () => props.theme,
  () => {
    monaco.editor.setTheme(props.theme);
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    // 值由父组件设置
    value: props.value,
    // 编程语言由父组件设置
    language: props.language,
    // 是否只读由父组件设置
    readOnly: props.readOnly,
    // 主题
    theme: props.theme,
    automaticLayout: true,
    colorDecorators: true,
    // 启用预览图
    minimap: {
      enabled: true,
    },
    // 鼠标可以缩放字体
    mouseWheelZoom: true,
    // 代码可折叠
    folding: true,
    // 光标移动动画
    cursorSmoothCaretAnimation: "on",
    // 字体大小
    fontSize: 20,
  });

  // 编辑 监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(props.editorName, toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>

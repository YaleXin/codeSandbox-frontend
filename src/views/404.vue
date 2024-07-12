<template>
  <div>
    <a-row justify="center">
      <a-col :span="8">
        <a-card :style="{ width: '100%' }" hoverable>
          <a-result status="warning" title="404">
            <template #subtitle> 您似乎来到了错误的页面~~ </template>
          </a-result>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
</script>

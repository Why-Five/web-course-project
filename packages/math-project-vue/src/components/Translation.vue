<script lang="ts" setup>
import { useI18n } from "../composables/useI18n";

// 使用组合式函数 - 一行代码搞定
const { setLocal, $t } = useI18n();
</script>

<template>
  <nav mt-10 flex justify-center gap-2>
    <button h-10 btn @click="setLocal('zh')">中文</button>
    <button h-10 btn @click="setLocal('en')">English</button>
  </nav>

  <h1>{{ $t.hello }} {{ $t.MilkyWay }}</h1>
</template>
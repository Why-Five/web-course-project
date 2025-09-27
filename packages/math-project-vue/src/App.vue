<!-- <script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Zhihu from './components/Zhihu.vue';
import dayjs from "dayjs";
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <Zhihu />
  <div>{{ dayjs().format("YYYY年MM月DD日 HH:mm:ss") }}</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

、<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import dayjs from "dayjs";
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  
  <!-- 路由导航 -->
  <nav>
    <RouterLink to="/">首页</RouterLink>
    <RouterLink to="/zhihu">知乎热榜</RouterLink>
    <RouterLink to="/music">Music</RouterLink>
    <RouterLink to="/translation">翻译</RouterLink>
  </nav>
  
  <!-- 路由视图 -->
  <RouterView />
  
  <div>{{ dayjs().format("YYYY年MM月DD日 HH:mm:ss") }}</div>
</template>

<style scoped>
/* 保持原有样式 */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

nav {
  margin: 20px 0;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #646cff;
}
</style>
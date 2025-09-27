<script setup lang="ts">
import { ref } from 'vue'
import { Person } from "@w4ng3/tools";

defineProps<{ msg: string }>()

const count = ref(0)
const p = new Person("Frieren", "magic");
const onThemeChange = (e: string) => {
  document.body.className = e;
};
</script>

<template>
  <header flex items-center justify-center gap-2>
    <h2>主题切换</h2>
    <button @click="onThemeChange('default')">default</button>
    <button @click="onThemeChange('peaple')">peaple</button>
    <button @click="onThemeChange('spring')">spring</button>
  </header>
  <div mb-3 flex justify-center gap-2>
    <button bg-primary text-white>primary</button>
    <button bg-warning text-white>warning</button>
    <button bg-danger text-white>danger</button>
    <button bg-info text-white>info</button>
  </div>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up Guide</a>.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <div> {{ p.name + ':' + p.slogan }}</div>
  <section class="bg-yellow rounded-md w-800px grid grid-cols-3 items-center gap-2">
    <div class="bg-pink h-10 place-content-center">1</div>
    <div bg-sky>2</div>
    <div>3</div>
    <div>4</div>
  </section>
  <button btn>
    <div i-carbon-logo-github text-xl hover:bg-red></div>
  </button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import service from './service'

const msg = ref('')
const count = ref('')
const mysql = ref('')

async function load() {
  const hello = (await service.get('/')).data
  msg.value = `${hello}`
}

async function inc() {
  const { data } = await service.get('/count')
  count.value = data
}

async function loadDb() {
  const { data } = await service.get('/db')
  mysql.value = data
}

load()
inc()
loadDb()
</script>

<template>
  <div style="text-align: center;">
    <div class="msg">
      {{ msg }}
    </div>
    <div style="margin-top: 10px;">
      <button @click="inc">Redis +{{ count }}</button>
    </div>

    <div style="margin-top: 10px;">From Mysql: {{ mysql }}</div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style scoped>

.msg {
  font-size: 32px;
  font-weight: 600;
}
</style>

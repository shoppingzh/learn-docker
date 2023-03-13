<script setup lang="ts">
import { ref } from 'vue'
import service from './service'

const msg = ref('')

async function load() {
  const hello = (await service.get('/')).data
  const count = (await service.get('/count')).data
  msg.value = `${hello}, ${count}`
}

load()

service.get('/').then(res => {
  msg.value = res.data
})
</script>

<template>
  <div class="msg">
    {{ msg }}
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

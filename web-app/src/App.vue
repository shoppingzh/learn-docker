<script setup lang="ts">
import { reactive, ref } from 'vue'
import service from './service'

interface Blog {
  title?: string
  text?: string
}

const list = ref<Blog[]>([])
const model = reactive<Blog>({
  title: '',
  text: '',
})

async function loadList() {
  const { data } = await service.get('/blog/list')
  list.value = data || []
}

async function submit() {
  const pass = confirm('确定提交？')
  if (!pass) return
  await service.get('/blog/add', {
    params: model
  })
  loadList()
}

loadList()
</script>

<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <h2>{{ item.title }}</h2>
      <p>
        {{ item.text }}
      </p>
    </div>
  </div>

  <hr>

  <div>
    <div>
      <input type="text" v-model="model.title" placeholder="博客标题" style="width: 400px; padding: 5px;" />
    </div>
    <div style="margin-top: 10px;">
      <textarea v-model="model.text" placeholder="博客内容" rows="5" style="width: 400px; padding: 5px;" />
    </div>
    <div style="margin-top: 10px;">
      <button @click="submit">提交</button>
    </div>
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
body {
  padding: 20px;
}
</style>

<style scoped>

.msg {
  font-size: 32px;
  font-weight: 600;
}
</style>

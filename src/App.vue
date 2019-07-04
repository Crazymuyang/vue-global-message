<template>
  <div id="app">
    <button @click="showMeYourMsg('info')">info</button>
    <button @click="showMeYourMsg('success')">success</button>
    <button @click="showMeYourMsg('warn')">warn</button>
    <button @click="showMeYourMsg('error')">error</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    showMeYourMsg(type) {
      this.$message[type](type); 
    }
  }
}
</script>
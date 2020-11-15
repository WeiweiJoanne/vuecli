<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // },
  created () {
    const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
    this.$http.get(api).then((response) => {
      console.log(response.data)
    })
  },
  methods: {}
}
</script>

<style lang="scss">
@import './assets/all';
</style>

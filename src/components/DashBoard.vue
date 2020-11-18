<template>
<div>
  <NavBar />
  <!-- <Alert :isshow="swith" v-if="swith" /> -->
  <Alert />
  <div class="container-fluid">
    <div class="row">
      <SideBar />
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from './NavBar.vue'
import SideBar from './SideBar.vue'
import Alert from './AlertMessage.vue'
export default {
  name: 'DashBoard',
  // data () {
  //   return {
  //     swith: true
  //   }
  // },
  components: {
    NavBar,
    SideBar,
    Alert
  },
  created () {
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    console.log('mycookie', myCookie)
    this.$http.defaults.headers.common.Authorization = myCookie
  }
}
</script>

<style lang="scss">
@import "../assets/helpers/dashboard";
</style>

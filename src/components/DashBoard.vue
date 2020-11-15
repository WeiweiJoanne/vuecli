<template>
<div>
  <NavBar />
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
export default {
  name: 'DashBoard',
  components: {
    NavBar,
    SideBar
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

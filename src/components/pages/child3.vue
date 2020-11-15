<template>
<div>
  <div class="card" style="width: 18rem;">
    <img :src="user.picture.large" class="card-img-top" v-if="user.picture">
    <div class="card-body">
      <h5 class="card-title">Card title</h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'child3',
  data () {
    return {
      user: {}
    }
  },
  created () {
    // console.log(this.$route.params.id)
    // const id = this.$route.params.id
    // console.log(id)
    const vm = this
    this.$http.get('https://randomuser.me/api/').then((response) => {
      console.log(response)
      vm.user = response.data.results[0]
    })
  }
}
</script>

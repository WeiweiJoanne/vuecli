<template>
<div>
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/page/">卡片1</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/page/child2">卡片2</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/page/child3">卡片3</router-link>
        </li>
      </ul>
</div>
</template>

<script>
export default {
  name: 'menuu'
}
</script>

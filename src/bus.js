import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// Message :'from product'
// 樣式 : 'danger'
// this.$bus.$emit('message:push', 'from product', 'danger')

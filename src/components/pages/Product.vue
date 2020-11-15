<template>
<div>
  <div>
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#productModal">建立新產品</button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <td width="120">分類</td>
        <td width="120">名字</td>
        <td width="120" class="text-right">原價</td>
        <td width="120" class="text-right">售價</td>
        <td class="text-right">是否啟用</td>
        <td class="text-center">編輯按鈕</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for='(item,key) in product' :key='key'>
        <td style="">{{ item.category }}</td>
        <td style="">{{ item.title }}</td>
        <!-- <td><img :src="item.image" alt=""></td> -->
        <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td>
        <td class="text-right">
          <span v-if="item.is_enabled === 1 ">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td class="text-center">
          <button type="button" class="btn btn-outline-secondary">編輯</button>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  methods: {
    getProducts () {
      // const api = `${process.env.VUE_APP_API}/api/joanne/admin/products/all`
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
      const vm = this
      this.$http.get(api).then((res) => {
        console.log(res)
        vm.product = res.data.products
      })
      // console.log(process.env.VUE_APP_CUSTOMPATH)
    },
    openModal () {
      $('#productModal').modal('show')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

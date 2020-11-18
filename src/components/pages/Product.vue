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
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結">
              </div>
              <div class="form-group">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="files">
              </div>
              <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80" class="img-fluid" alt="">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category" v-model="tempProduct.category" placeholder="請輸入分類">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price" placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price" v-model="tempProduct.price" placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description" v-model="tempProduct.description" placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content" v-model="tempProduct.content" placeholder="請輸入產品說明內容"></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0" id="is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger">確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
  </div> -->
</div>
</template>

<script>
// import $ from 'jquery'
/* global $ */
export default {
  data () {
    return {
      product: [],
      tempProduct: []
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
    },
    updateProduct () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      const vm = this
      // console.log(vm.tempProduct)
      this.$http.post(api, {
        data: vm.tempProduct
      }).then((res) => {
        $('#productModal').modal('show')
        if (res.success) {
          vm.getProducts()
          $('#productModal').modal('hide')
        } else {
          vm.getProducts()
          $('#productModal').modal('hide')
          console.log('error')
        }
        // vm.product = res.data.products
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

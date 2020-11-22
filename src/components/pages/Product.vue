<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div>
    <button type="button" class="btn btn-primary" @click="openModal('add')">建立新產品</button>
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
          <button type="button" class="btn btn-outline-secondary" @click="openModal('edit',item)">編輯</button>
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
                  <!-- <i class="fas fa-spinner fa-spin"></i> -->
                  <i class="fas fa-spinner fa-pulse" v-if="status.fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
              </div>
              <img :src="tempProduct.imageUrl" class="img-fluid" alt="">
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
</div>
</template>

<script>
// import $ from 'jquery'
/* global $ */
export default {
  data () {
    return {
      product: [],
      tempProduct: {},
      isNew: 'add',
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/all`
      const vm = this
      this.isLoading = true
      this.$http.get(api).then((res) => {
        // console.log(res)
        vm.product = res.data.products
        this.isLoading = false
      })
    },
    openModal (isNew, item) {
      if (isNew === 'edit') {
        this.isNew = 'edit'
        this.tempProduct = Object.assign({}, item)
      } else {
        this.isNew = 'add'
        this.tempProduct = {}
      }
      $('#productModal').modal('show')
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let methods = 'post'
      const vm = this
      if (vm.isNew === 'edit') {
        api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        methods = 'put'
      }
      this.$http[methods](api, {
        data: vm.tempProduct
      }).then((res) => {
        vm.getProducts()
        $('#productModal').modal('hide')
        if (!res.data.success) {
          this.$bus.$emit('message:push', 'from product', 'danger')
          console.log('error')
        } else {
          this.$bus.$emit('message:push', 'from product', 'success')
        }
      })
    },
    uploadFile () {
      // console.log(this)
      // $('#customFile').val('')
      // document.getElementById('customFile').value = ''
      const uploadedFile = this.$refs.files.files[0]
      const fornData = new FormData()
      fornData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      const vm = this
      vm.status.fileUploading = true
      this.$http.post(api, fornData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        // console.log(res)
        vm.status.fileUploading = false
        if (res.data.success) {
          // vm.tempProduct.imageUrl = res.data.imageUrl
          this.$bus.$emit('message:push', 'from product', 'success')
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl)
          document.getElementById('customFile').value = ''
        } else {
          this.$bus.$emit('message:push', 'from product', 'danger')
          console.log('error')
          document.getElementById('customFile').value = ''
        }
      })
    }
  },
  created () {
    this.getProducts()
    // this.$bus.$emit('message:push', 'from product', 'success')
  }
}
</script>

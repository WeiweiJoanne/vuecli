<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div class="row mt-4">
    <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
      <div class="card border-0 shadow-sm">
        <div style="height: 150px; background-size: contain; background-position: center;background-repeat:no-repeat" :style="{backgroundImage: `url(${item.imageUrl})`}">
        </div>
        <div class="card-body">
          <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
          <h5 class="card-title">
            <a href="#" class="text-dark">{{item.title}}</a>
          </h5>
          <p class="card-text">{{item.content}}</p>
          <div class="d-flex justify-content-between align-items-baseline">
            <div class="h5" v-if="!item.price">{{item.origin_price}} 元</div>
            <del class="h6" v-if="item.price">原價{{item.origin_price}}元</del>
            <div class="h5" v-if="item.price">現在只要{{item.price}}元</div>
          </div>
        </div>
        <div class="card-footer d-flex">
          <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
            <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
            查看更多
          </button>
          <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addToCart(item.id)">
            <i class="fas fa-spinner fa-spin" v-if="item.id === status.addCart"></i>
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addToCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">品名</th>
        <th scope="col">數量</th>
        <th scope="col">單價</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in carts" :key="item.id">
        <th class="text-center" scope="row" @click="deleteCart(item.id)">
          <button type="button" class="btn btn-primary"><i class="far fa-trash-alt"></i></button>
        </th>
        <td>{{item.product.title}}</td>
        <td>{{item.qty}}</td>
        <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
        <td class="align-middle text-right">{{ item.final_total }}</td>
      </tr>
    </tbody>
  </table>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="createOrder">
      <div class="form-group">
        <label for="useremail">Email</label>
        <input type="email" class="form-control" name="email" v-validate="'required|email'" id="useremail" v-model="form.user.email" placeholder="請輸入 Email">
        <span class="text-danger" v-if="errors.has('email')">
          {{errors.first('email')}}
        </span>
      </div>
      <div class="form-group">
        <label for="username">收件人姓名</label>
        <input type="text" class="form-control" name="name" :class="{'is-invalid': errors.has('name')}" id="username" v-model="form.user.name" v-validate="'required'" placeholder="輸入姓名">
        <span class="text-danger" v-if="errors.has('name')"> 姓名必須重新輸入 </span>
      </div>
      <div class="form-group">
        <label for="usertel">收件人電話</label>
        <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
      </div>
      <div class="form-group">
        <label for="useraddress">收件人地址</label>
        <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address" placeholder="請輸入地址">
        <span class="text-danger">地址欄位不得留空</span>
      </div>
      <div class="form-group">
        <label for="comment">留言</label>
        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="text-right">
        <button class="btn btn-danger">送出訂單</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'customer-order',
  data () {
    return {
      isLoading: false,
      products: [],
      product: {},
      status: {
        loadingItem: '',
        addCart: ''
      },
      carts: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  methods: {
    getProducts () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      vm.isLoading = true
      vm.axios.get(api).then(res => {
        // console.log(res.data.products)
        vm.products = res.data.products
        vm.isLoading = false
      })
    },
    getProduct (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.status.loadingItem = id
      vm.axios.get(api).then(res => {
        res.data.product.num = 1
        vm.product = res.data.product
        vm.status.loadingItem = ''
        $('#productModal').modal('show')
      })
    },
    deleteCart (id) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.isLoading = true
      vm.axios.delete(api).then(res => {
        vm.getCart()
        vm.isLoading = false
      })
    },
    addToCart (id, qty = 1) {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.status.addCart = id
      const cart = {
        product_id: id,
        qty
      }
      vm.axios.post(api, {
        data: cart
      }).then(res => {
        // vm.carts.push(res.data.data.product)
        vm.getCart()
        vm.status.addCart = ''
        $('#productModal').modal('hide')
      })
    },
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.axios.get(api).then(res => {
        vm.carts = res.data.data.carts
      })
    },
    createOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.isLoading = true
      this.$validator.validate().then(res => {
        if (res) {
          vm.axios.post(api, {
            data: order
          }).then(res => {
            console.log(res)
            vm.isLoading = false
          })
        } else {
          console.log('訂單失敗')
        }
      })
    }
  }
}
</script>

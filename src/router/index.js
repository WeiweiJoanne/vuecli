import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '@/components/HelloWorld'
import Login from '@/components/pages/login'
import DashBoard from '@/components/DashBoard'
import Product from '@/components/pages/Product'
import CustomerOrder from '@/components/pages/CustomerOrder'
// import Page from '@/components/pages/page'
// import Menuu from '@/components/pages/menu'
// import Child1 from '@/components/pages/child1'
// import Child2 from '@/components/pages/child2'
// import Child3 from '@/components/pages/child3'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      // name: '首頁',
      path: '*',
      redirect: '/login'
    },
    // {
    //   name: 'index',
    //   path: '/index',
    //   component: Home,
    //   meta: { requiresAuth: true }
    // },
    {
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      name: 'DashBoard',
      path: '/admin',
      component: DashBoard,
      children: [
        {
          name: 'Product',
          path: 'products',
          component: Product,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      name: 'DashBoard',
      path: '/',
      component: DashBoard,
      children: [
        {
          name: 'CustomerOrder',
          path: 'CustomerOrder',
          component: CustomerOrder
        }
      ]
    }
  ]
})

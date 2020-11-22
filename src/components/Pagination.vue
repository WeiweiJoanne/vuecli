<template>
<div>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li :class="['page-item',{'disabled':!paginationP.has_pre}]">
        <a class="page-link" href="#" @click.prevent="getProductsPP('pre')">Previous</a>
      </li>
      <li :class="['page-item',{'active': page === paginationP.current_page}]" v-for="(page,key) in paginationP.total_pages" :key="key">
        <a class="page-link" href="#" @click.prevent="getProductsPP('cur',page)">{{page}}</a>
      </li>
      <li :class="['page-item',{'disabled':!paginationP.has_next}]">
        <a class="page-link" href="#" @click.prevent="getProductsPP('next')">Next</a>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['paginationP'],
  methods: {
    // getProductPrev () {
    //   this.$emit('getProductsP', this.paginationP.current_page - 1)
    // },
    // getProductsPP (page) {
    //   this.$emit('getProductsP', page)
    // },
    // nextProductsPP () {
    //   this.$emit('getProductsP', this.paginationP.current_page + 1)
    // }
    getProductsPP (page, curpage) {
      if (page === 'pre') {
        this.$emit('getProductsP', this.paginationP.current_page - 1)
      } else if (page === 'next') {
        this.$emit('getProductsP', this.paginationP.current_page + 1)
      } else {
        this.$emit('getProductsP', curpage)
      }
    }
  }
}
</script>

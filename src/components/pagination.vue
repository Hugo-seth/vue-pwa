<template>
  <ul class="pagination">
    <li :class="{hide: params.page === 1}"><a href="#" v-text="'<'" @click.prevent="goPrevious()"></a></li>
    <li v-for="n in pages" :class="{current: params.page === n}">
      <router-link :to="{path: 'articles', query: {page: n}}">
        {{n}}
      </router-link>
    </li>
    <li :class="{hide: params.page === pages}"><a href="#" v-text="'>'" @click.prevent="goNext()"></a></li>
  </ul>
</template>

<script>
  export default {
    name: 'pagination',
    props: {
      total: Number,
      params: Object
    },
    data: function() {
      return {
        pages: 1
      }
    },
    created: function() {
      this.pages = Math.ceil(this.total / this.params.per_page)
    },
    methods: {
      goPrevious() {
        //console.log(this)
        this.$router.push({
          path: 'articles',
          query: {
            page: this.params.page - 1
          }
        })
      },
      goNext() {
        this.$router.push({
          path: 'articles',
          query: {
            page: this.params.page + 1
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pagination {
    margin: 30px 0;
    list-style: none;
    padding-left: 0;
    text-align: center;
    li {
      display: inline-block;
    }
    a {
      color: #1976D2;
      display: inline-block;
      padding: 10px 15px;
    }
    .hide {
      display: none;
    }
    .current>a {
      cursor: text;
    }
    .current>a,
    .current>a:hover {
      color: #2c3e50;
    }
  }
</style>
<template>
  <div class="home-page">
    <div v-show="articles.length === 0 && !net_error" class="spinner"></div>
    <ul class="article-list">
      <li v-for="article of articles">
        <router-link :to="'articles/' + article.number.toString()">
          <h2>{{article.title}}</h2>
          <div class="article-summary" v-html="article.summary"></div>
          <p class="clearfix">阅读全文 <span class="time">Posted at {{article.created_at | formatDate}}</span></p>
        </router-link>
      </li>
    </ul>
    <div class="error-tip" v-if="net_error">暂时无法连接服务器，请稍后再来^_^</div>
    <div v-if="totalArticles">
      <pagination :total="totalArticles" :params="params"></pagination>
    </div>
  </div>
</template>

<script>
  import Pagination from './pagination'
  import {
    getIssuesPage,
    getAllIssues
  } from '../services/issues.js'
  import formatDate from '../filters/formatDate.js'

  export default {
    name: 'home-page',
    components: {
      Pagination
    },
    data: function() {
      return {
        articles: [],
        totalArticles: '',
        net_error: false,
        params: {
          per_page: 3,
          page: 1
        }
      }
    },
    created: function() {
      this.getIssues()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'getIssues'
    },
    methods: {
      getIssues() {
        //console.log(this.$route)
        window.scrollTo(0, 0)
        if (!this.$route.query.page) {
          this.params.page = 1
        } else {
          this.params.page = parseInt(this.$route.query.page, 10)
        }

        getIssuesPage(this.params).then(data => {
          // console.log(data)
          this.articles = data
        }).catch(() => this.net_error = true)

        getAllIssues().then(data => this.totalArticles = data.length)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .article-list {
    list-style: none;
    padding-left: 0;
    li {
      border-bottom: 1px solid #ddd;
    }
    .time {
      float: right;
    }
  }
  
  @media (max-width: 650px) {
    .article-list .time {
      float: left;
    }
  }
</style>
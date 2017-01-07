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

  import marked from 'marked'
  import {
    getIssuesPage,
    getAllIssues
  } from '../services/issues.js'
  import sesStorage from '../libs/sessionStorage.js'
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

        let allArticles = sesStorage('articles')
        if (!allArticles) {
          getIssuesPage(this.params).then(data => {
            //console.log(data)
            this.articles = data.map(item => {
              return {
                number: item.number,
                created_at: item.created_at,
                title: item.title,
                markdown: item.body,
                html: marked(item.body)
              }
            })
            let reg = /^<p>.+<\/p>/i
            this.articles.forEach(item => {
              item.summary = reg.exec(item.html)[0]
            })
          }).catch(() => {
            this.net_error = true
          })
          getAllIssues().then(length => this.totalArticles = length)
        } else {
          this.articles = allArticles.slice((this.params.page - 1) * this.params.per_page, this.params.page * this.params.per_page)
          this.totalArticles = allArticles.length
        }
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
  
  .spinner {
    margin: 50px auto;
    height: 150px;
    width: 150px;
    border-radius: 50%;
    background-color: #1976D2;
    -webkit-animation: single6 1s infinite ease-in;
    animation: spinner 1s infinite ease-in;
  }
  
  @keyframes spinner {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
  
  .error-tip {
    text-align: center;
    margin-top: 50px;
  }
</style>
<template>
  <div class="home-page">
    <h1>{{ msg }}</h1>
    <ul class="article-list">
      <li v-for="article of articles">
        <router-link :to="'articles/' + article.number.toString()">
          <h2>{{article.title}}</h2>
          <div v-html="article.summary"></div>
          <p>阅读全文 <span>Posted at {{article.created_at}}</span></p>
        </router-link>
      </li>
    </ul>
    <div v-if="net_error">暂时无法连接服务器，请稍后再来^_^</div>
    <p>{{totalArticles}}</p>  
    <div class="page">
      <router-link :to="{path: 'articles', query: {page: 2}}">下一页</router-link>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import {
    getIssuesPage,
    getAllIssues
  } from '../services/issues.js'
  import sesStorage from '../libs/sessionStorage.js'

  let params = {
    page: 1,
    per_page: 2
  }

  export default {
    name: 'home-page',
    data: function() {
      return {
        msg: '文章列表',
        articles: [],
        totalArticles: '',
        net_error: false
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
        if (!this.$route.query.page) {
          params.page = 1
        } else {
          params.page = parseInt(this.$route.query.page, 10)
        }

        let allArticles = sesStorage('articles')
        if (!allArticles) {
          getIssuesPage(params).then(data => {
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
          }).catch(err => {
            this.net_error = true
          })
          getAllIssues().then(length => this.totalArticles = length)
        } else {
          this.articles = allArticles.slice((params.page - 1) * params.per_page, params.page * params.per_page)
          this.totalArticles = allArticles.length
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  a {
    text-decoration: none;
  }
</style>
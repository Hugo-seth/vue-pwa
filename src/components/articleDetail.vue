<template>
  <div class="detail-page">
    <h2>{{article.title}}</h2>
    <div class="content" v-html="article.html"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import sesStorage from '../libs/sessionStorage.js'
  import {
    getSingleIssue
  } from '../services/issues.js'

  export default {
    name: 'article-detail',
    data: function() {
      return {
        article: ''
      }
    },
    created: function() {
      //console.log(this.$route)
      let number = parseInt(this.$route.params.number, 10)
      let articles = sesStorage('articles')
      if (!articles) {
        getSingleIssue(number).then(data => {
          //console.log(data)
          this.article = {
            number: data.number,
            created_at: data.created_at,
            title: data.title,
            markdown: data.body,
            html: marked(data.body),
            comments_url: data.html_url + '#partial-timeline-marker'
          }
        })
      } else {
        this.article = articles.filter(item => {
          return item.number === number
        })[0]
      }
    }
  }
</script>

<style lang="scss">
  .detail-page {
    .content {
      background: #fff;
    }
    a {
      color: #1976D2;
    }
    pre,
    code {
      background: rgba(0, 0, 0, 0.1);
    }
    pre {
      padding: 15px;
    }
    pre>code {
      background-color: transparent;
    }
    img {
      width: center;
    }
  }
</style>
<template>
  <div class="detail-page">
    <h2>{{article.title}}</h2>
    <p class="time">Posted at {{article.created_at | formatDate}}</p> 
    <div class="content" v-html="article.html"></div>
  </div>
</template>

<script>
  import marked from 'marked'
  import sesStorage from '../libs/sessionStorage.js'
  import {
    getSingleIssue
  } from '../services/issues.js'
  import formatDate from '../filters/formatDate.js'

  export default {
    name: 'article-detail',
    data: function() {
      return {
        article: ''
      }
    },
    created: function() {
      window.scrollTo(0, 0)
        //console.log(this.$route)
      let number = parseInt(this.$route.params.number, 10)

      getSingleIssue(number).then(data => {
        this.article = data
      })
    }

  }
</script>

<style lang="scss">
  .detail-page {
    .time {
      text-align: right;
    }
    .content {
      background: #fff;
    }
    a {
      color: #1976D2;
      &:hover {
        text-decoration: underline;
      }
    }
    pre,
    code {
      background: rgba(0, 0, 0, 0.1);
    }
    pre {
      padding: 15px;
      overflow-x: auto;
    }
    p>code {
      word-break: break-all;
    }
    pre>code {
      background-color: transparent;
    }
  }
</style>
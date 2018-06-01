<template>
  <div class="detail-page">
    <h2>{{item.title}}</h2>
    <p class="time">Posted at {{item.created_at | formatDate}}</p> 
    <div class="content" v-html="item.html"></div>
  </div>
</template>

<script>
export default {
  name: 'article-detail',
  asyncData({ store }) {
    return store.dispatch('FETCH_ITEMS')
  },
  computed: {
    item() {
      const number = parseInt(this.$route.params.number, 10)
      const state = this.$store.state
      const arr = state.activeItems.length > 0 ? state.activeItems : state.items
      let item
      for (const v of arr) {
        if (v.number === number) {
          item = v
          break
        }
      }
      return item
    }
  }
}
</script>

<style lang="less">
.detail-page {
  .time {
    text-align: right;
  }
  .content {
    background: #fff;
  }
  a {
    color: #1976d2;
    &:hover {
      text-decoration: underline;
    }
  }
  blockquote {
    margin: 0;
    padding: 5px 10px;
    border-left: 2px solid #1976d2;
    p {
      margin-top: 0;
      margin-bottom: 0;
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
  p > code {
    word-break: break-all;
  }
  pre > code {
    background-color: transparent;
  }
}
</style>
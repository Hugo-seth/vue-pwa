<template>
  <div class="home-page">
    <!-- <div v-show="activeItems.length === 0 && !error" class="spinner"></div> -->
    <ul class="article-list">
      <li v-for="item of activeItems" :key="item.id">
          <h2>{{item.title}}</h2>
          <div class="article-summary" v-html="item.summary"></div>
          <p class="clearfix">
            <router-link :to="'/articles/' + item.number">阅读全文 
              <span class="time">Posted at {{item.created_at | formatDate}}</span>
            </router-link>
          </p>
      </li>
    </ul>
    <div class="error-tip" v-if="error">暂时无法连接服务器，请稍后再来^_^</div>
    <div v-if="count">
      <pagination :count="count" :page="page" :size="size"></pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '../components/Pagination.vue'

export default {
  name: 'home-page',
  components: {
    Pagination
  },
  asyncData({ store }) {
    return store.dispatch('FETCH_ITEMS')
  },
  computed: {
    page() {
      const page = Number(this.$route.query.page) || 1
      this.$store.commit('SET_ACTIVE_ITEMS', { page })
      return page
    },
    ...mapState(['size', 'count', 'error', 'activeItems'])
  }
}
</script>

<style lang="less" scoped>
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
import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../views/HomePage.vue'

Vue.use(Router)

// route-level code splitting
const ArticleDetail = () => import('../views/ArticleDetail.vue')

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: HomePage },
      {
        path: '/articles/:number',
        component: ArticleDetail
      },
      { path: '*', redirect: '/' }
    ]
  })
}

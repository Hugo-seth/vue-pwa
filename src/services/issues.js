import marked from 'marked'
import Promise from 'promise'

import http from './common/common.js'
import sesStorage from '../libs/sessionStorage.js'

const baseUrl = '/issues'

export function getIssuesPage(params) {
  return http('get', baseUrl, params)
}

export function getSingleIssue(number) {
  let url = baseUrl + '/' + number
  return http('get', url)
}

export function getAllIssues() {
  return new Promise(function(resolve, reject) {
    http('get', baseUrl).then(data => {
      //console.log(data)
      resolve(data.length)
      let articles = data.map(item => {
        return {
          id: item.id,
          number: item.number,
          created_at: item.created_at,
          title: item.title,
          markdown: item.body,
          html: marked(item.body),
          html_url: item.html_url,
          comments_url: item.html_url + '#partial-timeline-marker'
        }
      })
      let reg = /^<p>.+<\/p>/i
      articles.forEach(item => {
        item.summary = reg.exec(item.html)[0]
      })
      sesStorage('articles', articles)
      console.log(sesStorage('articles'))
    })
  })
}
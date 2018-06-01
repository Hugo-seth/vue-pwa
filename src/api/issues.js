import marked from 'marked'
import Promise from 'promise'

import http from './http.js'

const baseUrl = '/issues'

function getAllIssues() {
  return new Promise(function(resolve, reject) {
    http('get', baseUrl)
      .then(data => {
        resolve(_invertData(data))
      })
      .catch(error => {
        reject(error)
      })
  })
}

function _invertData(arr) {
  let articles = arr.map(item => ({
    id: item.id,
    number: item.number,
    created_at: item.created_at,
    title: item.title,
    // markdown: item.body,
    html: marked(item.body),
    // html_url: item.html_url,
    // comments_url: item.html_url + '#partial-timeline-marker'
  }))
  let reg = /<p>.+<\/p>/
  articles.forEach(item => {
    let result = reg.exec(item.html)
    item.summary = result ? result[0] : null
  })

  return articles
}

export { getAllIssues }

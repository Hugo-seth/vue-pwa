import marked from 'marked'
import Promise from 'promise'

import http from './common/common.js'
import sesStorage from '../libs/sessionStorage.js'

const baseUrl = '/issues'

function getIssuesPage(params) {
  return new Promise(function(resolve, reject) {
    let allArticles = sesStorage('articles')
    if (!allArticles) {
      http('get', baseUrl, params).then(data => {
        //console.log(data)
        let _data = data.map(item => {
          return {
            number: item.number,
            created_at: item.created_at,
            title: item.title,
            markdown: item.body,
            html: marked(item.body)
          }
        })
        let reg = /^<p>.+<\/p>/i
        _data.forEach(item => {
          item.summary = reg.exec(item.html)[0]
        })
        resolve(_data)
      }).catch((error) => {
        reject(error)
      })
    } else {
      let _data = allArticles.slice((params.page - 1) * params.per_page, params.page * params.per_page)
      resolve(_data)
    }
  })
}

function getSingleIssue(number) {
  let url = baseUrl + '/' + number
  return new Promise(function(resolve, reject) {
    let allArticles = sesStorage('articles')
    if (!allArticles) {
      http('get', url).then(data => {
        //console.log(data)
        let _data = {
          number: data.number,
          created_at: data.created_at,
          title: data.title,
          markdown: data.body,
          html: marked(data.body),
          comments_url: data.html_url + '#partial-timeline-marker'
        }
        resolve(_data)
      }).catch((error) => {
        reject(error)
      })

      setTimeout(getAllIssues, 500) // pre load
    } else {
      let _data = allArticles.filter(item => {
        return item.number === number
      })[0]
      resolve(_data)
    }
  })
}

function getAllIssues() {
  return new Promise(function(resolve, reject) {
    let allArticles = sesStorage('articles')
    if (allArticles) {
      resolve(allArticles)
    } else {
      http('get', baseUrl).then(data => {
        //console.log(data)
        resolve(data)
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
          // console.log(sesStorage('articles'))
      }).catch((error) => {
        reject(error)
      })
    }
  })
}

export { getIssuesPage, getSingleIssue, getAllIssues }
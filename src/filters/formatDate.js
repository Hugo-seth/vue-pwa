import Vue from 'vue'

Vue.filter('formatDate', function(value) {
  return new Date(value).toLocaleString()
})

const formatDate = Vue.filter('formatDate')

export default formatDate
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  *:focus {
    outline: 0;
  }
  
  a {
    color: #2c3e50;
    text-decoration: none;
  }
  
  a:hover,
  a:hover a {
    color: #1976D2;
  }
  
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 650px;
    margin: 0 auto;
    padding: 0 15px;
  }
  
  h1 {
    text-align: center;
  }
</style>
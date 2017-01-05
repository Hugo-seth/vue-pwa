<template>
  <div>
    <div id="app" class="app">
      <div class="header">
        <a href=""><h1>Hugo's blog</h1></a>
      </div>
      <div class="content">
        <router-view></router-view>  
      </div>              
    </div>  
    <div id="particles-js"></div> 
  </div> 
</template>

<script>
  import 'particles.js'
  export default {
    name: 'app',
    created: function() {
      //console.log(document.documentElement.clientWidth)
      if (document.documentElement.clientWidth > 1000) {
        particlesJS.load('particles-js', 'static/particles.json', function() {
          console.log('callback - particles.js config loaded')
        })
      }
    }
  }
</script>

<style lang="scss">
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
  
  .clearfix::before {
    content: ' ';
    display: table;
  }
  
  .clearfix::after {
    clear: both;
  }
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
  
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    line-height: 1.4;
    .header {
      height: 450px;
      background: transparent url(assets/bg.png) 0 0 no-repeat;
      background-size: cover;
      h1 {
        margin-top: 0;
        position: relative;
        top: 60px;
        font-size: 2.5em;
      }
    }
    .content {
      margin-bottom: 100px;
      padding: 0 15px;
    }
  }
  
  .particles-js-canvas-el {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -99;
  }
  
  @media (min-width: 850px) {
    .content {
      width: 960px;
      margin: 0 auto;
    }
  }
  
  h1,
  h2 {
    font-size: 1.8em;
    text-align: center;
  }
</style>
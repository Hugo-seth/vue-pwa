<template>
  <div id="app">
    <div class="app">
      <div class="header">
        <a href=""><h1>Hugo's blog</h1></a>
        <ul class="nav">
          <li>
            <a href="//github.com/Hugo-seth" target="_blank">
              <i class="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a href="//www.zhihu.com/people/shenqihui1992/" target="_blank">
              <span class="zhihu" aria-hidden="true"></span>
            </a>
          </li>
        </ul>
      </div>
      <div class="content">
        <router-view></router-view>  
      </div>
      <div class="footer">
        <p>Copyright © Hugo's Blog 2017</p>  
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
      window.particlesJS.load('particles-js', '/particles.json')
    }
  }
}
</script>

<style lang="less">
a {
  color: #2c3e50;
  text-decoration: none;
}

a:hover,
a:hover a {
  color: #1976d2;
}

.clearfix {
  overflow: hidden;
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
    h1 {
      margin-top: 0;
      padding-top: 20px;
      font-size: 2.5em;
    }
    .nav {
      list-style: none;
      text-align: center;
      padding-left: 0;
      li {
        display: inline-block;
        font-size: 60px;
        position: relative;
      }
    }
    .zhihu {
      display: inline-block;
      margin-left: 30px;
      position: relative;
      top: -10px;
      width: 2em;
      line-height: 2;
      font-size: 26px;
      color: #fff;
      background: #2c3e50;
      border-radius: 50%;
      transition: all 0.1s linear;
      &:after {
        content: '知';
      }
      &:hover {
        color: #fff;
        background: #1976d2;
      }
    }
  }
  .content {
    margin-bottom: 80px;
    padding: 0 15px;
  }
  .footer {
    text-align: center;
    margin: 30px 0;
  }
}

.particles-js-canvas-el {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -99;
}

@media (min-width: 900px) {
  .app {
    .header {
      height: 450px;
      background: transparent url(assets/bg.png) center 0 no-repeat;
      background-size: contain;
      h1 {
        padding-top: 60px;
      }
    }
  }
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

.spinner {
  margin: 50px auto;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  background-color: #1976d2;
  animation: spinner 1s infinite ease-in;
}

@keyframes spinner {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

.error-tip {
  text-align: center;
  margin-top: 50px;
}
</style>
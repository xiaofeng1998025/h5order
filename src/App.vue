<template>
  <div id="app">

          <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
    body,h1,h2,h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
    ul,ol {list-style:none;}
    a{text-decoration:none;}
    a:hover { text-decoration:underline; }
    fieldset, img { border:0;display: block; }
    html {
        font-size: calc(100vw/3.75);
    }
    body{
        font-size: 0.14rem;
        color: #333;
        background:#EDEDED;
        font-family:"Microsoft YaHei";
    }
    #trans-tooltip,#tip-arrow-bottom,#tip-arrow-top,#trans-content {
        width: 0 !important;
        height: 0 !important;
        padding: 0;
    }
    #trans-tooltip>div{
        width: 0 !important;
        height: 0 !important;
        padding: 0;

    }
</style>

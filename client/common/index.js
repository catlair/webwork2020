Vue.component('common-header', {
    template: `
 <nav class="navbar navbar-inverse navbar-fixed-top app_top_b" style="position: relative">
  <div class="index-login-wrap" style="position: absolute;right: 20px;top:140px;color: #00a2e5">
    <a href="./login.html">登录</a>
    <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
    <a href="./reg.html">注册</a>
  </div>
  <div class="container">
    <div class="navbar-header">
    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="../index.html"><img src="../images/logo.png" alt=""></a>
    </div>
    <div id="navbar" class="collapse navbar-collapse">
    <ul class="nav navbar-nav"> 
         <li  :class="{active:includes(item[1])}" v-for="item in text" :key="item[0]">
            <a :href="item[1]+'.html'">{{item[0]}}</a>
         </li>
    </ul>
    </div>
  </div>
</nav>
    `,
    data() {
        return {
            text: [['网站首页', 'index'],
                ['养生文化', 'yswenh'],
                ['食谱展示', 'spzhans'],
                ['养生食材', 'ysshicai'],
                ['运动养生', 'ydys'],
                ['养生哲学', 'zhexue'],
                ['给我留言', 'lianx']]
        }
    },
    methods: {
        includes(arg) {
            const pathname = window.location.pathname;
            if (pathname === '/') return arg === 'index';
            return pathname.includes(arg);
        }
    }
});

Vue.component('common-footer', {
    template: `
<div class="footer" style="height: 80px">
    <div class="top px1200">
      
    </div>
    <div class="baian">
         All rights reserved. 渝ICP备19090090号-1
    </div>
</div>
    `,
});


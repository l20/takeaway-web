import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

// 全局注册使局部变量全局化
Vue.use(VueRouter);
Vue.use(VueResource);

// 注册一个数值过滤器返回保留两位小数的人民币字符串
Vue.filter('RMB', function(value) {   // 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    let pF = parseFloat(value);
    if (isNaN(pF)) {
      return false;
    };
    let f = Math.round(value * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    };
    while (s.length <= rs + 2) {
      s += '0';
    };

    return '¥' + s;
});

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/goods': {
    component: goods
  },
  '/ratings': {
    component: ratings
  },
  'seller': {
    component: seller
  }
});

router.start(app, '#app');
router.go('/goods');

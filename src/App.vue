<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script  type="text/ecmascript-6">
  import header from 'components/header/header';

  const ERRO_OK = 0;  // 常量宏定义

  export default {
//    组件可以被复用，所以在这里data要以函数形式定义，因为如果定
//    义成对象，当值的改变也会影响到其他组件。
    data() {
      return {
        seller: {}
      };
    },
    created() {
      this.$http.get('api/seller').then(response => {
        response = response.body;
        if (response.errno === ERRO_OK) {
          this.seller = response.data;
        };
      }, response => {
//        失败的回调处理
      });
      /**
       * 箭头函数response => {}相当于es5
       * function(response){
       *    return {};
       * }
       */
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>

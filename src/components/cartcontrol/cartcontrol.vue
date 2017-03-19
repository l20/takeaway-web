<template>
  <div class="cartcontrol">
    <!--按钮动画分两层，cart-decrease为平移渐变，inner为旋转-->
    <div class="cart-decrease" transition="move" @click.stop.prevent="decreaseCart($event)" v-show="food.count>0">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      ;
    },
    methods: {
//      增加商品数量
      addCart(event) {
//        过滤PC浏览器原生事件
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
//          新添加的属性必须使用vue的全局方法set添加，否则vue无法监测这个属性数据的变化
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }
//        使用$dispatch派发一个自定义事件将当前元素传给监听器
        this.$dispatch('cart.add', event.target);
      },
//      减少商品数量
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
//          新添加的属性必须使用vue的全局方法set添加，否则vue无法监测这个属性数据的变化
          Vue.set(this.food, 'count', 1);
          this.food.count = 1;
        } else {
          this.food.count --;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all 0.4s linear
      /*动画结束*/
      &.move-transition
        opacity 1
        /*3D加速，使动画更流畅*/
        transform translate3d(0, 0, 0)
        .inner
          display inline-block
          font-size 24px
          line-height 24px
          color rgb(0, 160, 220)
          transition all 0.4s linear
          transform rotate(0)
      &.move-enter, &.move-leave
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)

    .cart-count
      display inline-block
      font-size 10px
      line-height 24px
      vertical-align top
      width 12px
      text-align center
      padding-top 6px
      color rgb(147, 153, 159)

    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>

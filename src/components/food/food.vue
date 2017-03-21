<template>
  <div class="food"  v-show="showFlag" transition="move" v-el:food>
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image">
        <!--<img src="./cover.png">-->
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}</span>
          <span class="rating">好评率{{food.rating}}</span>
        </div>
        <div class="price">
          <span class="now">{{food.price | currency '¥'}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice | currency '¥'}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" @click="addFirst" v-show="!food.count || food.count===0" transition="fade">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect
          :desc="desc"
          :ratings="food.ratings"
          :select-type="selectType"
          :only-content="onlyContent"
        ></ratingselect>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import split from 'components/split/split';
  import cartcontrol from 'components/cartcontrol/cartcontrol';
  import ratingselect from 'components/ratingselect/ratingselect';

  //  const POSITIVE = 0;
  //  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      show() {
        this.showFlag = true;
//        根据类型显示商品评论标签
        this.selectType = ALL;
        this.onlyContent = true;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) return;
        if (!this.food.count) {
//          新添加的属性必须使用vue的全局方法set添加，否则vue无法监测这个属性数据的变化
          Vue.set(this.food, 'count', 1);
        }
//        使用$dispatch派发一个自定义事件将当前元素传给监听器
        this.$dispatch('cart.add', event.target);
      }
    },
    components: {
      cartcontrol,
      ratingselect,
      split
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #ffffff
    &.move-transition
      transition all 0.5s ease
      transform translate3d(0,0,0)

    &.move-enter, &.move-leave
      transform translate3d(100%, 0, 0)
    /* 这里的padding-top是以容器的宽度一致 */
    .img-header
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 10px
          font-size 20px
          color #ffffff
    .content
      padding 18px
      position relative
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px

      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 12px
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 10
        height 24px
        line-height 24px
        padding 0 12px
        box-sizing border-box
        border-radius 12px
        font-size 10px
        color #ffffff
        background rgb(0, 160, 220)
        &.fade-transition
          transition all 0.2s
          opacity 1
        &.fade-enter, &.fade-leave
          opacity 0
    .info
      padding 18px
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color #4d555d

    .rating
      padding-top 18px
      .title
        line-height 14px
        margin-left 18px
        font-size 14px
        color rgb(7, 17, 27)

</style>

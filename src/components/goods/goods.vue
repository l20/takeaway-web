<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current': currentIndex === $index}" @click="selectMenu($index, $event)">
          <span class="text border-1px">
            <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            <span>{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:food-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" @click="selectFood(food, $event)" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">{{food.price | currency '¥'}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice | currency '¥'}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--父组件通-ref过获取子组件数据-->
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
  <food :food="selectedFood" v-ref:food></food>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import food from 'components/food/food';
  import shopcart from 'components/shopcart/shopcart';
  import cartcontrol from 'components/cartcontrol/cartcontrol';

  const ERR_OK = 0;

  export default {
//    通过props从父组件传过来的数据
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    created() {
//      定义上商品的类型类名，用于使用不同的图标样式
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
//      vue的ajax插件vue-resource，请求后台数据
      this.$http.get('api/goods').then(response => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
//          操作dom的时候为了保证数据更新变化，调用nextTick接口
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        };
      });
    },
    computed: {
//      获取当前列表元素索引值
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
//          当遍历到数值最后一个元素时listHeight[i + 1]会undefined，所以要判断这种情况出现
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      /**
       * 在原生浏览器（PC）下回触发两次事件，为了防止这样情况发生，把event的事件（better-scroll的事件）传进来处理
       * better-scroll的事件和浏览器原生事件有个区别是，better-scroll事件有_constructed属性而原生浏览器的事件没有
       * 所以利用这个属性区别可以判断过滤掉一个事件。
       */
      selectMenu(index, event) {
        if (!event._constructed) return;
        let foodlist = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
//        better-scroll滚动函数，参数1为滚动到的元素，参数2为动画过渡时间
        this.foodsScroll.scrollToElement(foodlist[index], 500);
      },
      _initScroll() {
//        实例化两个better-scroll，让左右两列拥有滑动效果
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
//          better-scroll默认禁止当前滑动元素的默认事件，在这里设置click属性开启
          click: true
        });
        this.foodsScroll = new BScroll(this.$els.foodWrapper, {
          probeType: 3,
          click: true
        });
//        better-scroll的一scroll事件不断更新右边栏的Y轴数据
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
//        vue通过v-el指令把当前元素传过来，使用$els接收
        let foodlist = this.$els.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
//        循环累加计算右边列表的各项商品高度，
        for (let i = 0; i < foodlist.length; i++) {
          height += foodlist[i].clientHeight;
          this.listHeight.push(height);
        }
      },
      _drop(target) {
//        体验优化，异步执行下落动画
        this.$nextTick(() => {
//        父组件通过$refs调用子组件的drop方法
          this.$refs.shopcart.drop(target);
        });
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
//        调用子组件的show方法
        this.$refs.food.show();
      }
    },
    components: {
//      注册组件
      food,
      shopcart,
      cartcontrol
    },
//    自定义事件监听器
    events: {
//      target是在点击时，自定义事件cart.add传过来的“+”小按钮元素
      'cart.add' (target) {
//        将元素传给当前组件（goods组件）的drop方法
        this._drop(target);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base"
  @import "../../common/stylus/mixin"

  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #ffffff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')

        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px

    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px;
          .extra
            .count
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
            right 0
            bottom 12px
</style>

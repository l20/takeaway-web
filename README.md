## 基于vue的外卖web APP

> 从jQuery跨越到MVXX框架学习花了很长一段时间，因为这是一个观念上的转变问题，因为熟悉了指令式的jq开发一下跨入框架未免有些反应不过来，所以在长期的学习摸索有了一个感性认识之后，为了巩固所学于是才有这个demo，说它是demo不过分，因为没有使用vuex之类的来构建大型应用，组件间通信都是evenbus。而且模拟后端的数据过于简洁，不过总算是满足平时的web业务代码开发需求的，demo展示的是一个外卖app的单个商家商品展示，实际开发以此demo为商家模板，根据城市、地址等作为路由入口，获取城市商家数据输出到模板。

## Technology stack
:wrench: vue  

:wrench: vue-router  

:wrench: webpack  

:wrench: ES6  

:wrench: vue-resource  

:wrench: stylus  

:wrench: better-scroll


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# server at 8088

cd vue-food/

node start.js

```

## function

- [x] better-scroll 滑动动画
- [x] 购物车商品加减组件化可重复使用
- [x] 添加商品到购物车，组件间使用事件通信完成数据同步、状态同步
- [x] 获取node jso模拟的数据库数据，根据条件列表渲染出数据如，商品、商品评论按类型显示
- [x] 获取商家店铺数据渲染

## demo online

> 处女座、强迫症提示：要在新窗口打开连接的请手动使用鼠标右键打开新窗口方式打开连接，因为我还不知道在markdown中如何以新窗口方式打开连接，知道的求告知。:kissing_heart:

:point_right:[http://food.alanwong.tech](http://food.alanwong.tech/)

## Screenshot

#### home page & head
<img src="https://img.alicdn.com/imgextra/i3/690341282/TB2KWqvnxRDOuFjSZFzXXcIipXa_!!690341282.gif" alt=" home.gif"/> <img src="https://img.alicdn.com/imgextra/i2/690341282/TB2OXeOtAqvpuFjSZFhXXaOgXXa_!!690341282.gif" alt=" head.gif"/>
#### food & shopcart
<img src="https://img.alicdn.com/imgextra/i1/690341282/TB2rPzEtypnpuFjSZFkXXc4ZpXa_!!690341282.gif" alt=" food.gif"/> <img src="https://img.alicdn.com/imgextra/i1/690341282/TB2wZIQql8lpuFjSspaXXXJKpXa_!!690341282.gif" alt=" shopcart.gif"/>
#### rangtings & seller
<img src="https://img.alicdn.com/imgextra/i2/690341282/TB2jyzptyRnpuFjSZFCXXX2DXXa_!!690341282.gif" alt=" ratings.gif"/> <img src="https://img.alicdn.com/imgextra/i3/690341282/TB2p9ZbqhXkpuFjy0FiXXbUfFXa_!!690341282.gif" alt=" seller.gif"/>

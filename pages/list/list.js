const app = getApp()
const fetch = getApp().fetch
var categoryHeight = [] // 右列表各分类高度数组

Page({
  // 在页面渲染的变量, 必须放在data里面. //不在data里面的变量,不能在页面显示.
  data: {
    activeIndex: 0,
    tapIndex: 0,
    foodList: '',
    cartList: {   },
      cartPrice: 0,
      cartNumber: 0,
    cartBall: {
      show: false,
      x: 0,
      y: 0
    },
    showCart: false,
    promotion: {}
  },
  changingCategory: false, // 是否正在切换左侧激活的分类（防止滚动过快时切换迟缓）
  shopcartAnimate: null,
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中...'
    })
    fetch('food/list').then(data => {
      wx.hideLoading() //获取了数据之后隐藏这个loading
      for (var i in data.list) {
        this.setData({//这是为第一个索引值.
          activeIndex: i
        })
        break
      }
console.log("接受到的foodlist")
      console.log(data.list)
      //把data.list放入网页中.
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0]
      }, () => {//setData,后一个参数是这个回调函数. 用来更新这个categoryHeight值.
        var query = wx.createSelectorQuery()
        var top = 0
        query.select('.food').boundingClientRect(rect => {
          top = rect.top
        })
        query.selectAll('.food-category').boundingClientRect(res => {
          res.forEach(rect => {
            categoryHeight[rect.id.substring(rect.id.indexOf('_') + 1)] = rect.top - top
          })
        })
        query.exec()
        console.log('类别的高度',categoryHeight)
      })
    }, () => {
      this.onLoad()
    })
    this.shopcartAnimate = shopcartAnimate('.cart-icon', this)
  },






  tapCategory: function(e) {
      console.log(e,1111111111111111111111111)
    var index = e.currentTarget.dataset.index
    // console.log(111111111,index)
    this.changingCategory = true 
    console.log(111,this.changingCategory, 'this.changingCategory状态')
    // 利用这个flag: changingCategory 来让tapCategory 和onFoodScroll 不会循环触发.
    this.setData({
      activeIndex: index,
      tapIndex: index,
      // changingCategory:true
    }, () => {
    //   this.changingCategory = false
      console.log(8888888,categoryHeight)
      console.log(8888888,index,'设置cateory')
    })
  },








  onFoodScroll: function(e) {
    console.log(e,2222222222222222222222222)
    console.log("change daiyabin ",this.changingCategory)
    console.log('触发了onfoodscrooll函数')
    var scrollTop = e.detail.scrollTop
    var activeIndex = 0
    console.log('当前的纵坐标',scrollTop)

    categoryHeight.forEach((item, i) => {
      if (scrollTop >= item) {
        activeIndex = i
        
      }
    })
    if (this.changingCategory) {
      this.changingCategory = false;
      this.setData({
        changingCategory : false
      })
    } else {
      this.setData({
        activeIndex: activeIndex,
      }, () => {
        this.changingCategory = false
    
      })
    }
    // if (!this.changingCategory) {
        console.log('触发了onFoodScroll中的changingCategory')
        console.log('最后设置category',activeIndex)
    //   this.changingCategory = true
     
    // }
  },
  scrolltolower: function() {
    // this.setData({
    //   activeIndex: categoryHeight.length - 1
    // })
  },
  addToCart: function(e) {
    var id = e.currentTarget.dataset.id
    console.log(id, 'iiiiiiiiddddddddddd')
    console.log(e.currentTarget, 'dataset')
    console.log(e.currentTarget.dataset, 'dataset!!!!!!!!!!!!!!!')
    console.log(33333333333333,e.currentTarget.dataset.category_id)
    var category_id = e.currentTarget.dataset.category_id
    var aaaa=this.data.foodList
    console.log(1111111111111111111111111,aaaa)
    var food=''
    for (var i in aaaa){
      console.log(333333333,aaaa[i])
      var tmp=aaaa[i].food
      // console.log(4444444444,tmp.food)
      for (var j in tmp){
        var kkk=tmp[j]
        console.log(993,kkk)
        console.log(992,kkk.id)
        console.log(991,id)
        if (kkk.id==id){
          food=kkk
        }
   
      }
      

    }
    console.log('找到 ',food)






    // var food = this.data.foodList[category_id].food[id]
    var cartList = this.data.cartList
    console.log(food, 'food')
    console.log(id, category_id, food, cartList)
    if (cartList[id]) {
      ++cartList[id].number
    } else {
      cartList[id] = {
        id: food.id,
        name: food.name,
        price: parseFloat(food.price),
        number: 1,
        image_url:food.image_url
      }
    }
    this.shopcartAnimate.show(e)
    console.log('5555555555555555',cartList,this.data.cartPrice,cartList[id].price)

    this.setData({
      cartList,
      cartPrice: this.data.cartPrice + cartList[id].price,
      cartNumber: this.data.cartNumber + 1
    })
    console.log(343243242342343242343243,this.data.cartList)
  },
  showCartList: function() {
    if (this.data.cartNumber > 0) {
      this.setData({
        showCart: !this.data.showCart
      })
    }
  },
  // 减少商品，最小数量为1
  cartNumberDec: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    if (cartList[id]) {
      var price = cartList[id].price
      if (cartList[id].number > 1) {
        --cartList[id].number
        this.setData({
          cartList,
          cartNumber: --this.data.cartNumber,
          cartPrice: this.data.cartPrice - price
        })
      } else {
        wx.showToast({
          icon: "none",
          title: '商品不可再减少~',
        })
        this.setData({
          cartList,
          cartNumber: this.data.cartNumber,
          cartPrice: this.data.cartPrice
        })
      }
    }
  },
  // 增加商品
  cartNumberAdd: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
      ++cartList[id].number
    this.setData({
      cartList,
      cartNumber: ++this.data.cartNumber,
      cartPrice: this.data.cartPrice + cartList[id].price
    })
  },
  // 删除商品
  cartNumberDel: function(e) {
    var id = e.currentTarget.dataset.id
    var cartList = this.data.cartList
    var price = cartList[id].price
    var num = cartList[id].number
    delete cartList[id]
    this.setData({
      cartList,
      cartNumber: this.data.cartNumber - num,
      cartPrice: this.data.cartPrice - num*price
    })
    if (this.data.cartNumber <= 0) {
      this.setData({
        showCart: false
      })
    }
  },
  // 清空购物车
  cartClear: function() {
    this.setData({
      cartList: {},
      cartNumber: 0,
      cartPrice: 0,
      showCart: false
    })
  },
  order: function() {
    if (this.data.cartNumber === 0) {
      return
    }
    wx.showLoading({
      title: '正在生成订单...'
    })
    console.log('3333333333333333333333333333333333')
    fetch('food/order', {
      order: this.data.cartList
    }, 'POST').then(data => {
      wx.navigateTo({
        url: '/pages/order/checkout/checkout?order_id=' + data.order_id
      })
      // console.log(data.order_id)
    }, () => {
      this.order()
    })
  }
})

function shopcartAnimate(iconClass, page) {
  var busPos = {}
  wx.createSelectorQuery().select(iconClass).boundingClientRect(rect => {
    busPos.x = rect.left + 15
    busPos.y = rect.top
  }).exec()
  return {
    show: function(e) {
      var finger = {
        x: e.touches[0].clientX - 10,
        y: e.touches[0].clientY - 10
      }
      var topPoint = {}
      if (finger.y < busPos.y) {
        topPoint.y = finger.y - 150
      } else {
        topPoint.y = busPos.y - 150
      }
      topPoint.x = Math.abs(finger.x - busPos.x) / 2
      if (finger.x > busPos.x) {
        topPoint.x = (finger.x - busPos.x) / 2 + busPos.x
      } else {
        topPoint.x = (busPos.x - finger.x) / 2 + finger.x
      }
      var linePos = bezier([busPos, topPoint, finger], 30)
      var bezier_points = linePos.bezier_points
      page.setData({
        'cartBall.show': true,
        'cartBall.x': finger.x,
        'cartBall.y': finger.y
      })
      var len = bezier_points.length
      var index = len
      let i = index - 1
      var timer = setInterval(function() {
        i = i - 5
        if (i < 1) {
          clearInterval(timer)
          page.setData({
            'cartBall.show': false
          })
          return
        }
        page.setData({
          'cartBall.show': true,
          'cartBall.x': bezier_points[i].x,
          'cartBall.y': bezier_points[i].y
        })
      }, 50)
    }
  }

  function bezier(pots, amount) {
    var pot
    var lines
    var ret = []
    var points
    for (var i = 0; i <= amount; ++i) {
      points = pots.slice(0)
      lines = []
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount))
        } else if (lines.length > 1) {
          points = lines
          lines = []
        } else {
          break
        }
      }
      ret.push(lines[0])
    }

    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance
      var ret = []
      pointA = points[0]
      pointB = points[1]
      xDistance = pointB.x - pointA.x
      yDistance = pointB.y - pointA.y
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2)
      tan = yDistance / xDistance
      radian = Math.atan(tan)
      tmpPointDistance = pointDistance * rate
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      }
      return ret
    }
    return {
      bezier_points: ret
    }
  }
}
// pages/record/record.js
const app = getApp()
const fetch = app.fetch

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中...',
    })
    console.log(109)


    // 登录
    console.log(113)
    console.log(115,app.globalData)
    console.log(115,app.globalData.userInfo)
    console.log(app.globalData.userInfo,112)
    if (app.globalData.userInfo) {
      console.log(160)
      console.log(app.globalData.userInfo,161)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo,111)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }



    fetch('food/record').then(
      data => { console.log(108,data)
      wx.hideLoading()
      this.setData(data)
    })
    console.log(this,110)





  },

  getUserInfo: function (e) {
    console.log(e,130)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  enableRefresh: false,
  onShow: function () {
    if (this.enableRefresh) {
      this.onLoad()
    } else {
      this.enableRefresh = true
    }
  }
})
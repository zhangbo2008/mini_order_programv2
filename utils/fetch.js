const config = require('./config');
module.exports = function (path, data, method) {// 这行表示这个文件名fetch就表示这个 定义的函数. 其他地方可以用fetch函数子.
  console.log('调用参数',path,data,method)
  var sess = wx.getStorageSync('PHPSESSID')
  return new Promise ((resolve, reject) => {
    wx.request({
      url: config.url + path,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': sess ? 'PHPSESSID=' + sess : ''
      },
      success: res => {
        
        console.log(res);
        if (res.header['Set-Cookie'] !== undefined) {
          sess = decodeCookie(res.header['Set-Cookie'])['PHPSESSID']
          wx.setStorageSync('PHPSESSID', sess)
        }
        // 请求成功
        if (res.statusCode !== 200) {
          fail('服务器异常！', reject)
          return
        }
        if (res.data.code === 0) {
          fail(res.data.msg, reject)
          return
        }
        resolve(res.data); //resolve函数, 传入的数据, 表示这个数据给后续的then函数使用.
      },
      fail: (e) => {
        console.log(e)
        // 请求失败
        fail('加载数据失败', reject)
      }
    })
  })
}

function fail(title, callback) {
  wx.hideLoading()
  wx.showModal({
    title,
    confirmText: '重试',
    success: res => {
      if (res.confirm) {
        callback()
      }
    }
  })
}

function decodeCookie(cookie) {
  var obj = {}
  cookie.split(',').forEach((item) => {
    item.split(';').forEach((item) => {
      var arr = item.split('=')
      obj[arr[0]] = arr[1] !== undefined ? decodeURIComponent(arr[1]) : true
    })
  })
  return obj
}
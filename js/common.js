// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.add('sidenav-pinned')
    document.body.classList.add('ready')
  }, 200)
})

//--------------------------------------------------
// bootstrap轻提示
const toastBox = document.querySelector('#myToast')
const toast = new bootstrap.Toast(toastBox, {
  animation: true, // 开启过渡动画
  autohide: true, // 开启自动隐藏
  delay: 3000 // 3000ms后自动隐藏
})
function tip(msg) {
  toastBox.querySelector('.toast-body').innerHTML = msg
  toast.show()
}

//--------------------------------------------------
//axios 配置
//根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'





//拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data; //axios 里有2层data，取消一层
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  if (error.response.status === 401) {
    tip('登录已过期，请重新登录')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-token')
    setTimeout(() => {
      location.href = './login.html'
    }, 1500);
  }
  return Promise.reject(error);
});









//--------------------------------------------------
//用户名展示和退出
const uname = document.querySelector('.media .font-weight-bold')
const utoken = document.querySelector('#logout')
if (uname) {
  uname.innerHTML = localStorage.getItem('user-name')
}
if (utoken) {
  utoken.addEventListener('click', () => {
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-token')
    location.href = './login.html'
  })
}
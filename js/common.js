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
//根路径
axios.defaults.baseURL = 'http://ajax-api.itheima.net'

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
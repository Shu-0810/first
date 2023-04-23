document.addEventListener('DOMContentLoaded', async () => {
  // const token = localStorage.getItem('user-token')
  // const res = await axios.get('/dashboard', {
  //   headers: {
  //     'Authorization': token
  //   }
  // })
  const res = await axios.get('/dashboard')
  console.log(res);
})
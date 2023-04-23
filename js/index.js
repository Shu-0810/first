document.addEventListener('DOMContentLoaded', async () => {
  // const token = localStorage.getItem('user-token')
  // const res = await axios.get('/dashboard', {
  //   headers: {
  //     'Authorization': token
  //   }
  // })

  //获取数据
  const { data } = await axios.get('/dashboard')
  console.log(data);
  //遍历添加就业薪资、班级人数、平均年龄、小组个数
  for (let k in data.overview) {
    document.querySelector(`[name=${k}]`).innerHTML = data.overview[k]
  }
  const yearMonth = data.year.map(item => item.month)
  const yearSalary = data.year.map(item => item.salary)
  console.log(yearMonth);
  console.log(yearSalary);
  lineEcharts(yearMonth, yearSalary)
})

function lineEcharts(yearMonth, yearSalary) {
  var chartDom = document.getElementById('line');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: '2021全学科薪资走势',
      top: 20,
      left: 10,
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: yearMonth,
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yearSalary,
        type: 'line',
        smooth: true,
        areaStyle: {
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#8bbffa' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }
    ]
  };

  option && myChart.setOption(option);
}
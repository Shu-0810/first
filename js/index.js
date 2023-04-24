document.addEventListener('DOMContentLoaded', async () => {
  //获取数据
  const { data } = await axios.get('/dashboard')
  console.log(data);
  //遍历添加就业薪资、班级人数、平均年龄、小组个数
  for (let k in data.overview) {
    document.querySelector(`[name=${k}]`).innerHTML = data.overview[k]
  }
  //渲染折线图
  lineEcharts(data)
  //渲染饼图
  pieEcharts(data)
})

function lineEcharts(data) {
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
      data: data.year.map(item => item.month),
      axisLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'value'
    },
    color: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [{
        offset: 0, color: '#8bbffa' // 0% 处的颜色
      }, {
        offset: 1, color: 'blue' // 100% 处的颜色
      }],
      global: false // 缺省为 false
    },
    series: [
      {
        data: data.year.map(item => item.salary),
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

function pieEcharts(data) {
  var chartDom = document.getElementById('salary');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    //标题及标题位置
    title: {
      text: '班级薪资分布',
      top: 10,
      left: 10
    },
    //提示
    tooltip: {
      trigger: 'item'
    },
    //图例位置
    legend: {
      bottom: 15,
      left: 'center'
    },
    //调色盘
    color: ['#ffa314', '#4096ff', '#20aaff', '#19b099'],
    series: [
      {
        name: '班级薪资分布',
        type: 'pie',
        //第一个内半径，第二个外半径
        radius: ['50%', '65%'],
        //定位位置
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          //圆角
          borderRadius: 15,
          //边框
          borderColor: '#fff',
          //每项之间的距离
          borderWidth: 4
        },
        //文本标签
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            // show: true,
            show: false,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        //文本连接线
        labelLine: {
          show: false
        },
        // data: [
        //   { value: 1048, name: 'Search Engine' },
        //   { value: 735, name: 'Direct' },
        //   { value: 580, name: 'Email' },
        //   { value: 484, name: 'Union Ads' },
        //   { value: 300, name: 'Video Ads' }
        // ]
        data: data.salaryData.map(item => {
          return {
            value: item.g_count + item.b_count,
            name: item.label
          }
        })
      }
    ]
  };

  option && myChart.setOption(option);
}
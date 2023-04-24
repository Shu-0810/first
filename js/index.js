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
  //渲染每组期望薪资
  hopeEcharts(data)
  //渲染两个饼图
  twoEcharts(data)
  //渲染地图
  chinaEcharts(data)
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

function hopeEcharts(data) {
  var chartDom = document.getElementById('lines');
  var myChart = echarts.init(chartDom);
  var option;
  console.log(data.groupData[1]);
  option = {
    xAxis: {
      type: 'category',
      axisLine: {
        //x轴的虚线
        lineStyle: {
          type: 'dashed',
          color: 'gary'
        }
      },
      data: data.groupData[1].map(item => item.name)
    },
    yAxis: {
      type: 'value',
      //图上的虚线
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '期望薪资',
        data: data.groupData[1].map(item => item.hope_salary),
        type: 'bar',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#2fb5a0' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#e8f8f4' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      },
      {
        name: '实际薪资',
        data: data.groupData[1].map(item => item.salary),
        type: 'bar',
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#409cf6' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#cce7fe' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        }
      }
    ]
  };

  option && myChart.setOption(option);

  document.querySelector('#btns').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      const blue = document.querySelector('.btn-blue')
      if (blue) blue.classList.remove('btn-blue')
      e.target.classList.add('btn-blue')
      // console.log(e.target.innerHTML);

      //更新图表
      const group = e.target.innerHTML
      option.xAxis.data = data.groupData[group].map(item => item.name)
      option.series[0].data = data.groupData[group].map(item => item.hope_salary)
      option.series[1].data = data.groupData[group].map(item => item.salary)
      option && myChart.setOption(option);
    }
  })
}

function twoEcharts(data) {
  var chartDom = document.getElementById('gender');
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    title: [
      {
        text: '男女薪资分布',
        left: 10
      },
      {
        subtext: '男生',
        left: '50%',
        top: '45%',
        textAlign: 'center'
      },

      {
        subtext: '女生',
        left: '50%',
        top: '90%',
        textAlign: 'center'
      }
    ],
    color: ['#fda224', '#5097ff', '#3abcfa', '#34d39a'],
    series: [
      {
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '75%'],
        data: data.salaryData.map(item => {
          return {
            value: item.b_count,
            name: item.label
          }
        }),
        label: {
          position: 'outer',
          alignTo: 'none',
          bleedMargin: 5
        },
      },

      {
        type: 'pie',
        radius: ['20%', '30%'],
        center: ['50%', '30%'],
        data: data.salaryData.map(item => {
          return {
            value: item.g_count,
            name: item.label
          }
        }),
        label: {
          position: 'outer',
          alignTo: 'none',
          margin: 20
        },
      }
    ]
  };

  option && myChart.setOption(option);
}

function chinaEcharts(data) {
  const myEchart = echarts.init(document.querySelector('#map'))
  const dataList = [
    { name: '南海诸岛', value: 0 },
    { name: '北京', value: 0 },
    { name: '天津', value: 0 },
    { name: '上海', value: 0 },
    { name: '重庆', value: 0 },
    { name: '河北', value: 0 },
    { name: '河南', value: 0 },
    { name: '云南', value: 0 },
    { name: '辽宁', value: 0 },
    { name: '黑龙江', value: 0 },
    { name: '湖南', value: 0 },
    { name: '安徽', value: 0 },
    { name: '山东', value: 0 },
    { name: '新疆', value: 0 },
    { name: '江苏', value: 0 },
    { name: '浙江', value: 0 },
    { name: '江西', value: 0 },
    { name: '湖北', value: 0 },
    { name: '广西', value: 0 },
    { name: '甘肃', value: 0 },
    { name: '山西', value: 0 },
    { name: '内蒙古', value: 0 },
    { name: '陕西', value: 0 },
    { name: '吉林', value: 0 },
    { name: '福建', value: 0 },
    { name: '贵州', value: 0 },
    { name: '广东', value: 0 },
    { name: '青海', value: 0 },
    { name: '西藏', value: 0 },
    { name: '四川', value: 0 },
    { name: '宁夏', value: 0 },
    { name: '海南', value: 0 },
    { name: '台湾', value: 0 },
    { name: '香港', value: 0 },
    { name: '澳门', value: 0 },
  ]

  //数据更新
  dataList.forEach((item) => {
    const obj = data.provinceData.find((it) => it.name.replace(/省|回族自治区|维吾尔自治区|壮族自治区|特别行政区|自治区/g, '') === item.name)
    if (obj) item.value = obj.value
  })
  let option = {
    title: {
      text: '籍贯分布',
      top: 10,
      left: 10,
      textStyle: {
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} 位学员',
      borderColor: 'transparent',
      backgroundColor: 'rgba(0,0,0,0.5)',
      textStyle: {
        color: '#fff',
      },
    },
    visualMap: {
      min: 0,
      max: 6,
      left: 'left',
      bottom: '20',
      text: ['6', '0'],
      inRange: {
        color: ['#ffffff', '#0075F0'],
      },
      show: true,
      left: 40,
    },
    geo: {
      map: 'china',
      roam: false,
      zoom: 1.0,
      label: {
        normal: {
          show: true,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)',
        },
      },
      itemStyle: {
        normal: {
          borderColor: 'rgba(0, 0, 0, 0.2)',
          color: '#e0ffff',
        },
        emphasis: {
          areaColor: '#34D39A',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 20,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    series: [
      {
        name: '籍贯分布',
        type: 'map',
        geoIndex: 0,
        data: dataList,
      },
    ],
  }
  myEchart.setOption(option)
}
import * as echarts from "../../../components/ec-canvas/echarts"
let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    tooltip: {
      trigger: 'none'
    },
    legend: {
      top: '45',
      right: '2',
      orient: 'vertical',
    },
    series: [
      {
        center:['30%','50%'],
        name: '工单分布',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        color: ["#FFC327","#0256FF","#189208"],
        data: [
          { value: 1048, name: '待开始' },
          { value: 735, name: '进行中' },
          { value: 580, name: '已完成' },
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}
Page({
    data: {
      city2Text: '这个月',
      city2Value: ['这个月'],
      city2Title: '',
      citys: [
        { label: '这个月', value: '这个月' },
        { label: '近两个月', value: '近两个月' },
        { label: '近三个月', value: '近三个月' },
      ],
      ec: {
        onInit: initChart
      },
    },
    onLoad(options) {
       
    },
    onColumnChange(e) {
      console.log('picker pick:', e);
    },
    onPickerChange(e) {
      const { key } = e.currentTarget.dataset;
      const { value } = e.detail;
      console.log('picker change:', e.detail);
      this.setData({
        [`${key}Visible`]: false,
        [`${key}Value`]: value,
        [`${key}Text`]: value.join(' '),
      });
    },
    onPickerCancel(e) {
      const { key } = e.currentTarget.dataset;
      console.log(e, '取消');
      console.log('picker1 cancel:');
      this.setData({
        [`${key}Visible`]: false,
      });
    },
    onTitlePicker() {
      this.setData({ cityVisible: true, cityTitle: '选择城市' });
    },

    onWithoutTitlePicker() {
      this.setData({ city2Visible: true, city2Title: '' });
    },

});

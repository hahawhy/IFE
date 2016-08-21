/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
//跨浏览器事件绑定
function addEventHandler(e,type,handler){
  if(e.addEventListener){
    e.addEventListener(type,handler,false);
  }else if(e.attachEvent){
    e.attachEvent("on"+type,handler);
  }else{
  e["on"+type] = handler;  //  e."on"+type(handler);
  }
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",//original value is -1...
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
console.log(chartData);
  var color="",inner="";
for(var key in chartData){
  //  console.log("key:"+key);
   color = "#"+Math.floor(Math.random()*0xffffff).toString(16);
   inner += "<div title='"+key+":"+chartData[key]+"' style='height:"+chartData[key]+"px; background-color:"+color+"'></div>";
}
var parent = document.getElementsByClassName("aqi-chart-wrap")[0];
parent.innerHTML = inner;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
if(this.value==pageState.nowGraTime){ return; }
pageState.nowGraTime =this.value;
  // 设置对应数据
initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
if(this.value==pageState.nowSelectCity){
  return;
}
pageState.nowSelectCity=this.value;
  // 设置对应数据
initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
var radios = document.getElementsByName("gra-time");
for(var i=0;i<radios.length;i++){
//  if(radios[i].checked){
    addEventHandler(radios[i],"click",graTimeChange);//这里用change可以吗？？
  //}
}
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
/*
var citys = Object.keys(aqiSourceData);//getOwnPropertyNames
var content="";
for(var item in citys){
   content += "<option>"+citys[item]+"</option>";
}
*/
var content="";
for(var key in aqiSourceData){
     content += "<option>"+key+"</option>";
}
var cityselect = document.getElementById("city-select");
cityselect.innerHTML = content;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
addEventHandler(cityselect,"change",citySelectChange);//注意change要加引号！！！！！！
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  var nowcity = aqiSourceData[pageState.nowSelectCity];
  //console.log(nowcity);
  console.log(pageState.nowGraTime);
if(pageState.nowGraTime=="day"){
  chartData = nowcity;
}
if(pageState.nowGraTime=="week"){
  chartData={};
  var nowweek=1,daycount=0,sum=0;
  for(var key in nowcity){
    daycount++;
    sum+=nowcity[key];
    if(new Date(key).getDay()==6){
      chartData["第"+nowweek+"周"]=parseInt(sum/daycount);
      nowweek++;
      daycount=0;
      sum=0;
    }
    if(daycount>0){
      chartData["第"+nowweek+"周"]=parseInt(sum/daycount);
    }
  }
}
if(pageState.nowGraTime=="month"){
  chartData={};
  //console.log("month");
  var nowmonth=1,daycount=0,sum=0;
  for(var key in nowcity){
  //  console.log(key.slice(5,7)==nowmonth);
  //  console.log("int"+parseInt(key.slice(5,7)));
    if(key.slice(5,7)==nowmonth){
      daycount++;
      sum+=nowcity[key];
    //  console.log("sum"+sum);
    }else{
      var ave = parseInt(sum/daycount);
    //  console.log("daycount"+daycount);
    //  console.log("ave"+Math.floor(sum/daycount));
      chartData["2016年"+nowmonth+"月"]=ave;
      nowmonth++;
      daycount=0;
      sum=0;
    }
    if(daycount>0){ //最后一个月没有满，所以把剩余部分进行求平均算作最后一个月的平均值
      chartData["2016年"+nowmonth+"月"]=parseInt(sum/daycount);
    }

  }
  //console.log(chartData);
}
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
var inputname = document.getElementById("aqi-city-input").value.trim();
var inputvalue = document.getElementById("aqi-value-input").value.trim();
//inputname = inputname.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
//var pattern1 =  /[^\a-\z\A-\Z\u4E00-\u9FA5]/;
var pattern1 = /^[a-zA-Z\u4E00-\u9FA5]+$/;
var pattern2 = /^[0-9]+$/;    // /^[\d]+$/
if(!inputname.match(pattern1)){
  alert("仅支持中英文字符");
  return;
}
if(!inputvalue.match(pattern2)){
  alert("请输入数字");
  return;
}
aqiData[inputname]=inputvalue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
var table = document.getElementById("aqi-table");
var content = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
for(var x in aqiData){
  content += "<tr><td>"+x+"</td><td>"+aqiData[x]+"</td><td><button class='del-row'>删除</button></td></tr>";
}
table.innerHTML = content;

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(it) {
  // do sth.
  var tr = it.parentNode.parentNode;
  var name = tr.firstChild.innerHTML;
  delete aqiData[name];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
var addBtn = document.getElementById("add-btn");
addBtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
var table = document.getElementById("aqi-table");
table.addEventListener("click",function(e){
  if(e.target && e.target.className == "del-row" ){
    delBtnHandle(e.target);
  }
});
}

init();

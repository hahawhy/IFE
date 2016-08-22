function addEventHandler(e,event,handler){
  if(e.addEventListener){
    e.addEventListener(event,handler,false);
  }else if(e.attachEvent){
    e.attachEvent("on"+event,handler);
  }else{
    e["on"+event] = handler;
  }
}
//var inputbox = document.getElementById("thenumber");
var leftin = document.getElementById("btn-in-left");
var rightin = document.getElementById("btn-in-right");
var leftout = document.getElementById("btn-out-left");
var rightout = document.getElementById("btn-out-right");
var numberbox=document.getElementsByClassName("box-number")[0];

var inputarea = document.getElementById("inputarea");
var insertbtn = document.getElementById("btn-insert");
var querytext = document.getElementById("querytext");
var querybtn = document.getElementById("btn-query");

addEventHandler(insertbtn,"click",insertContent);
addEventHandler(querybtn,"click",queryContent);

function getInputText(){
  var str=inputarea.value;
  var arr = str.split(/[^0-9a-zA-Z\u4E00-\u9FA5]+/);
  return arr;
}

function insertContent(){
  var myarr = getInputText();
  console.log("myarr: "+myarr);
  numberbox.innerHTML=myarr.map(function(key){
    return "<div class='num-element'>"+key+"</div>";
  }).join("");
}
function queryContent(){
//  console.log("query: "+querytext.value);
  var queryword = querytext.value.trim();
 //var pattern1 = "/["+queryword+"]/";
 //console.log("pattern1: "+pattern1);
  //console.log("326".match(/[6]/));
  var divs = numberbox.getElementsByTagName("div");
  for(var i=0;i<divs.length;i++){
    var temp = divs[i].innerHTML;
    if(temp.indexOf(queryword)>=0){
      console.log(temp+" div:"+divs[i]);
      divs[i].style.backgroundColor="#ffff00";
      divs[i].style.color="#000";
    }
  }
}

// addEventHandler(inputbox,"blur",checkInput);
// addEventHandler(leftin,"click",leftInQueue);
// addEventHandler(rightin,"click",rightInQueue);
// addEventHandler(leftout,"click",leftOutQueue);
// addEventHandler(rightout,"click",rightOutQueue);

function leftInQueue(){
  var num = checkInput();
  var div = document.createElement("div");
  var text = document.createTextNode(num);
  div.className="num-element";
  div.appendChild(text);
  numberbox.insertBefore(div,numberbox.firstChild);
}

function rightInQueue(){
  var num = checkInput();
  var div = document.createElement("div");
  var text = document.createTextNode(num);
  div.className="num-element";
  div.appendChild(text);
  numberbox.appendChild(div);
}
function leftOutQueue(){
  if(numberbox.hasChildNodes){
  alert("remove "+numberbox.firstChild.innerHTML);
  numberbox.removeChild(numberbox.firstChild);
  }
}
function rightOutQueue(){
  if(numberbox.hasChildNodes){
  alert("remove "+numberbox.lastChild.innerHTML);
  numberbox.removeChild(numberbox.lastChild);
  }
}
//numberbox.addEventListener("click",function(e){});
addEventHandler(numberbox,"click",function(e){
  if(e.target && e.target.className=="num-element"){
    deleteElement(e.target);
  }
 });
function deleteElement(element){
element.parentNode.removeChild(element);
}

function checkInput(){
  var inputvalue = inputbox.value.trim();
  var pattern = /^[0-9]+$/;
  if(!inputvalue.match(pattern)){
    alert("please input number!");
    return;
  }
  return inputvalue;
}

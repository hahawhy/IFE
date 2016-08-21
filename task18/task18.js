function addEventHandler(e,event,handler){
  if(e.addEventListener){
    e.addEventListener(event,handler,false);
  }else if(e.attachEvent){
    e.attachEvent("on"+event,handler);
  }else{
    e["on"+event] = handler;
  }
}
var inputbox = document.getElementById("thenumber");
var leftin = document.getElementById("btn-in-left");
var rightin = document.getElementById("btn-in-right");
var leftout = document.getElementById("btn-out-left");
var rightout = document.getElementById("btn-out-right");
var numberbox=document.getElementsByClassName("box-number")[0];

addEventHandler(inputbox,"blur",checkInput);
addEventHandler(leftin,"click",leftInQueue);
addEventHandler(rightin,"click",rightInQueue);
addEventHandler(leftout,"click",leftOutQueue);
addEventHandler(rightout,"click",rightOutQueue);

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

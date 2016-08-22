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
var sortbtn = document.getElementById("btn-bubble-sort");
//addEventHandler(inputbox,"blur",checkInput);
addEventHandler(leftin,"click",leftInQueue);
addEventHandler(rightin,"click",rightInQueue);
addEventHandler(leftout,"click",leftOutQueue);
addEventHandler(rightout,"click",rightOutQueue);
addEventHandler(sortbtn,"click",bubbleSort);

function bubbleSort(){
  var divs = numberbox.getElementsByTagName("div");
  var arr = new Array();
  for(var i=0;i<divs.length;i++){
    var temp = divs[i].innerHTML;
    arr.push(parseInt(temp));
  }
  myBubbleSort(arr);
//  arr.sort();
  console.log(arr.sort());
  /*
  numberbox.innerHTML=arr.map(function(key){
    return "<div class='num-element' style='height:"+key+"px'>"+key+"</div>";
  }).join("");
  */
}

function myBubbleSort(a){
  var timer = null;

//  timer = setInterval("run()",50);
//定时器动画看不了啊啊，只能看到最终结果，设置了断点才能看到一步一步的。。。
  for(var i=0;i<a.length-1;i++){
    for(var j=0;j<a.length-1-i;j++){
      if(a[j]>a[j+1]){
      //  function run(){
        console.log("a: "+a);
        render(a,j);
        var tmp = a[j];
        a[j]=a[j+1];
        a[j+1]=tmp;
        console.log("a: "+a);
        render(a,j);
      // setTimeout(render(a,j),2000);
      //  }
    //    clearInterval(timer);
      }
    }
  }


}

function render(array,a){
  var content="";
  for(var i=0;i<array.length;i++){
    if(i==a || i==a+1){
      content+="<div class='num-element' style='background-color:#ff4400; height:"+array[i]+"px'>"+array[i]+"</div>";
    }else{
      content+="<div class='num-element' style='background-color:#007979; height:"+array[i]+"px'>"+array[i]+"</div>";
    }
  }
  numberbox.innerHTML = content;
}

function leftInQueue(){
  if(checkInput()){
  var num = getValue();
//  console.log("checkInput"+checkInput());
//  if(typeof num!="undefined")
    var div = document.createElement("div");
    var text = document.createTextNode(num);
    div.className="num-element";
    div.style.height=num+"px";
    //div.style.lineHeight=num+"px";
    div.appendChild(text);
    numberbox.insertBefore(div,numberbox.firstChild);
  }
}

function rightInQueue(){
  if(checkInput()){
  var num = getValue();
  var div = document.createElement("div");
  var text = document.createTextNode(num);
  div.className="num-element";
  div.style.height=num+"px";
//  div.style.lineHeight=num+"px";
  div.appendChild(text);
  numberbox.appendChild(div);
  }
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
    return false;
  }
  if(inputvalue<10 || inputvalue>100){
    alert("only between 10-100!");
    return false;
  }
  var divs = numberbox.getElementsByTagName("div");
  if(divs.length>=60){
    alert("cannot more than maxsize(60)!");
    return false;
  }
  return true;
}

function getValue(){
  var inputvalue = inputbox.value.trim();
  return inputvalue;
}

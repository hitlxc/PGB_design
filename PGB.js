Array.prototype.max = function () {
// 将数组第一个元素的值赋给max
	var max = this[0];
	// 使用for 循环从数组第一个值开始做遍历
	for (var i = 1; i < this.length; i++) {
		// 如果元素当前值大于max,就把这个当前值赋值给max
		if (this[i] > max) {
		    max = this[i];
		}
	}
		// 返回最大的值
	return max;
}

Array.prototype.min = function () {
	var min = this[0];
	this.forEach(function(ele, index,arr) {
		if(ele < min) {
		    min = ele;
		}
	})
	return min;
}

function isCorrect(obj) {
    return typeof obj === 'number' && obj%1 === 0 && obj>=16847851 && obj<=51244566
}

$.ajaxSetup({  
    async : false //取消异步  
});



var width = 10;

function drawValues(values){
    var canvas = document.getElementById("values")
    if (canvas == null)
    return false;
    var context = canvas.getContext("2d");
    context.clearRect(0,0,30000,200)
    var n = 0;
    var rate = 60/(values.max() - values.min());
    var max = values.max()*rate+10;
    for(var i= 0;i<values.length;i++){
        context.fillStyle = "blue";
        if(values[i]<0) {
            context.fillRect(n, max, width,  -values[i]*rate); //x,y,width,height
        }
        if(values[i]>0) {
            context.fillRect(n, max - values[i]*rate, width,  values[i]*rate); //x,y,width,height
        }
        n+=width;
    }
}

var drag_=false
var D=new Function('obj','return document.getElementById(obj);')
var oevent=new Function('e','if (!e) e = window.event;return e')
function Move_obj(obj){
    var x;
    D(obj).onmousedown=function(e){
	    drag_=true;
	    with(this){
	        var temp1=offsetLeft;var temp2=offsetTop;
	        x=oevent(e).clientX;
            x2=oevent(e).clientX;
            var left = parseFloat($("#startNumber")[0].innerHTML);
            var right = parseFloat($("#endNumber")[0].innerHTML);
	        document.onmousemove=function(e){
	            if(!drag_)return false;
	            with(this){
	                style.left = temp1+oevent(e).clientX-x+"px";
                    var change = (oevent(e).clientX-x2)/width                   
                    
                   left = (left - change);
                    right =(right - change);
                    $("#startNumber")[0].innerHTML = parseInt(left);
                    x2 = oevent(e).clientX
                    $("#endNumber")[0].innerHTML = parseInt(right);

	            }
	        }
	    }
	    document.onmouseup=new Function("drag_=false");
    }
}
//玄学，不要问我这个模块为什么这么写

function move(){
	Move_obj("container");

}

function drawsequence(sequence){
    var canvas = document.getElementById("sequence")
    if (canvas == null)  return false;
    var context = canvas.getContext("2d");
    context.clearRect(0,0,30000,200);
    if (width>=5) {
        for(var i=0;i<sequence.length;i++){
            if(sequence[i] == 'A') {
                context.fillStyle = "#EC6F4B";
                //context.fillText('A', 0, 0);
    		}
            if(sequence[i] == 'T') {
                context.fillStyle = "#857AB9";
                //context.fillText(txt, 0, 0);
            }
            if(sequence[i] == 'G') {
                context.fillStyle = "#F9C238";
                //context.fillText(txt, 0, 0);
    		}
            if(sequence[i] == 'C') {
                context.fillStyle = "#7AC583";
                //context.fillText(txt, 0, 0);
            }
            context.fillRect(i*width, 0, width, 40); //x,y,width,height
            if(width >= 10 ){
                context.fillStyle = "#00f";
                context.textBaseline = 'top';
                context.fillText(sequence[i], i*width, 0);
            }
        }
    }
    else{
        var n = 0;
        for(var i=0;i<sequence.length;i=i+12.5/width){
            var A=0;var T=0;var G=0;var C=0;
            for (var j = i; j<=i+12.5/width; j++) {
                if(sequence[j] == 'A') A++;
                if(sequence[j] == 'T') T++;
                if(sequence[j] == 'G') G++;
                if(sequence[j] == 'C') C++;
            }
            var max = 0;
            var bs = "A";
            if(A>max) max = A;if(T>max) max = T;if(G>max) max = G;if(C>max) max = C
            if(max == A) {
                context.fillStyle = "#EC6F4B";
                bs = 'A';
                //context.fillText('A', 0, 0);
            }
            if(max == T) {
                context.fillStyle = "#857AB9";
                bs = 'T';
            }
            if(max == G) {
                context.fillStyle = "#F9C238";
                bs = 'G';
            }
            if(max == C) {
                context.fillStyle = "#7AC583";
                bs = 'C';
            }
            context.fillRect(n*12.5, 0, 12.5, 40);
            context.fillStyle = "#00f";
            context.textBaseline = 'top';
            context.fillText(bs+'+', n*12.5, 0);
            n++;
        }
    }
}
//四种颜色

function drawElements(elementsData){
	var canvas = document.getElementById("elements")
	$("#elements")[0].height = (elementsData.length+1)*20;
    var tag3marginTop = 50+(elementsData.length+1)*10;
    $("#tag3")[0].style.marginTop = tag3marginTop+"px";
    $("#explain3")[0].style.marginTop = tag3marginTop+"px";
    if (canvas == null)  return false;
    var context = canvas.getContext("2d");
    context.clearRect(0,0,30000,2000);
    context.strokeStyle = "rgb(250,0,0)";
    context.fillStyle = "rgb(250,0,0)";
    //实验证明第一次lineTo的时候和moveTo功能一样
    context.beginPath();
    var y = 20;
    context.moveTo(0, y);
    for(var i=0;i<elementsData.length;i++){
    	var F = $(elementsData[i]).children("F").contents()[0].data;
    	var T = $(elementsData[i]).children("T").contents()[0].data;
    	if (F < start) F = start;
    	if (T > to) T = to;
    	var totalfrom = F-start;
    	var totallong = T-F+1;
    	context.lineTo(totallong*width,y);
    	var f1 = $(elementsData[i]).find("[Y='L']").find("F").contents() //内含子，绿色
    	var t1 = $(elementsData[i]).find("[Y='L']").find("T").contents()
    	for(var j=0;j< f1.length;j++){
    		var x = ( f1[j].data<start?start:f1[j].data )-start;
    		var t = ( t1[j].data>to?to:t1[j].data )-( f1[j].data<start?start:f1[j].data );
    		var w = t-x+1;
    		context.fillStyle = "rgb(0,250,0)";
    		context.fillRect(x*width, y-5, w*width, 10);
    	}
    	var f2 = $(elementsData[i]).find("[Y='X']").find("F").contents() //编码区，蓝色
    	var t2 = $(elementsData[i]).find("[Y='X']").find("T").contents()
    	for(var j=0;j< f2.length;j++){
    		var x = ( f2[j].data<start?start:f2[j].data )-start;
    		var t = ( t2[j].data>to?to:t2[j].data )-( f2[j].data<start?start:f2[j].data );
    		var w = t-x+1;
    		context.fillStyle = "rgb(0,0,250)";
    		context.fillRect(x*width, y-5, w*width, 10);
    	}
    	var f3 = $(elementsData[i]).find("[Y='D']").find("F").contents() //不翻译区，红色
    	var t3 = $(elementsData[i]).find("[Y='D']").find("T").contents()
    	for(var j=0;j< f3.length;j++){
    		var x = ( f3[j].data<start?start:f3[j].data )-start;
    		var t = ( t3[j].data>to?to:t3[j].data )-( f3[j].data<start?start:f3[j].data );
    		var w = t-x+1;
    		context.fillStyle = "rgb(250,0,0)";
    		context.fillRect(x*width, y-5, w*width, 10);
    	}
    	y += 20;
    	context.moveTo(0, y);
    }
    context.stroke();
}

function drawReads(readsData){
	var canvas = document.getElementById("reads")
	$("#reads")[0].height = (readsData.length+1)*20;
    var tag4marginTop = (elementsData.length+1)*10+(readsData.length+1)*10;
    $("#tag4")[0].style.marginTop = tag4marginTop+"px";
    $("#explain4")[0].style.marginTop = tag4marginTop-32+"px";
    if (canvas == null)  return false;
    var context = canvas.getContext("2d");
    context.clearRect(0,0,30000,2000);
    context.strokeStyle = "#70CAEE";
    context.fillStyle = "#70CAEE";
    var y = 20;
    context.beginPath();
    context.moveTo(0, y);
    for (var i = 0;i<readsData.length;i++){
    	context.lineTo((to - start + 1)*width,y);
		var f = $(readsData[i]).find("F").contents()[0].data.split(",");
		var t = $(readsData[i]).find("T").contents()[0].data.split(",");
		for(var j=0;j<f.length;j++){
			if((f[j]>start && f[j]<to)||(t[j]>start && t[j]<to)){
				var x = (f[j]<start?start:f[j])-start+1;
				var w = (t[j]>to?to:t[j]) - (f[j]<start?start:f[j]);
				context.fillStyle = "#4EEE94";
				context.fillRect(x*width, y-5, w*width, 10);
			}
		}
    	y+=20;
    	context.moveTo(0, y);
    }
    context.stroke();
}

function drawVariants(variantsData){
    var canvas = document.getElementById("variants")
    //if((variantsData.length+1)*30>150) $("#variants")[0].height = (variantsData.length+1)*30;
    var tag5marginTop = (readsData.length+1)*10+50;
    $("#tag5")[0].style.marginTop = tag5marginTop+"px";
    $("#explain5")[0].style.marginTop = tag5marginTop+"px";
    if (canvas == null)  return false;
    var context = canvas.getContext("2d");
    context.clearRect(0,0,30000,2000);
    for(var i=0;i<variantsData.length;i++){
        var pst = $(variantsData[i]).find("F").contents()[0].data;
        if ($(variantsData[0]).find("B").length === 0 ) continue;
        var base = $(variantsData[i]).find("B").contents()[0].data;
        var x = pst - start;
        context.font = "bold 15px Arial"
        if(base == 'A') {
            context.fillStyle = "#EC6F4B";
        }
        if(base == 'T') {
            context.fillStyle = "#857AB9";
        }
        if(base == 'G') {
            context.fillStyle = "#F9C238";
        }
        if(base == 'C') {
            context.fillStyle = "#7AC583";
        }
        context.fillText("·"+base,x*width,100);
        context.fillStyle = "#000000"
        context.fillText(pst,x*width+18,100);
    }
}

function enlarge(){

    if(width>=20) return false;
    
    width = width*2;
    $("#container")[0].style.left =(-2*(oTo-oStart)*width)+"px";
    drawsequence(sequenceData);
   	drawValues(valueData);
   	drawElements(elementsData);
   	drawReads(readsData);
    drawVariants(variantsData);
    $("#startNumber")[0].innerHTML = start;
    //$("#startNumber")[0].innerHTML = (parseFloat($("#startNumber")[0].innerHTML) - change);
    $("#endNumber")[0].innerHTML = parseFloat($("#startNumber")[0].innerHTML)+parseInt($("#container").width()/width-1);
}

function shrink(){ 
    
    if(width<=0.5) return false;
    
    width = width/2;
    $("#container")[0].style.left =(-2*(oTo-oStart)*width)+"px";
    drawsequence(sequenceData);
    drawValues(valueData);
    drawElements(elementsData);
    drawReads(readsData);
    drawVariants(variantsData);
    $("#startNumber")[0].innerHTML = start;
    $("#endNumber")[0].innerHTML = parseFloat($("#startNumber")[0].innerHTML)+parseInt($("#container").width()/width-1);
}

var oStart = "0";
var oTo = "0";
var start = "0";
var to = "0";
var xmldata = "data";
var sequenceData = "";
var valueData = [];
var elementsData = "data";
var readsData = "data";
var variantsData = "data";

function getData(){
    sequenceData = "";
	oStart = $("#from")[0].value;
	oTo = $("#to")[0].value;
    if(!isCorrect(parseInt(oStart)) || !isCorrect(parseInt(oTo)) ){
        alert("请输入16847851到51244566之间的整数");
        return false;
    }
    if (parseInt(oStart)>=parseInt(oTo)) {
        alert("终点必须大于起点")
        return false;
    }
    if (parseInt(oStart)<(parseInt(oTo)-500)) {
        alert("区间太大，尽量小于500bs")
        return false;
    }
    //$("#container").width()/width-1
    start = parseInt(oStart)-2*(oTo-oStart);
    to = parseInt(oTo)+2*(oTo-oStart);
    //$("#container")[0].style.left = 0;
    $("#startNumber")[0].innerHTML = oStart;
    $("#endNumber")[0].innerHTML = parseInt(oStart)+parseInt($("#container").width()/width-1);

	var querry="action="+"update"+"&chr="+"chr22"+"&start="+start+"&end="+to;
	$.get("servlet/test.do?"+querry,function(data,status){

		xmldata = data;
		if(to-start<1500)sequenceData = $(xmldata).find("Sequence").contents()[0].data;
		else{
            var tempStart = start;
            var tempTo = tempStart;
            while(tempTo<=to){
                tempTo = (parseInt(tempTo)+1499).toString();
                $.get("servlet/test.do?"+"action="+"update"+"&chr="+"chr22"+"&start="+tempStart+"&end="+tempTo,function(data,status){
                    xmldata = data;
                    sequenceData = sequenceData + $(xmldata).find("Sequence").contents()[0].data;
                    //if ((parseInt(tempTo)+1499).toString()<=to) {alert(sequenceData.length); drawsequence(sequenceData);}
                    //if ((parseInt(tempTo)+1499).toString()>to) {alert("0.0")}
                });
                tempStart = (parseInt(tempTo)+1).toString();

            }
            
        }
        if(to-start<1500) 
        valueData = $(xmldata).find("ValueList").contents()[0].data.split(";");
        else{
            var tempStart = start;
            var tempTo = tempStart;
            while(tempTo<= to){
                tempTo = (parseInt(tempTo)+1499).toString();
                $.get("servlet/test.do?"+"action="+"update"+"&chr="+"chr22"+"&start="+tempStart+"&end="+tempTo,function(data,status){
                    xmldata = data;
                    valueData = valueData.concat($(xmldata).find("ValueList").contents()[0].data.split(";"));
                    //if ((parseInt(tempTo)+1499).toString()<=to) {alert(sequenceData.length); drawsequence(sequenceData);}
                    //if ((parseInt(tempTo)+1499).toString()>to) {alert("0.0")}
                });
                tempStart = (parseInt(tempTo)+1).toString();
            }
        }
        
		//$(xmldata).find("Start").contents()[0].data
		elementsData = $(xmldata).find("E");
		readsData = $(xmldata).find("R");
        variantsData = $(xmldata).find("V");
        //setTimeout(function(){
            drawValues(valueData);
            drawsequence(sequenceData);
            drawElements(elementsData);
            drawReads(readsData);
            drawVariants(variantsData);
        //},1000)
		
	});
	
    $("#container")[0].style.left =(-2*(oTo-oStart)*width)+"px";

}
//70CAEE
//4EEE94
$(function(){
    $("#enlarge").click(function(){
        enlarge();
    });
    $("#shrink").click(function(){
        shrink();
    });
    $("#submit").click(function(){
    	getData();

    })
})//放大缩小
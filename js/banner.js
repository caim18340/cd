function $id(id){//给我一个id名，返回一个这个id的元素
	return document.getElementById(id);
}
function getStyle(obj,attr){
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}
function move(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			var cur = 0;
			if(attr == "opacity"){
				cur = parseFloat(getStyle(obj,attr)) * 100;
			}else{
				cur = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - cur) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(cur != json[attr]){
				flag = false;
			}
			if(attr == "opacity"){
				obj.style[attr] = (speed + cur) / 100;
			}else{
				obj.style[attr] = speed + cur + 'px';
			}
			if(flag){
				clearInterval(obj.timer);
				if(callback){
					callback();
				}
			}
		}
	},20)
}
	var banner = $id('banner');
	var list = $id('list');
	var dots = $id('dots').children;
	var timer = null;
	var index = 0;
	timer = setInterval(autoPlay,1000);
	function autoPlay(){
		for(var i=0;i<dots.length;i++){
			dots[i].className = "";
		}
		index++;
		if(index == 6){
			index = 1;
			list.style.left = 0;
		}
		dots[index == 5 ? 0 : index].className = "active";
		move(list,{left : - index * 1380});
	}
	banner.onmouseover = function(){
		clearInterval(timer);
		move($id('arr'),{opacity : 100});
	}
	banner.onmouseout = function(){
		move($id('arr'),{opacity : 0});
		timer = setInterval(autoPlay,1000);
	}
	for(let i=0;i<dots.length;i++){
		dots[i].onclick = function(){
			index = i - 1;
			autoPlay();
			move($id('arr'),{opacity : 0});
		}
	}
	$id('toLeft').onclick = function(){
		for(var i=0;i<dots.length;i++){
			dots[i].className = "";
		}
		index--;
		if(index == -1){
			index = 0;
		}
		dots[index].className = "active";
		move(list,{left : - index * 1380});
	}
	$id('toRight').onclick = function(){
		for(var i=0;i<dots.length;i++){
			dots[i].className = "";
		}
		if(index == 5){
			index = 0;
			list.style.left = 0;
		}
		index++;
		if(index == 5){
			index = 4;
		}
		dots[index].className = "active";
		move(list,{left : - index * 1380});
	}
	var fangda = $id("fangda");
	var navClose = $id("navClose");
	var baidu = $id("baidu");
	var cha = $id("cha");
	var guanbi = $id("guanbi");
	var search = $id("search");
	var tiaozhuan = $id("tiaozhuan");
	fangda.onclick = function(){
		navClose.style.opacity = 0;
		baidu.style.opacity = 1;
	}
	guanbi.onclick = function(){
		navClose.style.opacity = 1;
		baidu.style.opacity = 0;
	}
	search.onkeyup = function(){
		var str = this.value;
		search.style.border = "none";
		var oScript = document.createElement("script");
        document.body.appendChild(oScript);
        oScript.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+str+"&cb=fn";
	}
	function fn(msg){
       // console.log(msg.s);
        var arr = msg.s;
        var str = "";
        for(var i = 0; i < arr.length; i++){
            str += `<li>${arr[i]}</li>`;
        }
       cha.innerHTML = str; 
    }
	cha.onmouseover = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName == "LI"){
			target.style.background = "#ccc";
		}
	}
	
	cha.onmouseout = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName == "LI"){
			target.style.background = "";
		}
	}
	
	cha.onclick = function(e){
		var e = e || window.event;
		var target = e.target || e.srcElement;
		if(target.nodeName == "LI"){
			search.value = target.innerHTML;
			cha.innerHTML = "";
		}
	}
	tiaozhuan.onclick = function(){
		window.location.href = "https://www.zcool.com.cn/";
	}

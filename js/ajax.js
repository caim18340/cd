	function getAjax(url,callback,data){
        var xhr = null;
        var res = null;
        if(window.XMLHttpRequest){
            xhr = new XMLHttpRequest;
        }else{
            xhr = ActiveXObject("Microsoft.XMLHTTP");
        }
        if(data){
            url += data;
        }
        xhr.open("get",url,true);
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                res = xhr.responseText;
                callback(res);
            }
        }
    }
	function promiseAjax(url,data){
        if(data){
            url += data;
        }
        var pro = new Promise(function (success,failed) {
            var xhr =  new XMLHttpRequest();
            xhr.open("get",url,true);
            xhr.send();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    success(xhr.responseText);
                }
            }
            setTimeout(function () {
                failed("失败");
            },5000)
        })
        return pro;
    }
	var box = $id("box");
	var page = $id("page");
	var sleft = $id("sleft");
	var sright = $id("sright");
	var num = 10;
	var con = 1;
	var total = null;
	function showBox(){
		getAjax("data.json",function(msg){
			var arr = JSON.parse(msg);
			var str = "";
			for(var i = (con-1) * num;i < con*num;i++){
				if(i < arr.length){
					str += `<li>
							<p><a href="javascript:;"><i class="seemask"></i><img src="${arr[i].src}"></a></p>
							<p><i><a class="bianse" href="javascript:;">${arr[i].i}</a></i><em>${arr[i].em}</em></p>
							<p class="iconfont">${arr[i].p}</p>
							<p><a href="javascript:;"><span>${arr[i].span}</span></a><em>${arr[i].em1}</em></p>
							</li>`;
				}
			}
			box.innerHTML = str;
			total = Math.ceil(arr.length / num);
			var str1="";
			for(var i=1;i<=total;i++){
				str1 += `<li>${i}</li>`;
			}
			var str2 = `<a href="javascript:;">...</a>
				<a href="javascript:;">99</a>
				<a href="javascript:;">100</a>
				<a class="iconfont" href="javascript:;">&#xe616;</a>`;
			page.innerHTML = str1 + str2;
			page.children[con - 1].className = "purple";
		})
	}
	showBox();
	page.onclick = function(e){
		var e = e || event;
		var target = e.target || e.srcElement;
		if(target.nodeName.toLowerCase() == "li"){
			con = target.innerHTML;
			showBox();
		}
	}
	sleft.onclick = function(){
		if(con == 1){
			con = 1;
		}else{
			con--;
		}
		showBox();
	}
	sright.onclick = function(){
		if(con == total){
			con = total;
		}else{
			con++;
		}
		showBox();
	}
	$.ajax({
		type:"get",
		url:"data1.json",
		async:true,
		cache :true,
		success : function(res){
			var str = "";
			for(var i=0;i<res.length;i++){
				var cur = res[i];
				str += `<li>
						<a href="javascript:;">
						<i class="seemask"></i>
						<img src="${cur.src}" alt="" />
						</a>
						<p class="iconfont">${cur.p}</p>
						</li>`;
			}
			$("#box1").html(str);
		}
	});
	

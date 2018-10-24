window.onscroll = function(){
		var stop = document.body.scrollTop || document.documentElement.scrollTop;
		if(stop >255){
			$id('go').style.display = 'block';
		}
		if(stop == 0){
			$id('go').style.display = 'none';
		}
	}
	/*$id('go').onclick = function(){
		document.body.scrollTop = document.documentElement.scrollTop = 0;
		$id('go').style.display = "none";
	}*/
	$("#go").click(function(){
		$("html,body").animate({
			scrollTop : 0
		},1000)
	})

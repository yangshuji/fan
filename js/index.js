$(function(){
	// 轮播图
	var timer = setInterval(autoPlay,2000)
	var index = 0;
	function autoPlay(){
		index++;
		if(index == $(".search_fl01 li").size()){
			index = 0;
		}
		$(".search_fl01 li").eq(index)
					.addClass("current")
					.siblings()
				
					.removeClass('current');
		$(".prime2 li").eq(index)
				.fadeIn(1000)
				.siblings()
				.fadeOut(1000);
		
	}
	$(".search_fl01 li").mouseenter(function(){
		clearInterval(timer);
		index = $(this).index()-1;
		autoPlay();
	})
	$(".search_fl01 li").mouseleave(function(){
		timer = setInterval(autoPlay(),2000)
	})
	
	
	
	
	
	
	//二级导航栏目
	$('#primary>.prime1>.prime_parents1').mouseenter(function(){
		$(this).find(".ol_big1").show();
	}).mouseleave(function(){
		$(this).find(".ol_big1").hide();
	});
	$('#primary>.prime1>.prime_parents2').mouseenter(function(){
		$(this).find(".ol_big2").show();
	}).mouseleave(function(){
		$(this).find(".ol_big2").hide();
	});
	$('#primary>.prime1>.prime_parents3').mouseenter(function(){
	$(this).find(".ol_big3").show();
}).mouseleave(function(){
	$(this).find(".ol_big3").hide();
});
	$('#primary>.prime1>.prime_parents4').mouseenter(function(){
	$(this).find(".ol_big4").show();
}).mouseleave(function(){
	$(this).find(".ol_big4").hide();
});
	$('#primary>.prime1>.prime_parents5').mouseenter(function(){
	$(this).find(".ol_big5").show();
}).mouseleave(function(){
	$(this).find(".ol_big5").hide();
});
	$('#primary>.prime1>.prime_parents6').mouseenter(function(){
	$(this).find(".ol_big6").show();
}).mouseleave(function(){
	$(this).find(".ol_big6").hide();
});	
$('#primary>.prime1>.prime_parents7').mouseenter(function(){
	$(this).find(".ol_big7").show();
}).mouseleave(function(){
	$(this).find(".ol_big7").hide();
});




$('.li_1').mouseenter(function(){
	$('.li_1').find(".empty_gou").show();
	
}).mouseleave(function(){
	$('.li_1').find(".empty_gou").hide();
})

$('.yanqiu').mouseover(function(){

	$(this).find('img').animate({"width":280,"height":280,"left":-50,"top":-50});
}).mouseout(function(){
	$(this).find('img').animate({"width":240,"height":240,"left":0,"top":0});
})





})





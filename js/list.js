$(function(){
//	列表页的二级菜单部分
		$('#ensconce').mouseenter(function(){
		$(this).find(".ul_yincang").show();
	}).mouseleave(function(){
		$(this).find(".ul_yincang").hide();
	});
	$('.li_conceal1').mouseenter(function(){
		$(this).find(".ol_yin1").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin1").hide();
	});
	$('.li_conceal2').mouseenter(function(){
		$(this).find(".ol_yin2").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin2").hide();
	});
	$('.li_conceal3').mouseenter(function(){
		$(this).find(".ol_yin3").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin3").hide();
	});
	$('.li_conceal4').mouseenter(function(){
		$(this).find(".ol_yin4").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin4").hide();
	});
	$('.li_conceal5').mouseenter(function(){
		$(this).find(".ol_yin5").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin5").hide();
	});
	$('.li_conceal6').mouseenter(function(){
		$(this).find(".ol_yin6").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin6").hide();
	});
	$('.li_conceal7').mouseenter(function(){
		$(this).find(".ol_yin7").show();
	}).mouseleave(function(){
		$(this).find(".ol_yin7").hide();
	});
	
	
	
	
//ajax 获取列表页的数据
	$.ajax({
		type : "get",
		url:"list.json",
		success:function(data){
			console.log(data);
			$(data).each(function(index,value){
//				console.log(value)
				
					var li = `<div class="cate_show1">	
								<a href="detail.html"><img src="img/images_list/${value.src}"></a>
								<span class="span_shop">
									<a href="#">${value.name}</a>
									<p class="p_shop">${value.seller}</p>
								</span>
								<span class="span_price">
									<em>${value.price}</em>
									<i>${value.origin}</i>
									<b>${value.num}</b>
								</span>
						</div>`
					$('.cate_show').append(li);
	
				
			})
		}
	})
})




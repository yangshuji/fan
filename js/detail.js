		
$(function(){
			$(".small img").mouseenter(function(){
				var nowIndex=$(this).attr("index");
				$(".big img").css("display","none");
				$(".big img").eq( nowIndex ).css("display","block");
				var imgNumber = 15 + 3*nowIndex;
				$(".mirror").css("background-image",'url(img/images_details/'+imgNumber+'.png)')
			})
			
			$(".left").mouseenter(function(){
					$("#big_mirror").show();
					$(".mirror").show();
				
				$(this).mouseleave(function(){
					$("#big_mirror").hide();
					$(".mirror").hide();
				})
				$(this).mousemove(function(e){ 
		//			console.log($(this));//m.fn.init [div.big, context: div.big]
		//指的大图的div
				var e = e || window.event;
				var _mouseX = e.clientX;
				var _mouseY = e.clientY;
				var _left = _mouseX -$(this).offset().left-100;
				var _top = _mouseY - 100 +$(window).scrollTop()-$(this).offset().top;
		//		进行边界的控制
				if(_left>$(this).width()-$("#big_mirror").width()){
					_left = $(this).width()-$("#big_mirror").width()
				}
				if(_left<=0){
					_left = 0;
				}
				if(_top>$(this).height() - $("#big_mirror").height()-82){
					_top = $(this).height() - $("#big_mirror").height()-82
				}
				if(_top<=0){
					_top = 0;
				}
				$("#big_mirror").css({
					"top" :_top,
					"left":_left
				});
				$(".mirror").css({
					backgroundPosition : _left*-2+"px "+_top*-2+"px"
				})
			});
		}),function(){
			$(".big_mirror").css("display","none");
			$("mirror").css("display","none");
	}
		
		
		//购物车数量加减部分
	var _num = 1;
	if(_num<=1){
		$(".shuliang_jia .reduce").css("cursor","not-allowed");
	}
	$(".shuliang_jia .increase").click(function(){
		showC()
		_num++;
		if(_num<=1){
			$(".shuliang_jia .reduce").css({"cursor":"not-allowed","background":"#dd0"});
		}else{
			$(".shuliang_jia .reduce").css({"cursor":"pointer","background":"skyblue"});
		}
		$(".mai_num_rong").val(_num);
	});
	$(".shuliang_jia .reduce").click(function(){

					showC();
		_num--;
		if(_num<=1){
			_num = 1;
			$(".shuliang_jia .reduce").css({"cursor":"not-allowed","background":"#aaa"});
			$(".mai_num_rong").val(_num);
		}else{
			$(".mai_num_rong").val(_num);
			$(".shuliang_jia .reduce").css({"cursor":"pointer","background":"#d00"});
		}
	});
	
//	购物车部分
//	加载已有的商品信息

//		var ya = $('.addcar').click(function(){
//			var dingwei = $('.dingwei');
////			var img = $('<img>')
////			img.attr({'src':'img/images_details/15.png'})
////			dingwei.append(img);
//			
//			var span = $('<span>结算</span>').click(function(){
//				$(location).attr({"href":"cart.html"});
//			});
//			dingwei.append(span);
//			
//		
//	})
//	点击添加购物车创建标签
//	var yan = $('.addcar').click(function(){
//		var dingwei = $('.dingwei');
//		var img = $('<img>');
//		img.attr({'src':'img/images_details/15.png'})
//		dingwei.append(img);
//		var span = $('<span>去结算</span>').click(function(){
//			$(location).attr({"href":"cart.html"});
//		});
//		dingwei.append(span);
//	})
	
	loadCart();
	//给加入购物车按钮添加点击事件
	$(".mai_add").click(function(){
		loadCart();
		//获取商品的id（用来区分不同的商品）
		var goodId = $('.main_area_inherit').find('h1').attr("goodsID");
//		获取商品的名称
		var goodName = $('.main_area_inherit').find('h1').html();
//		获取商品的价格
		var goodPrice = $('.can_price_list1').find('.mallPrice');
		//获取商品的图片
		var goodSrc = $('.left').find('.small').find('img').eq(0).attr('src');
		//获取商品的数量
		var goodNum = parseInt ($('.mai_num_rong').val());
	
//		获取cookie中的信息
//		cookie的操作
//		存cookie ： document.cookie = "键=值"   值的类型 ： string   
//		取cookie ：  document.cookie    取cookie的依据 ： 根据键 找到 对应的值

		var cartStr = $.cookie("cart")?$.cookie('cart'):"";
//		  将一个字符串转成对象 

		var cartObj = convertCartStrToObj(cartStr);
//		判断该商品是否已经存在购物车中
		if(goodID in cartObj){
			//如果该商品已经存在了，则商品的数量加到购物车中
			cartObj[goodId].num +=goodNum;
		}else{
			//如果商品不存在呢，那么可以将新的商品的信息存入
			cartObj[goodId] = {
				name : goodName,
				price : goodPrice,
				num : goodNum,
				src : goodSrc
			};
		}
//		console.log(cartObj[goodId]);
//		可以将新的商品存入cookie中去
//		再次将对象转为字符串
		cartStr = convertObjToCartStr(cartObj);
		//将其存入cookie中
		$.cookie("cart",cartStr,{expires:7,path:"/"});
		
//		然后做一个飞到购物车的小动画效果
//		var cloneImg = $('left').find('.small').find('img').eq(0).clone().css({width:50,height:50});
//		cloneImg.fly({
//			start:{
//				top:event.clientY,
//				left:event.clientX
//			},
//			end:{
//				top:$('.shopping-cart').offset().top() - $(window).scrollTop,
//				left:$('.shopping-cart').offset().left(),
//				width:0,
//				height:0
//				
//			},
//			
//		})
	});
	
   	    //函数的封装
    	    function convertCartStrToObj(cartStr){
    	    	if(!cartStr){
    	    		return{};
    	    	}
    	    	var goods = cartStr.split(":");
    	    	var obj = {};
    	    	for(var i =0;i<goods.length;i++){
    	    		var data = goods[i].split(",");
    	    		//以商品的id为健，商品的其他信息为值，这个值也设置为一个对象
    	    		obj[data[0]] = {
    	    			name:data[1],
    	    			price:parseFloat(data[2]),
    	    			num:parseInt(data[3]),
    	    			src:data[4]
    	    		}
    	    	}
    	    	return obj;
    	    }
    	    function convertObjToCartStr(obj){
    	    	var cartStr = "";
					//遍历对象
					for(var id in obj){
						if(cartStr){
							cartStr += ":";
						}
				      cartStr += id + "," + obj[id].name + "," + obj[id].price + "," + obj[id].num + "," + obj[id].src;
					 }
					return cartStr;
			   }
    	  //加载购物车中的信息，使商品页与购物车页中的购物车数量同步
	      function loadCart(){
//				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
//		        var cartObj = convertCartStrToObj(cartStr);
				//获取到购物车中所有商品的数量
				var total = 0;
//				for(var id in cartObj){
//				total += cartObj[id].num;
//			}
//			
			$(".cart_num").find('input').val(total);
		 }

});
//封装显示函数
	showC()
function showC(){
		var dingwei = $('.dingwei');
//		
		var sp = $('.dingwei');
		
		var divzzz = $('<div></div>')
		sp.append(divzzz);
		divzzz.addClass('divzzz')
		console.log(divzzz);//Object [ div.divzzz ]
		
		
		var img = $('<img>');
		img.attr({'src':'images/1.png'}).css({"float":"left","margin-top":'5px',"width":"90px","height":"90px"});
		divzzz.append(img);
		img.addClass('sp_img');
		
		var span = $('<span>120<span>').css({"margin-top":"10px"});
		divzzz.append(span);
		span.addClass('zzzz')
		
		setCookie('111',span.html());
		
		var a  = $('<a>去结算</a>').click(function(){
			$(location).attr({"href":"cart.html"});
		});
		dingwei.append(a);
}

//$(function(){
//	$.get('db.js',function(r){
//		$.each(r.list,function(ind,obj){
//			
//		})
//	})
//})
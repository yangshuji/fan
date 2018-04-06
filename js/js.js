//首页的侧边栏效果
var aside = document.querySelector(".aside");
var bar = document.querySelector(".bar");
var barLis = document.querySelectorAll(".bar>li");
var menu = document.querySelector(".menu");
//aside.onclick = function(){
//	menu.style = "block";
//	alert(menu);
//}

barLis[0].onclick =function(){
	
	// 因为默认时menu是显示的，所以第一次点击时，将menu隐藏
	// 第一次点击时，我们没有对menu行间设置样式，所以第一次拿到的right值，一定是""
	if(menu.style.right == "-100px"){
		startMove(menu,{"right":50});
	}else{
		startMove(menu,{"right":80});
	}
}
//商品的显示
var box = document.querySelector("#box");
var flag = document.createDocumentFragment();
//创建虚拟节点
//对数据列表进行循环
db.list.forEach((obj)=>{
//	console.log(obj);
	var li = document.createElement("li");
//	创建图片
	var img = document.createElement("img");
	img.src = "images/"+obj.img;
//	obj 就是每一个商品对象
	li.appendChild(img);
	img.onclick = function(){
//		先存cookie
		setCookie("data",obj);
		location.href = "detail.html";
	}
	
	//商品的名称
	var h3 = document.createElement("h3");
	li.appendChild(h3);
	h3.innerHTML = "<a href='detail.html'>"+obj.title+"</a>";
	
	h3.onclick = function(){
		setCookie("data",obj);
		
	}
	//商品的单价
	var price = document.createElement("span");
	li.appendChild(price);
	price.innerHTML =  "￥"+obj.price;
	//添加到购物车的按钮
	var btn = document.createElement("span");
	li.appendChild(btn);
	btn.className = "btnAdd";
	btn.innerHTML = "添加到购物车";
	btn.onclick = function(){
		// 该按钮所对应的图片的xy轴
		// img.offsetLeft
		// 在图片的位置上，再次创建一张图片
		var tmp = document.createElement("img");
		document.body.appendChild(tmp);
		tmp.src = "images/"+obj.img;
		tmp.className = "tmpImg";
		tmp.style.left = img.offsetLeft +"px";
		tmp.style.top = img.offsetTop + "px";
		// 让临时图片飞起来
		startMove( tmp, {
			"left" : aside.offsetLeft+barLis[0].offsetLeft,
			"top" : barLis[0].offsetTop+document.documentElement.scrollTop,
			"width" : 60,
			"height" : 60
		}, function(){
			document.body.removeChild(tmp); // 清除图片节点
			// 每一个商品，用一个cookie存储，以商品编号作为cookie名称，保存相应的数据
			// 在设置cookie之前，先判断该cookie是否保存过
			var goods = getCookie("g"+obj.id);
			if( goods == undefined ){	// 表示之前没有存储过
				obj.num = 1;	// 数量的初始值（假设之前没有保存过该cookie，则表示为第一次保存，所以数量为1）				
			}else{	// 表示之前存储过
				obj.num = goods.num+1;
			}
			setCookie("g"+obj.id, obj, 7);// 先将商品保存到cookie中
			showCart(); // 然后把所有的商品显示出来
		} );
	}
	// 商品时间
	var time =document.createElement("p");
	li.appendChild(time);
	// dateDiff()	返回两个时间的间隔，单位秒
	// showDate()	根据秒数，求*天*时*分*秒
	time.timer = setInterval(function(){
		var n = parseInt(dateDiff( new Date(), obj.time, 's' ));		
		time.innerHTML = showDate(n);
		if( n <= 0 ){
			// 清除定时器
			clearInterval(time.timer);
			// time的内容改为已经过期
			time.innerHTML = "已经过期";
			// 对应的按钮变成不可用状态
			btn.style.background = "gray";
			btn.onclick = null;
		}
	}, 1000);
	time.innerHTML = showDate(parseInt(dateDiff( new Date(), obj.time, 's' )));
	time.title = obj.time;
	
	
	flag.appendChild(li);	
} );
box.appendChild(flag);


// 显示购物车中的所有的商品
showCart();
function showCart(){
	var allNum = 0;
	menu.innerHTML = "";// 清除之前的数据，如果不清楚的话，将导致追加
	var flag = document.createDocumentFragment();//虚拟节点
	// 把开头为g，后面跟数字的cookie都取出来，循环处理，每一个符合条件的cookie，被回调函数执行一次
	getCookieAll(/^g\d+$/, function(cookieName, cookieValue){
		//console.log(cookieName, cookieValue);
		var obj = cookieValue;// 该商品的具体数据
		// 创建li
		var li = document.createElement("li");
		flag.appendChild(li);
		// 创建图片
		var img = document.createElement("img");
		img.src = "images/"+obj.img;
		li.appendChild(img);
		// 商品名称
		var h3 = document.createElement("h3");
		li.appendChild(h3);
		h3.innerHTML = obj.title;
		// 商品单价
		var price = document.createElement("span");
		li.appendChild(price);
		price.innerHTML = "￥"+obj.price;
		// 商品数量
		var div = document.createElement("div");
		li.appendChild(div);
		div.className = "numDiv";
		// 减号
		var jian = document.createElement("input");
		jian.type = "button";
		jian.value = "-";
		div.appendChild(jian);
		jian.onclick = function(){
			text1.value = Number(text1.value)-1;
			obj.num--;
			if( obj.num == 0 ){
				removeCookie(cookieName);//删除该商品cookie
				menu.removeChild(li);//删除li节点
			}else{
				setCookie(cookieName, obj, 7);//修改该商品cookie中的数量
			}
			
			barLis[0].innerHTML = --allNum;	// 商品总数量的更新
		}
		// 输入框
		var text1 = document.createElement("input");
		text1.type = "text";
		text1.value = obj.num;
		div.appendChild(text1);
		text1.onblur = function(){
			var last = obj.num;// 商品上一次的数量
			if( /^\d+$/.test(text1.value) ){
				obj.num = Number(text1.value);	// 把这一次的数量设置进去
				setCookie(cookieName, obj, 7);	// 重新设置cookie
				
				allNum+=obj.num-last;
				barLis[0].innerHTML = allNum;	// 商品总数量的更新
			}else{
				alert("请输入数字");
			}
		}
		// 加号
		var jia = document.createElement("input");
		jia.type = "button";
		jia.value = "+";
		div.appendChild(jia);
		jia.onclick = function(){
			text1.value = Number(text1.value)+1;	// text1是输入框
			obj.num++;	// 数量在原有的基础上加1
			setCookie(cookieName, obj, 7);	// 重新设置cookie
			
			barLis[0].innerHTML = ++allNum;	// 商品总数量的更新
		}
		
		allNum += obj.num; // 所有商品总数量
		
	});
	menu.appendChild(flag);
	
	barLis[0].innerHTML = allNum;	// 显示总数量
	
}
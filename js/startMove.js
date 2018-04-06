/*
 * 运动函数
 * 参数：
 * 
 * 返回值：
 * 
 * 示例：
 */


function startMove(elem, json, cb){
	clearInterval(elem.timer);	// 无论之前的运动是否执行完，把之前的运动结束掉
	elem.timer = setInterval(function(){
		// 所有的属性是不是都执行到了终点
		var flag = true;	// 假设所有的属性都已经到达了终点
		// 对json进行循环，因为json保存的是运动时，所涉及到的所有的属性
		// json = {"width":500}
		for( var attr in json ){	// attr="width"
			// 起点（获取被操作的元素的当前属性值）
			var v = getStyle(elem, attr);
			// 判断是否为透明度运动
			if( attr == "opacity" ){
				v = Math.round(v*100);
			}else{
				v = parseInt(v);
			}
			// 终点（startMove函数中的一个参数）
			var target = json[attr];	// json["width"]==500
			// 终点减起点的间距
			var dist = target-v;			
			// 取其六分之一
			var speed = dist/6;	// 即速度，也可以理解成是步长值，元素每一次更新的值
			
			if(speed>0){	// 从左到右运动时，最后的几个数，可能是0.5  0.4等等之类的这种值，所以需要向上取整，得到+1
				speed = Math.ceil(speed);
			}else{		// 从右到左，最后的几个数，可能是-0.5  -0.4等等之类的这种值，所以需要向下取整，得到-1
				speed = Math.floor(speed);
			}
			//
			// 重新给元素定位
			if( attr == "opacity" ){
				elem.style[attr] = (v+speed)/100;
				if(/MSIE/.test(navigator.userAgent)){// 如果当前浏览器为IE浏览器
					elem.style.filter = "alpha(opacity="+(v+speed)+")";// 用IE兼容的写法，实现透明度
				}
			}else{
				elem.style[attr] = v+speed+"px";
			}
			// 关闭定时器
			//if( v == target ){	// 如果元素已经到达目标点，则停止定时器
			//	clearInterval(elem.timer);
			//}
			// 判断当前属性是否走到了终点
			if( v != target ){
				flag = false;	// 只要有一个属性没有走到终点，flag就为false
			}
		}
		// 如果所有的属性都达到了终点，再停止定时器
		if(flag){
			clearInterval(elem.timer);
			// 所有属性，都执行到终点之后，再触发回调函数
			// 如果存在第三个参数（回调函数）
			if( cb ){
				cb();
			}
		}
	}, 50);
}

function getStyle( elem, attr ){
	if( window.getComputedStyle ){	// W3C标准：获取非行间样式
		return getComputedStyle(elem, null)[attr];
	}else{							// IE标准：获取非行间样式
		return elem.currentStyle[attr];
	}
}


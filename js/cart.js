//将购物车中的信息显示到表格中
//var table1 = document.getElementById("table1");
//var flag = document.createDocumentFragment();
//创建虚拟节点
//getCookieAll(/^g\d+$/,function(cookieName,obj){
	

	
	
//	var tr = document.createElement("tr");
////	商品进行编号
//	var tr = document.createElement("tr");
//	var td1 = document.createElement("td");
//	tr.appendChild(td1);
////	设置复选框
//	var cb = document.createElement("input");
//	cb.type = "checkbox";
//	td1.appendChild(cb);
//	cb.value = cookieName();
////	设置图片
//	var td2 = document.createElement("td");
//	tr.appendChild(td2);
//	td2.innerHTML = "<img src='images/"+obj.img+"' />";
////	设置标题
//	var td3 = document.createElement("td");
//	tr.appendChild(td3);
//	td3.appendChild(td3);
//	td3.innerHTML = obj.title;
//	
////	设置单价
//	var td4 = document.createElement("td");
//	tr.appendChild(td4);
//	td4.innerHTML =  obj.price;
//	//设置数量
//	var td5 = document.createElement("td");
//	tr.appendChild(td5);
//	td5.innerHTML = obj.num;
//	
////	设置总价
//	var td6 = document.createElement("td");
//	tr.appendChild("td6");
//	td6.innerHTML = obj.num * obj.price;
////	数据操作
//	var td7 = document.createElement("td");
//	tr.appendChild(td7);
//	td7.innerHTML = "删除";
//	td7.onclick = function(){
//		if(confirm("您确定要删除商品吗")){
//			removeCookie(cookieName);
//			tr.parentNode.removeChild(tr);
//		}
//	}
//	
//	flag.appendChild(tr);
//	
//})
//
//table1.querySelector("tbody").appendChild(flag)
//;

//全选
//document.querySelector("#quanxuan").onclick = function(){
//	var v = this.checked;
//	Array.from(document.querySelectorAll("table input[type='checkbox']")).
//}
//console.log(getCookie('111'))

//设置全选按钮
/*
document.querySelector("#quanxuan").onclick = function(){
	var v = this.checked;
	Array.from(document.querySelectorAll("table input[type='checkbox']")).forEach((cb)=>{
		cb.checked = v;
	})
}
//设置反选按钮
document.querySelector("[value='反选']").onclick = function(){
	Array.from(document.querySelectorAll("table input[type='checkbox']")).forEach((cb)=>{
		cb.checked = !cb.checked;
	});
}

//删除所选择的
document.querySelector("[value='删除所选']").onclick = function(){
	Array.from(document.querySelectorAll("table input[type='checkbox']")).forEach((cb)=>{
//		判断
		if(cb.checked){
//			删除cookie
			removeCookie(cb.value);
//			删除tr
			var tr = cb.parentNode.parentNode;
			tr.parentNode.removeChild(tr);
		}
	})
}
*/





//用jq创建表格,用来存放获取到的数据,进行结算

	var zong=0;
	
	getCookieAll(/^g\d+$/,function(cookieName, obj){
		
		
		var tr=$("<tr></tr>");
		$("tbody").append(tr)
	
		var td1=$("<td></td>")
		tr.append(td1)
		
		var inp=$("<input>")
		inp.attr("type","checkbox")
		td1.append(inp)
		inp.val(cookieName)
		//console.log(inp.val())
		
	
		var td2=$("<td></td>")
		tr.append(td2)	
		var img=$("<img src=''/>")
		img.attr("src","images/"+obj.img)
		td2.append(img)
		
		var td3 = $("<td></td>")
		td3.html(obj.title);
		tr.append(td3);
		
		var td4 = $('<td></td>');
		td4.html(obj.price);
		tr.append(td4);
		
		var td5 = $("<td></td>");
		td5.append(obj.num);
		tr.append(td5);
		
		var td6= $("<td></td>")
		td6.append(obj.price*obj.num);
		tr.append(td6);
		
		var td7 = $("<td></td>");
		td7.html("删除了");
		tr.append(td7);
		td7.addClass("td7");
		td7.clcik(function(){
			removeCookie(cookieName);
			$(this).parents("tr").remove()
			var j = Array.from($("tbody input[type='checkbox']:checked")).length
			
		})
		
		
		
		
		
		
	})
//	


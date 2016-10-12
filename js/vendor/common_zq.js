	var PagePath="http://test.fascinwear.com:800/"
	var PageTest="http://test.fswear.local/"
	var useruuid = "";
	var orderuuid=new Array();
	var userLang = navigator.language || navigator.userLanguage; 
	userLang=userLang.replace(/[-]/g, "_");
		
	function loadProperties_global(userLang){ 
		jQuery.i18n.properties({
			name:'strings',
			path:'resources/i18n/',
			mode:'map',
			language:userLang,
			callback: function() {
				$('#subnav').html($.i18n.prop('string_subnav'));
				$('#label_uid').html($.i18n.prop('string_uid'));
				
				$('#fsw').html($.i18n.prop('string_fsw'));
				$('#myindex').html($.i18n.prop('string_myindex'));
				$('#myaccount').html($.i18n.prop('string_myaccount'));
				$('#perprof').html($.i18n.prop('string_perprof'));
				$('#lang').html($.i18n.prop('string_lang'));
				$('#logout').html($.i18n.prop('string_logout'));
				
				$('#userinfo').html($.i18n.prop('string_userinfo'));
						$('#hiuser').html($.i18n.prop('string_hi'));
						
				$('#home').html('<i class="fi-home"></i>'+$.i18n.prop('string_home'));
				$('#contact').html('<i class="fi-torso"></i>'+$.i18n.prop('string_contact'));
				$('#about').html('<i class="fi-info"></i>'+$.i18n.prop('string_about'));
				
			}
		}); 
	}
		
	function loadProperties_okdynamic(userLang){ 
		jQuery.i18n.properties({
			name:'strings',
			path:'resources/i18n/',
			mode:'map',
			language:userLang,
			callback: function() {
				$('#upd_ok').html($.i18n.prop('string_updok'));
				$('#ord_ok').html($.i18n.prop('string_ordok'));
				$('#cancel_ok').html($.i18n.prop('string_cancel_ok'));
				$('#pwdreset_ok').html($.i18n.prop('string_pwdreset_ok'));
			}
		}); 
	}
		
	function loadProperties_errordynamic(userLang){ 
		jQuery.i18n.properties({
			name:'strings',
			path:'resources/i18n/',
			mode:'map',
			language:userLang,
			callback: function() {
				$("#E01000").html($.i18n.prop('string_E01000'));
				$("#E01010").html($.i18n.prop('string_E01010'));
				$("#E01020").html($.i18n.prop('string_E01020'));
				$("#E01030").html($.i18n.prop('string_E01030'));
				$("#E01040").html($.i18n.prop('string_E01040'));
				$("#E01050").html($.i18n.prop('string_E01050'));
				$("#E01060").html($.i18n.prop('string_E01060'));
				$("#E01070").html($.i18n.prop('string_E01070'));
				$("#E01080").html($.i18n.prop('string_E01080'));
				$("#E01090").html($.i18n.prop('string_E01090'));
				$("#E01091").html($.i18n.prop('string_E01091'));
				$("#E01100").html($.i18n.prop('string_E01100'));
				$("#E01110").html($.i18n.prop('string_E01110'));
				$("#E01120").html($.i18n.prop('string_E01120'));
				$("#E01130").html($.i18n.prop('string_E01130'));
				$("#E01140").html($.i18n.prop('string_E01140'));
				$("#E01150").html($.i18n.prop('string_E01150'));
				$("#E01160").html($.i18n.prop('string_E01160'));
				$("#E01170").html($.i18n.prop('string_E01170'));
				$("#E01180").html($.i18n.prop('string_E01180'));
				$("#E01190").html($.i18n.prop('string_E01190'));
				$("#E01200").html($.i18n.prop('string_E01200'));
				$("#E01210").html($.i18n.prop('string_E01210'));
				$("#E01220").html($.i18n.prop('string_E01220'));
				$("#notconsistent").html($.i18n.prop('string_notconsistent'));
			}
		}); 
	}
	
	function BindCommonBtn(){
		$("#logout").on('click',function(event){	
			DelCookie("useruuid");
			DelCookie("logintime");
			DelCookie("orderuuidin");
			window.location = "login.html";
		});
	}
	
	function AdjustFooterHeight(){
		var footer = $("#footer");
		var pos = footer.position();
		var height = $(window).height();
		height = height - pos.top;
		height = height - footer.height();
		if (height > 0) {
			footer.css({
				'margin-top': height + 'px'
			});
		}
	}
	
	function DelCookie(c_name){
		if(getCookie(c_name)!=null){
			document.cookie = c_name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
	
	function setCookie_exMin(c_name,value,expireminutes){
		var exdate=new Date();
		exdate.setTime(exdate.getTime() + (expireminutes * 60 * 1000));
		document.cookie=c_name+ "=" +escape(value) + ((expireminutes==null) ? "" : ";expires="+exdate);
	}
	function setCookie_exDay(c_name,value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
	}
	
	function switcherror(re){
		var arglen=arguments.length;
		var pr="tip";
		var style="tip_zq";
		if(arglen>=2){
			pr=arguments[1];// 2 arguments
			if(arglen>=3){
				style=arguments[2];// 3 arguments
			}
		}else if(arglen<1){
			console.log("switcherror: no argument!");
			return;
		}
		console.log("pr="+pr);
		switch (re.errorno) {
			case "E01000":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01000"+'></div>');break;
			case "E01010":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01010"+'></div>');break;
			case "E01020":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01020"+'></div>');break;
			case "E01030":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01030"+'></div>');break;
			case "E01040":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01040"+'></div>');break;
			case "E01050":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01050"+'></div>');break;
			case "E01060":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01060"+'></div>');break;
			case "E01070":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01070"+'></div>');break;
			case "E01080":$('#'+pr+'pwd').before('<div class="'+style+'" id='+"E01080"+'></div>');break;
			case "E01090":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01090"+'></div>');break;
			case "E01091":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01091"+'></div>');break;
			case "E01100":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01100"+'></div>');break;
			case "E01110":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01110"+'></div>');break;
			case "E01120":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01120"+'></div>');break;
			case "E01130":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01130"+'></div>');break;
			case "E01140":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01140"+'></div>');break;
			case "E01150":$('#'+pr+'pwd').before('<div class="'+style+'" id='+"E01150"+'></div>');break;
			case "E01160":$('#'+pr+'pwd').before('<div class="'+style+'" id='+"E01160"+'></div>');break;
			case "E01170":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01170"+'></div>');break;
			case "E01180":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01180"+'></div>');break;
			case "E01190":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01190"+'></div>');break;
			case "E01200":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01200"+'></div>');break;
			case "E01210":$('#'+pr+'tip').before('<div class="'+style+'" id='+"E01210"+'></div>');break;
			case "E01220":$('#'+pr+'uid').before('<div class="'+style+'" id='+"E01220"+'></div>');break;
			default:$('#'+pr+'tip').before('<div class="'+style+'">[other.]</div>');
		}
	}
	
	function QueryUser(useruuid,op, callback){
		var op_re = {};
		var data={};
		data.action="query";
		data.uuid=useruuid;
		for(i=0;i<op.length;i++){
			switch (op[i]) {
				case "phone":
					data.phone="";
					break;
				case "email":
					data.email="";
					break;
				case "username":
					data.username="";
					break;
				case "gender":
					data.gender="";
					break;
				case "birthday":
					data.birthday="";
					break;
				case "address":
					data.address="";
					break;
				case "orders":
					data.orders="";
					break;
				case "lastorder":
					data.lastorder="";
					break;
				default:
					console.log("QueryUser:no-such-op!");
					op_re.result="false";
					op_re.reasons="no-such-op!";
					if (typeof callback !== "undefined") {
						callback(null, op_re);
					}
					return;
			}			
		}
		$.ajax({ 
			url: "/user",
			type: 'POST',
			data: data,
			success: function(re){
				var re = JSON.parse(re);
				if(re.result=="true"){
					orderuuid=re.orders;
				}else{
					console.log("QueryUser:no");
					console.log("QueryUser:re.reasons="+re.reasons);
				}
				op_re=re;
				if (typeof callback !== "undefined") {
					callback(null, op_re);
				}
				return;
			},
			error: function() {
				console.log("QueryUser:error");
				op_re.result="false";
				op_re.reasons="error!";
				if (typeof callback !== "undefined") {
					callback(null, op_re);
				}
				return;
			}
		});
	}

	function QueryOrder(orderuuidin,op,order_index,callback){
		var op_re = {};
		var data={};
		data.action="query";
		data.uuid=orderuuidin;
		for(i=0;i<op.length;i++){
			switch (op[i]) {
				case "createdate":
					data.createdate="";
					break;
				case "head":
					data.head="";
					break;
				case "config":
					data.config="";
					break;
				case "genobj":
					data.genobj="";
					break;
				case "deals":
					data.deals="";
					break;
				case "station":
					data.station="";
					break;
				case "appointmentdate":
					data.appointmentdate="";
					break;
				case "scandate":
					data.scandate="";
					break;
				case "pinfo":
					data.pinfo="";
					break;
				case "status":
					data.status="";
					break;
				case "preconfig":
					data.preconfig="";
					break;
				case "collecteddata":
					data.collecteddata="";
					break;
				default:
					console.log("QueryOrder:no-such-op!");
					op_re.result="false";
					op_re.reasons="no-such-op!";
					if (typeof callback !== "undefined") {
					callback(null, op_re, orderuuidin,order_index);
					}
					return;
			}			
		}
		$.ajax({ 
			url: "/order",
			type: 'POST',
			data: data,
			success: function(re){
				var re = JSON.parse(re);
				if(re.result=="true"){
				}else{
					console.log("QueryOrder:no");
					console.log("QueryOrder:re.reasons="+re.reasons);
				}
				op_re=re;
				if (typeof callback !== "undefined") {
					callback(null, op_re, orderuuidin,order_index);
				}
				return;
			},
			error: function(error) {
				console.log("QueryOrder:error");
				op_re.result="false";
				op_re.reasons="error!";
				if (typeof callback !== "undefined") {
					callback(null, op_re, orderuuidin,order_index);
				}
				return;
			}
		});
	}
		
	Date.prototype.yyyymmdd = function() {
		var yyyy = this.getFullYear().toString();
		var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
		var dd  = this.getDate().toString();
		return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]); // padding
	};
	
	Date.prototype.day = function() {
		var day = this.getDay();
		var weekday=new Array(14);
		weekday[0]="Sunday";
		weekday[1]="Monday";
		weekday[2]="Tuesday";
		weekday[3]="Wednesday";
		weekday[4]="Thursday";
		weekday[5]="Friday";
		weekday[6]="Saturday";
		weekday[7]="周日";
		weekday[8]="周一";
		weekday[9]="周二";
		weekday[10]="周三";
		weekday[11]="周四";
		weekday[12]="周五";
		weekday[13]="周六";
		if(userLang=="zh_CN" || userLang=="zh") return weekday[day+7];
		else return weekday[day];
	};
	
	Date.prototype.hhmm = function() {
		var hh = this.getHours().toString();
		var mm = this.getMinutes().toString();
		return (hh[1]?hh:"0"+hh[0]) +":"+ (mm[1]?mm:"0"+mm[0]); // padding
	};

	function RFC2822toYMD(str_rfc){
		var re=new Date(str_rfc);
		return re.yyyymmdd();
	}
	function YMDtoRFC2822(str_ymd){
		var re = new Date(str_ymd);
		re = re.toUTCString();
		re = re.slice(0, re.indexOf('G')).trim()+" -0000";
		return re;
	}
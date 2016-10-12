//
function setCookie(cname,cvalue,exdays)
	{
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	};
//获得Cookie
function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) 
	  {
	  var c = ca[i].trim();
	  if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";		
}
function checklogin(check_success, check_fail) {
	var _data = {};
	var _user = getCookie("userName");
	var _uuid = getCookie("uuid");
	if(_uuid != "") {
		var fsw_obj = {
			action: "query",
			userData: _user,
			uuid: _uuid
		};
		_data = fsw_obj;
		$.ajax({
			url: "/user",
			type: 'POST',
			data: _data,
			success: function(re) {
				var re_parsed = JSON.parse(re);
				if(re_parsed.result == "true") {
					check_success(re);
				} else {
					check_fail(re);
				}
			},
			error: function(re) {
				check_fail(re);
			}
		}); 
	}else check_fail();
};
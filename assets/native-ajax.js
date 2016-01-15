/**
 * native-ajax.js
 *
 * @author : Kuflievskiy Aleksey <kuflievskiy@gmail.com> 
 * License: MIT
 *
 * @todo add post and get requests (method param)
 * @todo setRequestHeader 
 */

function Ajax( params ) {
	this.init(params);
}

Ajax.prototype.init = function(){};

Ajax.prototype.serialize = function(obj){
  var str = [];
  for(var p in obj)
    if(obj.hasOwnProperty(p)){
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

Ajax.prototype.create_xmlhttp = function() {
	var xmlhttp = false;
	try { xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} 
	catch (exception_1) {  
	  try { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	  } catch (exception_2) {     
		try{
			xmlhttp = new XMLHttpRequest(); 
		}catch(exception_3){
			xmlhttp = false;	
		}
	  }
	}
	return xmlhttp;
};
	
Ajax.prototype.send = function( serverPageURL, data, params ){
	
	// Init send method params section
	var onSuccess = (typeof params.onSuccess == 'function') ? params.onSuccess : function(response){
		console.info('onSuccess');
		console.info(response);
	};

	var onFailed = (typeof params.onFailed == 'function') ? params.onFailed : function(response){
		console.info('onFailed');
		console.info(response);		
	};
	
	var onSend = (typeof params.onSend == 'function') ? params.onSend : function(){
		console.info('onSend');
	};
	
	var data = this.serialize( data );
	var xmlhttp = this.create_xmlhttp();
	xmlhttp.open("POST", serverPageURL, true);
	
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"); 

	xmlhttp.onreadystatechange = function() {
		if (4 === xmlhttp.readyState && 200 === xmlhttp.status) { 
		  onSuccess.call(this,xmlhttp.response);
		} else {
			if(200 != xmlhttp.status){	
			  onFailed.call(this,xmlhttp.response);
			}	
		}
	}	
	
	xmlhttp.send(data);	
	onSend.call(this);
};

ajax = new Ajax();
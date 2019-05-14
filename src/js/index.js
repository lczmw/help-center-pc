var index=(function(win){
		/**
		 * 公用方法集合
		 */
	    var Page ={
	    		init: function() {
	    			this.ajaxRequest.ajax_login();
	    			this.initRegisterEle();
	    		},
	           //reader为一些初始化需要的操作，有时候会有注册事件等，或者一些预操作
	           reader:function(){
	           },
	           //注入所有的选择器，方便选择器变化，直接修改该对象中的选择器，而不需要全局去更改
	           selector:{
	               searchInput: $("#searchInput"),
	               searchInner: $("#searchInner"),
	               searchRelate: $("#searchRelate"),
	           },
	           //注入所有的接口地址，方便接口变化可以进行，快速变更，不需要全局找引用的对象
	           interface:{
	               loginUrl:"/CRMAPI/Account/FindLoginInfo",
	           },
	           //注入page中所有的事件，统一管理，建议命名规范：事件_命名，例 click_login
	           registerEle:{	
	               focus_search:function(){
	                  Page.selector.searchInput.focus(function() {
	                  	Page.selector.searchInner.addClass('is-active');
	                  })
	               },
	               blur_search:function(){
	                  Page.selector.searchInput.blur(function() {
	                  	Page.selector.searchInner.removeClass('is-active');
	                  	Page.selector.searchRelate.hide();
	                  })
	               },
	                change_search:function(){
	                  Page.selector.searchInput.on('input', function(e) {
	                  	console.log(e)
	                  	Page.selector.searchRelate.show();
	                  })
	               },
	              
	           },
	           initRegisterEle: function() {
	           		for(var i in this.registerEle) {
					     this.registerEle[i]();
					}
	           },
	           //注入所有ajax请求，页面所有请求，将在这里统一管理，建议命名规范：ajax_命名，例 ajax_login
	           /*
	           * 该请求中有2种方案,看需求使用
	           *  1.不公用一个请求方案
	           *  2.公用一个请求，但是回调处理不一样
	           * */
	           ajaxRequest:{
	           	   
	               //不公用一个请求方案
	               ajax_login:function(){
	                   $.post(Page.interface.loginUrl, {"customerTel":19906058350,"accountName":"zhangmowen1","securityCode":"201920"} ,function(data){
	                       Page.callback.call_login(data);
	                   });
	               },
	               //会有多个业务公用这个请求
	               ajax_login_T:function(callback){
	                   //所有接口地址从interface中获取，callback中tempObj.callback中处理
	                   $.post("","",callback);
	               },
	           },
	           //处理所有回调函数，针对一个请求，处理一个回调
	           callback:{
	               //不共用请求处理回调
	               call_login:function(data){
	                   //处理回调
	               },
	               //公用请求处理回调
	               call_login_T:function(){
	                   var temp = function(){
	    
	                   };
	                   Page.ajaxRequest.ajax_login_T(temp);
	               }
	           },
	           //所有使用的工具类，如果每个项目都单独的unit.js或者common.js等存放一些公共方法的，这里可以不使用
	           // PS:这里存放的只是仅针对于这个页面处理的一些tool，一般没必要抛出去，不过看业务而定
	           tool:{
	               A:function(){
	                   console.log("");
	               }
	            }
	     };

	     Page.init();
})(window);

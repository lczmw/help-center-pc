var index = (function(win) {
    /**
     * 公用方法集合
     */
    var Page = {
        init: function() {
            this.ajaxRequest.ajax_login();
            this.initRegisterEle();
            this.initStaticPage();
            this.resizeMainAreaHeight();
            // this.initScrollbar();


           
        },
        currentNavId: "1",
        //选择器
        selector: {
            main: $("#main"),
            searchInput: $("#searchInput"),
            searchInner: $("#searchInner"),
            searchRelate: $("#searchRelate"),
            historyProblem: $("#historyProblem"),
            commonProblem: $("#commonProblem"),
            searchClose: $("#searchClose"),
            tagWrapper: $("#tagWrapper"),
            handbook: $("#handbook"),
            kfPop: $("#kfPop"),
            kfBtn: $("#kfBtn"),
            navItems: $(".nav-item"),
        },
        //API
        interface: {
            loginUrl: "/CRMAPI/Account/FindLoginInfo",
        },
        //event
        registerEle: {
            focusSearch: function() {
                Page.selector.searchInput.focus(function() {
                    Page.selector.searchInner.addClass('is-active');
                    Page.selector.historyProblem.show();
                    Page.selector.searchClose.show();
                    if (Page.currentNavId === '1') {
                        Page.selector.commonProblem.hide();
                    } else {
                        Page.selector.handbook.hide();
                    }
                })
            },
            blurSearch: function() {
                Page.selector.searchInput.blur(function() {
                    // Page.selector.searchInner.removeClass('is-active');
                    Page.selector.searchRelate.hide();
                })
            },
            changeSearch: function() {
                Page.selector.searchInput.on('input', function() {
                    Page.selector.searchRelate.show();
                })
            },
            clickSearchInner: function() {
                Page.selector.searchInner.on('click', function() {
                    // Page.selector.searchInput.focus();
                })
            },
            clickSearchClose: function() {
                Page.selector.searchClose.on('click', function() {
                    Page.selector.searchInner.removeClass('is-active');
                    Page.selector.historyProblem.hide();
                    Page.selector.searchClose.hide();

                    if (Page.currentNavId === '1') {
                        Page.selector.commonProblem.show();
                    } else {
                        Page.selector.handbook.show();
                    }
                })
            },
            clickNavItems: function() {
                Page.selector.navItems.on('click', function(ev) {
                    var id = $(this).attr('data-id');
                    Page.currentNavId = id;
                    Page.initStaticPage();
                })
            },
            mousekfBtn: function() {
                var kfPop = Page.selector.kfPop;
                var kfBtn = Page.selector.kfBtn;
                kfBtn.mouseenter(function() {
                    kfPop.show();
                })
                kfBtn.mouseleave(function() {
                    kfPop.hide();
                })
            }
        },
        initStaticPage: function() {
            Page.selector.searchClose.hide();
            Page.selector.searchInner.removeClass('is-active');
            Page.selector.historyProblem.hide();
            $('.nav-item[data-id=' + this.currentNavId + ']').addClass('is-active').siblings().removeClass('is-active');
            if (this.currentNavId === '1') {
                Page.selector.tagWrapper.show();
                Page.selector.commonProblem.show();
                Page.selector.handbook.hide();
            } else if (this.currentNavId === '2') {
                Page.selector.tagWrapper.hide();
                Page.selector.commonProblem.hide();
                Page.selector.handbook.show();
            }
        },
        resizeMainAreaHeight: function() {
        	var mainDom = Page.selector.main;
            var offsetTop = mainDom.offset().top;

            mainDom.height($(window).height() - offsetTop);
            $(window).resize(function() {
                mainDom.height($(window).height() - offsetTop);
            })
        },
        initRegisterEle: function() {
            for (var i in this.registerEle) {
                this.registerEle[i]();
            }
        },
        initScrollbar: function() {
            Page.selector.main.mCustomScrollbar();
        },
        removeMask: function() {
            console.log(123)
            var ele = document.getElementById("whiteMask");
            document.body.removeChild(ele);
        },
        //注入所有ajax请求，页面所有请求，将在这里统一管理，建议命名规范：ajax_命名，例 ajax_login
        /*
         * 该请求中有2种方案,看需求使用
         *  1.不公用一个请求方案
         *  2.公用一个请求，但是回调处理不一样
         * */
        ajaxRequest: {

            //不公用一个请求方案
            ajax_login: function() {
                $.post(Page.interface.loginUrl, { "customerTel": 19906058350, "accountName": "zhangmowen1", "securityCode": "201920" }, function(data) {
                    Page.callback.call_login(data);
                });
            },
            //会有多个业务公用这个请求
            ajax_login_T: function(callback) {
                //所有接口地址从interface中获取，callback中tempObj.callback中处理
                $.post("", "", callback);
            },
        },
        //处理所有回调函数，针对一个请求，处理一个回调
        callback: {
            //不共用请求处理回调
            call_login: function(data) {
                //处理回调
            },
            //公用请求处理回调
            call_login_T: function() {
                var temp = function() {

                };
                Page.ajaxRequest.ajax_login_T(temp);
            }
        },
      
    };

    window.onload = function() {
        Page.init();
    }
})(window);
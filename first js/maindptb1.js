(function($)
	{
	$.tiny=$.tiny||
		{
	};
	$.tiny.carousel=
		{
		options:
			{
			start:1,display:1,axis:'x',controls:true,pager:false,interval:false,intervaltime:3000,rewind:false,animation:true,duration:1000,callback:null
		}
	};
	$.fn.tinycarousel=function(options)
		{
		var options=$.extend(
			{
		}
		,$.tiny.carousel.options,options);
		this.each(function()
			{
			$(this).data('tcl',new Carousel($(this),options))
		}
		);
		return this
	};
	$.fn.tinycarousel_start=function()
		{
		$(this).data('tcl').start()
	};
	$.fn.tinycarousel_stop=function()
		{
		$(this).data('tcl').stop()
	};
	$.fn.tinycarousel_move=function(iNum)
		{
		$(this).data('tcl').move(iNum-1,true)
	};
	function Carousel(root,options)
		{
		var oSelf=this;
		var oViewport=$('.viewport:first',root);
		var oContent=$('.overview:first',root);
		var oPages=oContent.children();
		var oBtnNext=$('.next:first',root);
		var oBtnPrev=$('.prev:first',root);
		var oPager=$('.pager:first',root);
		var iPageSize,iSteps,iCurrent,oTimer,bPause,bForward=true,bAxis=options.axis=='x';
		function initialize()
			{
			iPageSize=bAxis?$(oPages[0]).outerWidth(true):$(oPages[0]).outerHeight(true);
			var iLeftover=Math.ceil(((bAxis?oViewport.outerWidth():oViewport.outerHeight())/(iPageSize*options.display))-1);
			iSteps=Math.max(1,Math.ceil(oPages.length/options.display)-iLeftover);
			iCurrent=Math.min(iSteps,Math.max(1,options.start))-2;
			oContent.css(bAxis?'width':'height',(iPageSize*oPages.length));
			oViewport.parent().addClass(bAxis?'':'vertical');
			oSelf.move(1);
			setEvents();
			return oSelf
		};
		function setEvents()
			{
			if(options.controls&&oBtnPrev.length>0&&oBtnNext.length>0)
				{
				oBtnPrev.click(function()
					{
					oSelf.move(-1);
					return false
				}
				);
				oBtnNext.click(function()
					{
					oSelf.move(1);
					return false
				}
				)
			}
			if(options.interval)
				{
				root.hover(oSelf.stop,oSelf.start)
			}
			if(options.pager&&oPager.length>0)
				{
				$('a',oPager).click(setPager)
			}
		};
		function setButtons()
			{
			if(options.controls)
				{
				oBtnPrev.toggleClass('disable',!(iCurrent>0));
				oBtnNext.toggleClass('disable',!(iCurrent+1<iSteps))
			}
			if(options.pager)
				{
				var oNumbers=$('.pagenum',oPager);
				oNumbers.removeClass('active');
				$(oNumbers[iCurrent]).addClass('active')
			}
		};
		function setPager(oEvent)
			{
			if($(this).hasClass('pagenum'))
				{
				oSelf.move(parseInt(this.rel),true)
			}
			return false
		};
		function setTimer()
			{
			if(options.interval&&!bPause)
				{
				clearTimeout(oTimer);
				oTimer=setTimeout(function()
					{
					iCurrent=iCurrent+1==iSteps?-1:iCurrent;
					bForward=iCurrent+1==iSteps?false:iCurrent==0?true:bForward;
					oSelf.move(bForward?1:-1)
				}
				,options.intervaltime)
			}
		};
		this.stop=function()
			{
			clearTimeout(oTimer);
			bPause=true
		};
		this.start=function()
			{
			bPause=false;
			setTimer()
		};
		this.move=function(iDirection,bPublic)
			{
			iCurrent=bPublic?iDirection:iCurrent+=iDirection;
			if(iCurrent>-1&&iCurrent<iSteps)
				{
				var oPosition=
					{
				};
				oPosition[bAxis?'left':'top']=-(iCurrent*(iPageSize*options.display));
				oContent.stop().animate(oPosition,
					{
					queue:false,duration:options.animation?options.duration:0,easing:"swing",complete:function()
						{
						if(typeof options.callback=='function')options.callback.call(this,oPages[iCurrent],iCurrent)
					}
				}
				);
				setButtons();
				setTimer()
			}
		};
		return initialize()
	}
}
)(jQuery);

//<![CDATA[    
(function (a) {
    a.wdxnewpost = function (c, b) {
        var d = this;
        d.$el = a(c);
        d.init = function () {
            d.options = a.extend({}, a.wdxnewpost.defaultOptions, b);
            d.$el.html('<div class="wdxtaglistco ' + d.options.postType + '"><ul class="wdxnewponew"></ul></div>').addClass(d.options.loadingClass);
            a.get((d.options.blogURL === "" ? window.location.protocol + "//" + window.location.host : d.options.blogURL) + "/feeds/posts/default" + (d.options.tagName === false ? "" : "/-/" + d.options.tagName) + "?max-results=" + d.options.MaxPost + "&orderby=published&alt=json-in-script", function (B) {
                var E, h, D, r, H, t, G, s, q, w, F, y, C, n = "",
                    f = B.feed.entry;
                if (f !== undefined) {
                    for (var z = 0, p = f.length; z < p; z++) {
                        for (var x = 0, v = f[z].link.length; x < v; x++) {
                            if (f[z].link[x].rel == "alternate") {
                                E = f[z].link[x].href;
                                break
                            }
                        }
                        for (var u = 0, A = f[z].link.length; u < A; u++) {
                            if (f[z].link[u].rel == "replies" && f[z].link[u].type == "text/html") {
                                H = f[z].link[u].title.split(" ")[0];
                                break
                            }
                        }
                        D = ("content" in f[z]) ? f[z].content.$t : ("summary" in f[z]) ? f[z].summary.$t : "";
                        var e = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                        t = a("<div></div>").append(D.replace(e, ""));
                        G = t.find("img");
                        if ("media$thumbnail" in f[z]) {
                            s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.ImageSize);
                            if (f[z] === f[0] && d.options.postType !== "s") {
                                s = f[z].media$thumbnail.url.replace(/\/s[0-9]+\-c/g, "/" + d.options.FirstImageSize)
                            } else {
                                if (f[z].media$thumbnail.url.indexOf("img.youtube.com") != -1) {
                                    s = f[z].media$thumbnail.url.replace("default", "0")
                                }
                            }
                        } else {
                            if (G.length != 0) {
                                s = G[0].src
                            } else {
                                s = d.options.pBlank
                            }
                        }
                        D = D.replace(/<\S[^>]*>/g, "");
                        if (D.length > d.options.Summarylength) {
                            D = D.substring(0, d.options.Summarylength) + "..."
                        }
                        h = f[z].title.$t;
                        C = f[z].published.$t.substring(0, 10);
                        q = C.substring(0, 4);
                        w = C.substring(5, 7);
                        F = C.substring(8, 10);
                        y = d.options.MonthNames[parseInt(w, 10) - 1];
                        n += '<li class="a' + z + '"><div class="inner" ><a title="' + h + '" class="imagethubnailwithtagin" href="' + E + '"><img src="' + s + '"/></a><strong><a href="' + E + '">' + h + '</a></strong><div class="info">' + (d.options.ShowDate === true ? '<span id="dayclass">' + y + " " + F + ", " + q + "</span>" : "") + (d.options.ShowComment === true ? '<span id="comclass"><a href="' + E + '#comment-form">' + H + "</a> Comment(s)</span>" : "") + "</div><p " + (d.options.ShowDesc === false ? "" : 'style="display:block"') + ">" + D + "</p></div></li>"
                    }
                    a("ul", d.$el).append(n);
                    if (d.options.postType === "s") {
                        var o = a(c).parents(".widget");
                        var I = o.children("h2");
                        if (d.options.tagName != false) {
                            I.wrapInner('<a href="/search/label/' + encodeURIComponent(d.options.tagName) + '"/>')
                        }
                        var m, g;
                        var k = d.$el.width();
                        if (a(window).width() < 479) {
                            g = 1;
                            m = k / g
                        } else {
                            if (a(window).width() < 979) {
                                g = 2;
                                m = k / g
                            } else {
                                if (a(window).width() < 1025) {
                                    g = 3;
                                    m = k / g
                                } else {
                                    g = 4;
                                    m = k / g
                                }
                            }
                        }
                        a(".wdxtaglistco", d.$el).flexslider({
                            animation: "slide",
                            selector: ".wdxnewponew > li",
                            animationLoop: true,
                            itemWidth: m,
                            minItems: 1,
                            move: g,
                            mousewheel: true,
                            maxItems: 3
                        });
                        d.$el.removeClass(d.options.loadingClass)
                    } else {                        
                    }
                    d.$el.removeClass(d.options.loadingClass)
                } else {
                    d.$el.html("<span>No result! Or Error Loading Feed</span>")
                }
            }, "jsonp")
        };
        d.init()
    };
    a.wdxnewpost.defaultOptions = {
        blogURL: "",
        MaxPost: 6,
        FirstImageSize: "s360-p",
        ImageSize: "s200-p",
        ShowDesc: false,
        ShowDate: true,
        ShowComment: true,
        Summarylength: 170,
        postType: "v",
        loadingClass: "loadingxxnewcontent",
        pBlank: "http://1.bp.blogspot.com/-htG7vy9vIAA/Tp0KrMUdoWI/AAAAAAAABAU/e7XkFtErqsU/s72-c/grey.gif",
        MonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tagName: false
    };
    a.fn.wdxnewpost = function (b) {
        return this.each(function () {
            (new a.wdxnewpost(this, b))
        })
    }
})(jQuery);
//]]>

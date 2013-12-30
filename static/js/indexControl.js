var indexControl = {
    _this: this,
    returnData: {},
    cookieDict: {id: '', session: ''},
    __init__: function() {
        this.cookie();
        var _this = this;
        if (this.cookieDict.id && this.cookieDict.session) {
            $.ajax({
                type: "POST",
                url: '/check',
                data: _this.cookieDict,
                dataType: "json",
                success: function(data){
                    if (data.status == 200) {
                        $(".reg-login").hide();
                        $(".myself").show();
                    }
                }
            })
        };
    },
    cookie: function() {
        var cookie = document.cookie.replaceAll(' ','').split(';');
        for (var i=0;i<cookie.length;i++) {
            var arr = cookie[i].split("=");
            if (arr[0]=='id')
                this.cookieDict.id = arr[1];
            if (arr[0]=='session')
                this.cookieDict.session = arr[1];
        }
    },
    checkData: function(data, callback) {
        callback(data.status == 200?data.data:false);
    },
    getData: function(url, callback, errortag) {
        var _this = this;
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: function(data){
                _this.checkData(data, callback);
            },
            error: function() {
                //_this.checkData(_this.returnData, callback);
                $(errortag).html("<p style='display:block;margin:0 auto;text-align:center'>您的浏览器不支持Ajax</p>");
            }
        })
    },
    indexHander: function(updateData) {
        var animeImageUrl = 'http://images.movie.xunlei.com/submovie_img/';
        var animeUrl = 'http://data.movie.kankan.com/movie/';
        var ul = $(".main-update-container");
        var j = 0;
        if (updateData) {
            for (var i=0;i<updateData.length;i++) {
                if (i == updateData.length / 2) 
                    j = 1;
                var m = updateData[i].animeid;
                var url = animeImageUrl+m[0]+m[1]+'/'+m+'/'+updateData[i].episode+'_1_115x70.jpg';
                $('<li class="main-update-item"><img class="update-img" src="'+url+'" onerror=this.src="./static/img/ar.jpg" /><p class="update-title"><a href="'+animeUrl+updateData[i].animeid+'">'+updateData[i].name+'</a></p><p class="update-title">更新到 <span class="episode">'+updateData[i].episode+'</span> 集</p></li>').appendTo(ul[j]);
            };
        };
        $(".update-load").hide();
        setInterval(function(){carousel.next()}, 10000);
    },
    scheduleHandler: function(updateData) {
        var animeImageUrl = 'http://images.movie.xunlei.com/submovie_img/';
        if (updateData) {
            for (var i=0;i<updateData.length;i++) {
                var m = updateData[i].url.split('/')[4];
                var url = animeImageUrl+m[0]+m[1]+'/'+m+'/'+'1_1_115x70.jpg';
                $('<li class="update-schedule-item"><img class="update-img" src="'+url+'" onerror=this.src="./static/img/ar.jpg" /><p class="update-title"><a href="'+updateData[i].url+'">'+updateData[i].name+'</a></p><p class="update-title">'+updateData[i].time+' 更新</p></li>').appendTo($(".update-schdele-container")[updateData[i].week]);
            }
        }
        $('<a class="carousel-control" href="#prev" data-slide="prev">‹</a><a class="carousel-control control-right" href="#next" data-slide="next">›</a>').appendTo($(".main-schedule-container"));
        $(".carousel-control").click(function(){carousel[this.attributes[2].value]();})
        $(".weekday").show();
        $(".schedule-load").hide();
    },
    loginHandler: function() {
        $(".login-error").hide();
        $(".login-ok").hide();
        var loginUrl = '/login';
        console.log($(".login")[0][0].value);
        console.log($(".login")[0][1].value);
        if ($(".login")[0][0].value == "" || $(".login")[0][1].value == "") {
            console.log(0);
            $(".login-error").text("要填上邮箱和密码0.0");
            $(".login-error").show();
            return;
        }
        $.ajax({
            type: "POST",
            url: loginUrl,
            data: {u: $(".login")[0][0].value, p: $(".login")[0][1].value},
            dataType: "json",
            success: function(data){
                if (data.status != 200) {
                    $(".login-error").text(data.message);
                    $(".login-error").show();
                } else {
                    $(".login-ok").text("登陆成功wwww!");
                    $(".login-ok").show();
                    location.href = '/my.html';
                }
            },
            error: function() {
                $(".login-error").text("登录失败QAQ!");
                $(".login-error").show();
            }
        })
    }
}
var setWidget = function (widget) {
    var type = widget.find("div").html();
    
    if (type == "空白") {
        widget.html('<div class="edit" style="width:95%;height:95%;border-style:dashed;border-width:2px"></div>');
        widget.resizable({
            maxHeight: 600,
            maxWidth: 600,
            minHeight: 100,
            minWidth: 100,
            grid: 100,
            resize: function(event, ui) {
                (ui.helper).css({'position': 'relative', 'top': '', 'left':''});
                calculateCanvasHeight();
            }

        });
        
    } else if (type == "標題") {
    
        fullWidth = Math.floor( ($('body').width())/100 )*95;
        widget.html('<div style:"width:95%;height:95%;margin-left:auto;margin-right:auto"><input type="text" value="請輸入標題..." style="font-size:96px"></input><h1 style="display:none">請輸入標題...</h1></div>');
        widget.width(fullWidth);
        
        var input = widget.find('div').find('input');
        var h1 = widget.find('div').find('h1');
        
        input.live('focusout', function() {
            console.log("input value: "+input.attr('value'));
            h1.html(input.attr('value'));
            input.css("display","none");
            h1.css("display","inline");
        });
        
        h1.click(function() {
            input.attr('value', h1.html());
            input.css("display","inline");
            h1.css("display","none");
        });
        
        
    } else if (type == "文字") {
    
        widget.html('<div style="width:100%; height:100%; background-image:url(\'images/note_bg.png\'); -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;"><textarea class="text-widget edit" row="4" col="50">輸入文字...</textarea><p class="text-widget" style="width:180px; height:180px;"></p></div>');
        
        var input = widget.find('div').find('textarea');
        var p = widget.find('div').find('p');
        p.css("display", "none");
        
        input.live('focusout', function() {
            console.log("input value: "+input.val());
            p.html(input.val());
            input.css("display","none");
            p.css("display","inline");
        });
        
        p.click(function() {
            input.val(p.html());
            input.css("display","inline");
            p.css("display","none");
        });
        
        widget.resizable({
            maxHeight: 600,
            maxWidth: 600,
            minHeight: 200,
            minWidth: 200,
            grid: 100,
            resize: function(event, ui) {
                (ui.helper).css({'position': 'relative', 'top': '', 'left':''});
                
                input.width(parseInt( (ui.helper).width() )-20).height(parseInt( (ui.helper).height() )-20);
                p.width(parseInt( (ui.helper).width() )-20).height(parseInt( (ui.helper).height() )-20);
                
                calculateCanvasHeight();
            }

        });
    
    } else if (type == "天氣") {
        // blank here, see setWidgetDone
    } else if (type == "日期") {
        // blank here, see setWidgetDone
    } else if (type == "地圖") {}
}

setWidgetDone = function(widget) {
    var type = widget.find("div").html();
    
    if (type == "天氣") {
    
        weatherHTMLs = [ '<img src="images/weather_sun.png" alt="sunny" height="95%" width="95%" />', '<img src="images/weather_sun_cloud.png" alt="sunny and cloudy" height="95%" width="95%" />', '<img src="images/weather_cloud.png" alt="cloudy" height="95%" width="95%" />', '<img src="images/weather_rain.png" alt="rainy" height="95%" width="95%" />' ];
    
        widget.html('<div style="width:190px;height:190px;background-image:url(\'images/weather_Bg.png\');position:relative; padding:5px;"><div style="position:absolute; bottom:0px;" class="edit change-weather">next</div><div class="weather-slider">'+weatherHTMLs[0]+'</div></div>');

        //$('img', '.weather-slider').css("display","none");
        
        widget.find('.weather-slider').attr('weather', 0);
        
        widget.find('.change-weather').click(function(){
            newValue = parseInt(widget.find('.weather-slider').attr('weather')) + 1;
            if (newValue == 4) { newValue = 0; }
            widget.find('.weather-slider').attr('weather', newValue);
            $(this).parent().find('.weather-slider').html(weatherHTMLs[newValue]);
        });
    
    
    } else if (type == "日期") {
    
        widget.html('<div style="background-image:url(\'images/date_Bg.png\'); position:relative; width:200px; height:200px;">' /*<div style="position:absolute; z-index:1; width:200px; heigth: 200px;><img src="images/date_Bg.png" style="height:100%;width:100%;"></div>*/ + '<div class="imageText weekText" style="z-index:2; top:-5px; left:0px; color: #ffffff; font-size: 22px; margin: 0px auto; text-align: center;"></div><div class="imageText dayText" style="z-index:2; top:85px; left:0px; margin-left:auto; margin-right:auto; font-size: 70px; text-align: center;"></div><div class="edit" style="bottom:50px; position:absolute; height:10px; width:10px; z-index:3; float:left;"><input type="hidden" class="datepicker" style="z-index:3" /></div></div>');
        
        widget.find(".datepicker").datepicker({
            showOn: "button",
            //buttonImage: "img/date_Bg.png",
            //buttonImageOnly: true,
            buttonText:"Select",
            onSelect:function(){
                var date =  widget.find(".datepicker").datepicker('getDate');
                var d = date.getDate();
                var week = date.getUTCDay();
                var weekday=new Array();
                weekday[6]="Sunday";
                weekday[0]="Monday";
                weekday[1]="Tuesday";
                weekday[2]="Wednesday";
                weekday[3]="Thursday";
                weekday[4]="Friday";
                weekday[5]="Saturday";
                console.log(weekday[week]+d);
                widget.find('.weekText').html(weekday[week]);
                widget.find('.dayText').html(d);
                
                widget.find('.ui-datepicker-trigger').css('z-index','3');
            },
            beforeShow:function(input, inst) {
                widget.find('.ui-datepicker-trigger').css('top','0px');
            }
        });
    
    
    } else if (type == "地圖") {
    
    
        setupMap(widget);
    
    
    } else {
        setWidget(widget);
    }
    
}

showWidgets = function() {
    // widgets: title, text, weather, date, blank
    var $widgetList = $( "#widgets-list" ), $canvas = $( "#canvas" );
    
    console.log("showWidgets");
    
    $( "li", $widgetList ).draggable({
        containment: "document",
        cancel: "a.ui-icon",
        helper: "clone",
        cursor: "move",
        connectToSortable: $canvas,
        drag: function(event, ui) {
            // $(".ui-draggable-dragging").find("div").remove();
            setWidget($(".ui-draggable-dragging"));
        }
    });
    
    $widgetList.droppable({
        accept: "#canvas li",
            activeClass: "custom-state-active",
            drop: function( event, ui ) {
                ui.draggable.remove();
            }
    });
};
/*<html>
<meta charset="UTF-8">  
<head>
<script src="http://code.jquery.com/jquery-1.8.2.js"></script>
<script src="http://code.jquery.com/ui/1.9.0/jquery-ui.js"></script>
<script type="text/javascript"  
src="http://api.maps.yahoo.com/ajaxymap?v=3.8&appid=YD-eQRpTl0_JX2E95l_xAFs5UwZUlNQhhn7lj1H"></script>  
<style type="text/css">  
#map{  
height:200px;  
width:200px;  
}  
</style>  
<link href="fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet">
<link rel="stylesheet" href="http://code.jquery.com/ui/1.9.0/themes/base/jquery-ui.css" />
</head>  
<body>
<li id="bigmap">
<div id="map"></div>
<div id="edit">
	<input id="search" type="text" name="addr" width="150px"/>
    <input id="submit" type="button" width="50px" value="Go" />
</div>
</li>
<script type="text/javascript">  
*/
var setupMap = function(widget) {

    widget.html('<div class="map-placeholder" style="position:relative;"><div class="map" width="200px" height="175px"></div><div class="edit" height="25px" style="position:absolute; bottom:0px;"><input class="map-search" type="text" name="addr" width="150px" /><input class="map-submit" type="button" width="50px" value="Go" /></div></div>');

    // Create a map objec
    var map = new YMap(widget.find('.map'));  
  
    // Add map type control  
    map.addTypeControl();  
    
    map.addZoomLong();
  
    // Set map type to either of: YAHOO_MAP_SAT, YAHOO_MAP_HYB, YAHOO_MAP_REG  
    map.setMapType(YAHOO_MAP_REG);
  
    var yg = new YGeoPoint(25.0573,121.6142);
  
    // Display the map centered on a geocoded location,zoom  
    map.drawZoomAndCenter(yg, 4);
    
    if (widget.find('.map-submit')) {
    
    widget.find('.map-submit').click(function() {
        map.drawZoomAndCenter(widget.find('.map-search').val(), 4);
    });
    
    widget.find('.map').resizable();
    widget.resizable({
        alsoResize: widget.find('.map'),
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
    
    }
    
};
<?php
$html = $_POST['html']; //要使用的功能

$file = fopen("canvas.html", "w");
$htmlUp = '<!DOCTYPE html><html>'.
'<head><meta charset="UTF-8"><title>Your Canvas!!</title>'.
'<link rel="stylesheet" href="stylesheets/prototype.css" />'.
'<link href="fancybox/jquery.fancybox-1.3.4.css" rel="stylesheet">'.
'<style>#canvas .photoImg {width:95%;height:95%;}</style>'.
'<script src="http://code.jquery.com/jquery-1.8.2.js"></script>'.
'<script src="fancybox/jquery.fancybox-1.3.4.min.js"></script>'.
'<script src="js/image_scale.js"></script>'.
'<script>$(document).ready(function(){$(".photo a").fancybox({transitionIn:"elastic",transitionOut:"elastic",cyclic:true});'.
'$(".edit").remove();});</script></head><body>';

$htmlDown ='</body></html>';

fwrite($file, $htmlUp);
fwrite($file, $html);
fwrite($file, $htmlDown);

fclose($file);
echo 'canvas.html';
 
?>
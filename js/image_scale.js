var rescale_image = function(img, boxWidth, boxHeight) {
    if (boxHeight == 0) return;

    imgWidth = img.removeAttr("width").attr('offsetWidth');
    imgHeight= img.removeAttr("height").attr('offsetHeight');
    
    if (imgWidth/imgHeight > boxWidth/boxHeight) {
    
        img.css({'min-height':'100%', 'max-height':'100%', 'width':'auto'});
        
        img.removeAttr("max-width");
    
    } else {
    
        img.css({'min-width':'100%', 'max-height':'100%', 'height':'auto'});
        
        img.removeAttr("max-height");
    }
};
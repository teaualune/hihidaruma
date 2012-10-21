var calculateCanvasHeight = function () {
        
            // calculate canvas size!
                var $canvas = $("#canvas");
            
                var maxCanvasH = 0;
                
                $("#canvas li").each(function() {
                    if ($(this).position().top + $(this).height() > maxCanvasH) { maxCanvasH = $(this).position().top + $(this).height(); }
                });
                $canvas.height( maxCanvasH - $canvas.position().top );
                
                 if ($canvas.height() < 200) { $canvas.height(200); }
                // caculate complete
        
};

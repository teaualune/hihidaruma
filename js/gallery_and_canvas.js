
var GandC = function() {
    
    	$( "#tabs" ).tabs({
            collapsible: true
        });
    
        // there's the gallery and the trash
        var $gallery = $( "#gallery" ),
            $canvas = $( "#canvas" );
 
        // let the gallery items be draggable
        $( "li", $gallery ).draggable({
            cancel: "a.ui-icon", // clicking an icon won't initiate dragging
            //revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document",
            helper: "clone",
            cursor: "move",
            connectToSortable: $canvas,
            drag: function(event, ui) {
            	console.log("gallery draggable");
            }
        });
 
        // let the trash be droppable, accepting the gallery items
        $canvas.droppable({
            accept: "#gallery > li",
            activeClass: "ui-state-highlight",
            drop: function( event, ui ) {
            	console.log("canvas droppable");
            }
        });
 
        // let the gallery be droppable as well, accepting items from the trash
        $gallery.droppable({
            accept: "#canvas li",
            activeClass: "custom-state-active",
            drop: function( event, ui ) {
                ui.draggable.remove();
            }
        });
       
        $canvas.sortable({
        	sort: function(event, ui) {
                $(ui.placeholder).size = ui.item.size;
        	},
        	stop: function(event, ui) {
            
                if (ui.item.hasClass("widget")) {
                    setWidgetDone(ui.item);
                    ui.item.removeClass("widget").removeClass("ui-widget-content");
                }
                
                if (ui.item.hasClass("init")) {
                    ui.item.find('a').fancybox({
                        transitionIn:'elastic',
                        transitionOut:'elastic',
                        cyclic:true
                    }).attr('rel', 'canvas');
                    
                    ui.item.resizable({
                        //animate: true,
                        //containment: $canvas,
                        maxHeight: 600,
                        maxWidth: 600,
                        minHeight: 100,
                        minWidth: 100,
                        grid: 100,
                        resize: function(event, ui) {
                            (ui.helper).css({'position': 'relative', 'top': '', 'left':''});
                            rescale_image((ui.helper).find('img'), (ui.helper).width(), (ui.helper).height());
                            calculateCanvasHeight();
                        }
                    });
                    
                    ui.item.find('img').addClass("canvas-li-imgs");
                    
                    ui.item.removeClass("init").removeClass("ui-widget-content");
                }
                
                rescale_image(ui.item.find('.canvas-li-imgs'), ui.item.width(), ui.item.height());
                calculateCanvasHeight();
                
        	},
            placeholder: "scroll-content-item-placeholder"
        }).disableSelection();

    };
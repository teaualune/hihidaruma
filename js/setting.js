var setting = function () {

    $('#export-area').hide();

    $('#preview-button').click(function() {
        console.log('preview');
    });
    
    $('#export-button').click(function() {
    
    //style="height:50px;line-height:24px; font-size=20px;"
    
        var canvasHTML = $('#canvas-placeholder').html();
    	$.post('generateHTML.php','html='+canvasHTML,function(data){
            var url = "http://hihidaruma.herokuapp.com/hihidarumaApp2/"+data;
    		alert('The URL is: '+url);
            //$('#export-url-p').text(url);
            $('#export-url-p').attr('href', url);
    	});
        
        $('#export-area').show();
    });
    
    $('#fb-share').click(function() {
    	var url = $('#export-url-p').text();
        // share to facebook
    	FB.ui({
	    	method: 'feed',  
	    	link: url,
	    	name: 'Hihidaruma',
	    	caption: 'Flickr + Facebook + iPhoto',
	    	description: 'This is the web page which i edit my photo on it!!',
	    	picture: 'http://10.101.136.173/hihidaruma/hihidarumaApp2/images/hihidaruma_shadow.png',
	    	message: 'Ya'
		});
    });

};
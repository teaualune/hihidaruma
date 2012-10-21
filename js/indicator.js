function stopIndicator(){
	$('#ajaxBusy').hide();
}

function startIndicator(){
    w = $('#ajaxBusy').width();
	$('#ajaxBusy').height(w).show();
}
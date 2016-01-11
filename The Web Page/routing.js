// hash routing function


var dontScrl; //to prevent scrolling if hash has been changed preemtively (ex. while scrolling)

filterHandler = function(filterName) { //handling the hash filter on the main page (before the slash)
	if (!dontScrl) {
		$('document, body').animate({scrollTop: (filterName? $('#' + filterName).offset().top - 120: 0)}, 900);
		setTimeout(function() {$('.forceIndicator').removeClass('forceIndicator')}, 900);
	};
	$('#currentPageIndicator').attr('id', '');
	return $('#header a[href="#'+filterName+'/"]').parent().attr('id', 'currentPageIndicator');
};


winHashHandler = function(e) { //general hash handling function
	var fullHash = window.location.hash;
	var filterName = fullHash.slice(1, fullHash.indexOf('/')); //get the filter (before the slash)
	var strCrop = fullHash.slice(fullHash.indexOf('/')+1); //get data after slash



	if (filterName) {
		if (filterName == 'bttns' || filterName == 'mns' || filterName == 'frms' || filterName == 'txtblckcntnrs')
			filterHandler(filterName);

		else { // if random filter used
			alert('wtf?');
			window.location.hash = '/' + (strCrop? strCrop: '');
		};
	}
	else{
		filterHandler(''); // handle an empty hash filter
	};

	if (!strCrop || strCrop == '') { //if nothing after the slash
		//show mainpage
		$('#strCropOverlay').remove();
		$('.makeThisShitFullScreened').removeAttr('class');


		$('#exitFullScreenShit').addClass('temporaryAnimationShit');
		setTimeout(function() {$('#exitFullScreenShit').remove();}, 400);
		$('body').attr('class', '');
	}
	else if(strCrop.indexOf('?id=') == 0) { // for future overlay routings

	}
	else{ // 404 page
		var iframeTemplateName = 'notFound/notFound.html';
		$('body').prepend('<div id="strCropOverlay"><iframe src="'+iframeTemplateName+'"></iframe></div>')
		$('#header>div>ul').append('<span id="exitFullScreenShit" class="temporaryAnimationShit" onclick="window.history.back();">Back<span></span></span>');
		setTimeout(function() {$('.temporaryAnimationShit').removeAttr('class');}, 150);
		$('body').addClass('stopScroll');
	};
	return;
};


$(document).ready(winHashHandler);
$(window).on('hashchange', winHashHandler);


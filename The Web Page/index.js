
// adjust hash based on scroll position on the home page
$(window).scroll(function() {
	dontScrl = true;
	var scrlTp = $(window).scrollTop();
	if (scrlTp < $('#collectionContainer').offset().top - 126) {
		window.location.hash = '/' + window.location.hash.slice(window.location.hash.indexOf('/')+1);
	}
	else if(scrlTp < ($('#mns').offset().top-126)) {
		window.location.hash = 'bttns/' + window.location.hash.slice(window.location.hash.indexOf('/')+1);
	}
	else if(scrlTp < ($('#frms').offset().top-126)) {
		window.location.hash = 'mns/' + window.location.hash.slice(window.location.hash.indexOf('/')+1);
	}
	else if(scrlTp < ($('#txtblckcntnrs').offset().top-126)) {
		window.location.hash = 'frms/' + window.location.hash.slice(window.location.hash.indexOf('/')+1);
	}
	else if(scrlTp >= ($('#txtblckcntnrs').offset().top-126)) {
		window.location.hash = 'txtblckcntnrs/' + window.location.hash.slice(window.location.hash.indexOf('/')+1);
	};
	return;
});
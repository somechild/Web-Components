$(document).ready(function() {
	$('h1>span:first-child').css('opacity', '1');
	$('h1>span').each(function(index) {
		var self = this;
		setTimeout(function() {$(self).css({'top': '0', 'opacity': '1'})}, ((index)*240));
	});

	setTimeout(function() {
		$('p>span').each(function(index) {
			var i = index == 4? 4.5: index;
			var self = this;
			setTimeout(function() {$(self).show()}, ((i)*360));
		});
	}, 900);
});
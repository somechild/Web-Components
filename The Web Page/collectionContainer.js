
// to prevent scrolling the body once user has fully scrolled the inside of a div/iframe
	//required the https://github.com/jquery/jquery-mousewheel plugin
stopScrolling = function(event) {
	var evt = event || window.event;
	var thisItemHeight = $(this).height() + parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
	var maxScroll = $(this)[0].scrollHeight - thisItemHeight;
	if ($(this).scrollTop()>(maxScroll-1) && (evt.deltaY<0)) {
		event.preventDefault();
		return false;
	}
	else if ($(this).scrollTop()<1  && (evt.deltaY>0)) {
		event.preventDefault();
		return false;
	};
};




// inject list of web components into html for demoing
var populateList = function(bttnsData, mnsData, frmsData, txtBlcksData) {

	var numberOfBttns = bttnsData[0]; var numberOfMns = mnsData[0]; var numberOfFrms = frmsData[0]; var numberOfTxtBlcks = txtBlcksData[0];
	
	var prefixes = ['bttns', 'mns', 'frms', 'txtblckcntnrs'];
	var prefixIndex = 0;
	

	for (var i = 1; i <= numberOfBttns; i++) {
		var classVar = bttnsData[1][i.toString()]? bttnsData[1][i.toString()]: "";
		$('#'+prefixes[prefixIndex]+'>.itemGallery').append('<div class="'+classVar+'"><span></span><iframe src="components/'+prefixes[prefixIndex]+'/'+prefixes[prefixIndex][0]+'_'+i+'/view.html" id="'+prefixes[prefixIndex][0]+'_'+i+'frame" fullscreen seamless></iframe><div><a onclick="setTimeout(function(){fullScreen(\''+prefixes[prefixIndex][0]+'_'+i+'\');}, 300);">Expand Demo</a><a onclick="var self = this;setTimeout(function(){goTo(self);}, 300);">Get code</a></div></div>');
		$('#'+prefixes[prefixIndex][0]+'_'+i+'frame').load(function() {
			$(this).siblings('span').remove();
		});
	};

	prefixIndex++;
	for (var i = 1; i <= numberOfMns; i++) {
		var classVar = mnsData[1][i.toString()]? mnsData[1][i.toString()]: "";
		$('#'+prefixes[prefixIndex]+'>.itemGallery').append('<div class="'+classVar+'"><span></span><iframe src="components/'+prefixes[prefixIndex]+'/'+prefixes[prefixIndex][0]+'_'+i+'/view.html" id="'+prefixes[prefixIndex][0]+'_'+i+'frame" fullscreen seamless></iframe><div><a onclick="setTimeout(function(){fullScreen(\''+prefixes[prefixIndex][0]+'_'+i+'\');}, 300);">Expand Demo</a><a onclick="var self = this;setTimeout(function(){goTo(self);}, 300);">Get code</a></div></div>');
		$('#'+prefixes[prefixIndex][0]+'_'+i+'frame').load(function() {
			$(this).siblings('span').remove();
		});
	};

	prefixIndex++;
	for (var i = 1; i <= numberOfFrms; i++) {
		var classVar = frmsData[1][i.toString()]? frmsData[1][i.toString()]: "";
		$('#'+prefixes[prefixIndex]+'>.itemGallery').append('<div class="'+classVar+'"><span></span><iframe src="components/'+prefixes[prefixIndex]+'/'+prefixes[prefixIndex][0]+'_'+i+'/view.html" id="'+prefixes[prefixIndex][0]+'_'+i+'frame" fullscreen seamless></iframe><div><a onclick="setTimeout(function(){fullScreen(\''+prefixes[prefixIndex][0]+'_'+i+'\');}, 300);">Expand Demo</a><a onclick="var self = this;setTimeout(function(){goTo(self);}, 300);">Get code</a></div></div>');
		$('#'+prefixes[prefixIndex][0]+'_'+i+'frame').load(function() {
			$(this).siblings('span').remove();
		});
	};

	prefixIndex++;
	for (var i = 1; i <= numberOfTxtBlcks; i++) {
		var classVar = txtBlcksData[1][i.toString()]? txtBlcksData[1][i.toString()]: "";
		$('#'+prefixes[prefixIndex]+'>.itemGallery').append('<div class="'+classVar+'"><span></span><iframe src="components/'+prefixes[prefixIndex]+'/'+prefixes[prefixIndex][0]+'_'+i+'/view.html" id="'+prefixes[prefixIndex][0]+'_'+i+'frame" fullscreen seamless></iframe><div><a onclick="setTimeout(function(){fullScreen(\''+prefixes[prefixIndex][0]+'_'+i+'\');}, 300);">Expand Demo</a><a onclick="var self = this;setTimeout(function(){goTo(self);}, 300);">Get code</a></div></div>');
		$('#'+prefixes[prefixIndex][0]+'_'+i+'frame').load(function() {
			$(this).siblings('span').remove();
		});
	};
	$('.itemGallery iframe').on('mousewheel', stopScrolling);

	return;
};

populateList(
	//bttns
	[6, {
		"1": "isMedH",
		"5": "isMedH"
	}],
	//mns
	[4, {
		"2": "isLargH",
		"4": "isLargH"
	}],
	//frms
	[2, {
		"1": "isLargH"
	}],
	//txtblcks
	[4, {
		"1": "isLargH",
		"2": "isLargH",
		"4": "isLargH"
	}]
);




// toggle fullscreen on a demo
var fullScreen = function(pass, shitasdf) {
	if (shitasdf) {
		$('.makeThisShitFullScreened').removeAttr('class');
		$('#exitFullScreenShit').addClass('temporaryAnimationShit');
		setTimeout(function() {$('#exitFullScreenShit').remove();}, 400);
		$('body').attr('class', '');
	}
	else{
		$('#' + pass + 'frame').attr('class', 'makeThisShitFullScreened');
		$('#header>div>ul').append('<span id="exitFullScreenShit" class="temporaryAnimationShit" onclick="fullScreen(\'dontgiveafuck\', \'fuck yeah\')">Close<span></span></span>');
		setTimeout(function() {$('.temporaryAnimationShit').removeAttr('class');}, 150);
		$('body').addClass('stopScroll');
	};
	return;
};

// toggle the code stage for a specific componenet
var goTo = function(pass, fuckinshitasdf) {
	if (fuckinshitasdf) {
		$('#exitFullScreenShit').addClass('temporaryAnimationShit');
		$('#codeStage').attr('class', 'codeStageAnimator');
		setTimeout(function() {$('#exitFullScreenShit, #codeStage').remove();}, 400);
		$('body').attr('class', '');
	}
	else{
		$('#body').before('<div id="codeStage" class="codeStageAnimator"><h2>Copy the code!</h2><div><p>Jump To:</p><a onclick="$(this).parents(\'#codeStage\').animate({scrollTop: $(this).parent().siblings(\'p:first-of-type\')[0].offsetTop - $(this).parents(\'#codeStage\')[0].offsetTop}, 300);">HTML</a><a onclick="$(this).parents(\'#codeStage\').animate({scrollTop: $(this).parent().siblings(\'p:nth-of-type(2)\')[0].offsetTop - $(this).parents(\'#codeStage\')[0].offsetTop}, 300);">CSS</a><a onclick="$(this).parents(\'#codeStage\').animate({scrollTop: $(this).parent().siblings(\'p:last-of-type\')[0].offsetTop - $(this).parents(\'#codeStage\')[0].offsetTop}, 300);">JS</a></div><p>The HTML</p><pre>//shits loading</pre><p>The CSS</p><pre>//shits loading</pre><p>The JavaScript</p><pre>//shits loading</pre></div>');
		var shit = $(pass).parent().siblings('iframe');
	///*below is temp reassignment since i cannot access iframes if i'm not opening this on a server*/
		//shit = {contents: function() {return {find: function(tits) {return {html: function() {return(tits + 'tittays');}};}}}};

		var htmlToUse = shit.contents().find('pre:first-of-type').html();
		var cssToUse = shit.contents().find('pre:nth-of-type(2)').html();
		var jsToUse = shit.contents().find('pre:last-of-type').html();
		$('#codeStage>pre:first-of-type').html(htmlToUse);
		$('#codeStage>pre:nth-of-type(2)').html(cssToUse);
		$('#codeStage>pre:last-of-type').html(jsToUse);
		
		setTimeout(function() {$('#codeStage').removeAttr('class');}, 30);


		$('#header>div>ul').append('<span id="exitFullScreenShit" class="temporaryAnimationShit" onclick="goTo(\'dontgiveafuck\', \'fuck yeah\')">Close<span></span></span>');
		setTimeout(function() {$('.temporaryAnimationShit').removeAttr('class');}, 150);
		$('body').addClass('stopScroll');
	};
	return;
};
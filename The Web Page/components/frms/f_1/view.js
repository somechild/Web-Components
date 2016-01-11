$(document).ready(function() {

	// for toggling dropdowns
	$('.formDropdown>p').click(function() {
		$(this).parent().toggleClass('collapsed');
		if ($(this).parent().hasClass('multiSelect')) {
			$('body').addClass('stopScroll');
		};
	});


	//-----------------------------------single select dropdown code-----------------------------------

		function updateSingleSelectVals() {

			// set the option value in the select dropdown associated with this, so post submissions can read it

			var val = $(this).children('p').attr('data-selectedValue');
			var txt = $(this).children('p').children('span:first-child').text();
			$(this).children('select').html('<option value="'+val+'" selected="selected">'+txt+'</option>');
		}

		//initialization
		$('.formDropdown.singleSelect').each(updateSingleSelectVals);


		// handling changes
		$('.formDropdown.singleSelect>ul>li').click(function() {
			$(this).parent().siblings('p').children('span:first-child').text($(this).text());
			$(this).parent().siblings('p').attr('data-selectedValue', $(this).attr('data-value'));
			$(this).siblings('.isSelected').removeAttr('class');
			$(this).attr('class', 'isSelected');
			$(this).parent().parent().addClass('collapsed');

			$('.formDropdown.singleSelect').each(updateSingleSelectVals);
		});

	//-----------------------------------multi select dropdown code-----------------------------------

		function updateMultiSelectVals() {
			var selctedValsArr = $(this).children('p').attr('data-selectedValue').split('/(*)/').map(function(thisItem) {
				return thisItem.trim();
			});
			var selectedTxtsArr = $(this).children('p').children('span:first-child').text().split(', ');

			var htmlTxt = selctedValsArr.reduce(function(prev, curr, i) {
				var toRet = '<option value="'+curr+'" selected="selected">'+selectedTxtsArr[i]+'</option>';
				return prev + toRet;
			}, '');
			$(this).children('select').html(htmlTxt);

		};

		//initialization
		$('.formDropdown.multiSelect').each(updateMultiSelectVals);


		//handling events
		$('.formDropdown.multiSelect>div>a').click(function() {
			$(this).parents('.formDropdown.multiSelect').addClass('collapsed');
			$('body').removeClass('stopScroll')

			var selectedVals = [];
			var selectedTxts = [];
			$(this).siblings('ul').children('li.isSelected').each(function() {
				selectedVals.push($(this).attr('data-value'));
				selectedTxts.push($(this).text());
			});


			$(this).parents('.formDropdown.multiSelect').children('p').attr('data-selectedValue', selectedVals.join(' /(*)/ '));
			$(this).parent().siblings('p').children('span:first-child').text(selectedTxts.join(', '));

			$('.formDropdown.multiSelect').each(updateMultiSelectVals);
		});

		$('.formDropdown.multiSelect>div>ul>li').click(function() {
			$(this).toggleClass('isSelected');
		});




	//-----------------------------------upload dropdown code-----------------------------------
		var inptChgFunc; //what to do when input changes -- depends on whether or not drag and drop is complatible

		// gray dropzone on file hover function
		function FileDragHover(e) {
			e.stopPropagation();
			e.preventDefault();
			$(e.currentTarget).siblings('div:last-child')[0].className = (e.type == "dragover" ? "hover" : "");
		};
		function init() {
			// enable drag and drop styling
			$('.fileUpload').removeClass('disabled');

			// add drag and drop styling handler for each drop zone
			$('.fileUpload>input[type="file"]').each(function() {
				var drg = $(this)[0];
				drg.addEventListener("dragover", FileDragHover, false);
				drg.addEventListener("dragleave", FileDragHover, false);
				drg.addEventListener("drop", function(e) {
					$(e.currentTarget).siblings('div:last-child')[0].className = "";
				});
			});

			// make file selected indicator use file name
			inptChgFunc = function(e) {
				var flName = $(this).val().split('/').pop().split('\\').pop();
				$(this).parent().find('.msgForEnabled').html('<b>'+flName+'</b><br>File selected');
				$(this).parent().find('.msgForEnabled').siblings('img')[0].src = "https://maxcdn.icons8.com/iOS7/PNG/75/Files/check_file-75.png";
			};
		};

		//check if drag and drop is compatible and do accordingly
		if (window.File && window.FileList && window.FileReader)
			init();
		else
			inptChgFunc = function() { //make a basic file selected indicator
				$(this).parent().find('.msgForDisabled').text('File selected. Click to change');
			};

		// handle file input changes
		$('.fileUpload>input[type="file"]').change(inptChgFunc);
});





//--arr.proto.reduce() polyfill--

// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
if (!Array.prototype.reduce) {
	Array.prototype.reduce = function(callback /*, initialValue*/) {
		'use strict';
		if (this == null) {
			throw new TypeError('Array.prototype.reduce called on null or undefined');
		}
		if (typeof callback !== 'function') {
			throw new TypeError(callback + ' is not a function');
		}
		var t = Object(this), len = t.length >>> 0, k = 0, value;
		if (arguments.length == 2) {
			value = arguments[1];
		}
		else {
			while (k < len && !(k in t)) {
				k++; 
			}
			if (k >= len) {
				throw new TypeError('Reduce of empty array with no initial value');
			}
			value = t[k++];
		}
		for (; k < len; k++) {
			if (k in t) {
				value = callback(value, t[k], k, t);
			}
		}
		return value;
	};
}



//--arr.proto.map() polyfill--

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.io/#x15.4.4.19
if (!Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

    var T, A, k;

    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }

    // 1. Let O be the result of calling ToObject passing the |this| 
    //    value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal 
    //    method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) 
    //    where Array is the standard built-in constructor with that name and 
    //    len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while (k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal 
      //    method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal 
        //    method of O with argument Pk.
        kValue = O[k];

        // ii. Let mappedValue be the result of calling the Call internal 
        //     method of callback with T as the this value and argument 
        //     list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor
        // { Value: mappedValue,
        //   Writable: true,
        //   Enumerable: true,
        //   Configurable: true },
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, k, {
        //   value: mappedValue,
        //   writable: true,
        //   enumerable: true,
        //   configurable: true
        // });

        // For best browser support, use the following:
        A[k] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };
}
///////////////////////////////////////////////////////////////////////////////
////////////////       String Methods     /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function trim(s) {
    return s.replace(/^\s+|\s+$/gm,'');
}

function firstMayus(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}

///////////////////////////////////////////////////////////////////////////////
////////////////       AJAX Methods     ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function createHttp () {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}

function httpRequest(httpObj, path) {
 	httpObj.open('GET', path, true);
 	httpObj.send(null);
}

/* AJAX TEMPLATE

function loadAJAX() {
	var httpObj = createHttp();

	httpObj.onreadystatechange = function () {
		if (httpObj.readyState == 4 && httpObj.status == 200) {

			// CODE

		}
	};

	httpRequest(httpObj, FILEPATH);
}

*/

///////////////////////////////////////////////////////////////////////////////
////////////////       GoogleMaps Methods     /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Search place in the map Google API
// Zoomsize is optional
function loadMap(cityname, zoomsize) {
	zoomsize = typeof zoomsize !== 'undefined' ? zoomsize : 14;
	new google.maps.Geocoder().geocode({ 'address': cityname }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var map = new google.maps.Map(document.getElementById("googleMap"), {
				center : new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
				zoom : zoomsize,
				region: cityname,
				mapTypeId : google.maps.MapTypeId.ROADMAP
			});
		}
	});
}

///////////////////////////////////////////////////////////////////////////////
////////////////       Validation Methods     /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function validateEmail(email) {
    var splitted = email.match("^(.+)@(.+)$");
    if (splitted == null) return false;
    if (splitted[1] != null) {
        var regexp_user = /^\"?[\w-_\.]*\"?$/;
        if (splitted[1].match(regexp_user) == null) {
        	return false;
        }
    }
    if (splitted[2] != null) {
        var regexp_domain = /^[\w-\.]*\.[A-Za-z]{2,4}$/;
        if (splitted[2].match(regexp_domain) == null) {
            var regexp_ip = /^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/;
            if (splitted[2].match(regexp_ip) == null) {
            	return false;
            }
        }
        return true;
    }
    return false;
}

function isEmpty(value) {
    value = value.replace(/^\s+|\s+$/gm,'');
    return (value.length) == 0 ? true : false;
}

///////////////////////////////////////////////////////////////////////////////
/////////////////////       Util Methods     //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function printJSON(json) {
	if (typeof json != 'string') {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		var className = 'viewjson';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				className = 'key';
			} else {
				className = 'string';
			}
		} else if (/true|false/.test(match)) {
			className = 'boolean';
		} else if (/null/.test(match)) {
			className = 'null';
		}
		return '<span class="' + className + '">' + match + '</span>';
	});
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

// Disable Enter Key
function disableEnter(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		return false;
	}
}

function isEmail(s) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(s);
}

// Update the page every N seconds
function updateEvery(N) {
	setTimeout(function () {
		window.location.reload();
	}, N);
}

// Fast Debug
function u(s) {
	console.log(s);
}


///////////////////////////////////////////////////////////////////////////////
////////////////       jQuery Methods         /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Smooth Scrooll by sections
$(function() {
	$('a[href*=#]:not([href=#])').stop().click(function () {

		var name = this.href.substr(this.href.search("#") + 1, this.href.length);

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').stop().animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});
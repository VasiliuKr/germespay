function initMap() {
	// Change some styles
	var styleArray = [
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3d3d3"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ebebeb"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7a7a7"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#737373"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    }
];
	// Create a map object and specify the DOM element for display.
	var map = new google.maps.Map(document.getElementById('pointsMap'), {
		center: {lat: 56.136874, lng: 47.261590},
		// scrollwheel: false,
		zoom: 13,
		styles: styleArray,
		disableDefaultUI: false
	});
	// Create marker
	var office1 = new google.maps.Marker({
		position: {lat: 56.127956, lng: 47.265265},
		map: map,
		icon: 'img/mark.png'
	});

	var office2 = new google.maps.Marker({
		position: {lat: 56.137156, lng: 47.276565},
		map: map,
		icon: 'img/mark.png'
	});

	var office3 = new google.maps.Marker({
		position: {lat: 56.131156, lng: 47.278565},
		map: map,
		icon: 'img/mark.png'
	});

	var office4 = new google.maps.Marker({
		position: {lat: 56.117156, lng: 47.256565},
		map: map,
		icon: 'img/mark.png'
	});

    var pointItems = $('#booking-desks-list').find('.points__item'); 


	office1.addListener('click', function() {
		map.setZoom(16);
		map.setCenter(office1.getPosition());
        pointItems.removeClass('active');
        $('#booking-desk-1').addClass('active');
	});
	office2.addListener('click', function() {
		map.setZoom(16);
		map.setCenter(office2.getPosition());
        pointItems.removeClass('active');
        $('#booking-desk-2').addClass('active');
	});
	office3.addListener('click', function() {
		map.setZoom(16);
		map.setCenter(office3.getPosition());
        pointItems.removeClass('active');
        $('#booking-desk-3').addClass('active');
	});
	office4.addListener('click', function() {
		map.setZoom(16);
		map.setCenter(office4.getPosition());
        pointItems.removeClass('active');
        $('#booking-desk-4').addClass('active');
	});


	$(document).on('click', '.points__item-inner', function(event) {
		event.preventDefault();
		var pointItem = $(this).parent('.points__item'),
			otherPointItems = pointItem.siblings('.points__item');
		pointItem.addClass('active');
		otherPointItems.removeClass('active');
		map.setZoom(16);
		switch($(this).data('officeId')) {
			case 1:
				map.setCenter(office1.getPosition());
				break;
			case 2:
				map.setCenter(office2.getPosition());
				break;
			case 3:
				map.setCenter(office3.getPosition());
				break;
			case 4:
				map.setCenter(office4.getPosition());
				break;
		}
	});
}

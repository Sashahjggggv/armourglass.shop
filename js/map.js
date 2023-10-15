jQuery(function ($) {

    var maps = [],
        mapStyles = [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                        "saturation": 36
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{
                        "visibility": "on"
                    },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    },
                    {
                        "weight": 1.2
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 20
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 21
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 29
                    },
                    {
                        "weight": 0.2
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 18
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 16
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 19
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                        "color": "#000000"
                    },
                    {
                        "lightness": 17
                    }
                ]
            }
        ],
        ibOptions = {
            alignBottom: true,
            content: 'text',
            pixelOffset: new google.maps.Size(($(window).width() < 768) ? -125 : -175, -60),
            boxStyle: {
                width: ($(window).width() < 767) ? "250px" : "350px"
            },
            closeBoxMargin: "5px",
            closeBoxURL: 'img/icons/icon-close.png'
        },

        ib = new InfoBox(ibOptions),
        directionsDisplayObj = {},
        mapDefaulCenter,
        mapDefaulZoom,
        markersArr = [];

    function Map(id, mapOptions) {
        this.map = new google.maps.Map(document.getElementById(id), mapOptions);
        this.markers = [];
        this.infowindows = [];
        this.clusters = null;
    }

    function addMarker(mapId, location, index, string, image, activeImage, markerCity, magazineName, magazineCont, magazineAddress, magazine) {
        maps[mapId].markers[index] = new google.maps.Marker({
            position: location,
            map: maps[mapId].map,
            icon: {
                url: image
            },
            mainImage: image,
            activeIcon: activeImage,
            active: false,
            city: markerCity,
            shop: magazine,
            desc: string,
            name: magazineName,
            cont: magazineCont,
            Address: magazineAddress
        });

        var content = '<div class="info-box-wrapper">' + string + '</div>';

        google.maps.event.addListener(maps[mapId].markers[index], 'click', function () {
            ib.setContent(content);
            ib.setPosition(location);
            ib.open(maps[mapId].map);

            maps[mapId].markers.forEach(function (marker) {
                marker.active = false;
                marker.setIcon(marker.mainImage);
            });

            maps[mapId].map.setCenter(location);
            this.setIcon(this.activeIcon);
            this.active = false;


            if ($('.map').length) {
                maps[mapId].map.panBy(0, -200);
            }
        });
        return maps[mapId].markers[index];
    }

    function setMarker(location, mapId) {
        var image = {
            url: $('.marker').attr('data-set-marker'),
        };
        var set_marker = new google.maps.Marker({
            position: location,
            icon: image
        });
        set_marker.setMap(maps[mapId].map);
        maps[mapId].map.panTo(location);
    }

    function initialize(mapInst) {

        var lat = mapInst.attr("data-lat"),
            lng = mapInst.attr("data-lng"),
            myLatlng = new google.maps.LatLng(lat, lng),
            setZoom = winW < 767 ? parseInt(mapInst.attr("data-xs-zoom")) : parseInt(mapInst.attr("data-zoom")),
            mapId = mapInst.attr('id'),
            clusterImg = mapInst.attr("data-cluster-img"),
            centerMarker = mapInst.attr("data-center-marker");


        mapDefaulCenter = myLatlng;

        if (winW < 767) {
            if (!mapInst.attr("data-xs-zoom") == '') {
                mapDefaulZoom = setZoom;
            } else {
                mapDefaulZoom = 10;
            }
        } else {
            if (!mapInst.attr("data-zoom") == '') {
                mapDefaulZoom = setZoom;
            } else {
                mapDefaulZoom = 12;
            }
        }


        var mapOptions = {
            zoom: mapDefaulZoom,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            streetViewControl: false,
            fullscreenControl: false,
            center: myLatlng,
            styles: mapStyles
        };


        var clusterOptions = {
            gridSize: 64,
            ignoreHiddenMarkers: true,
            styles: [{
                textColor: '#fff',
                url: clusterImg,
                height: 60,
                width: 60,
                textSize: 18,
                textColor: '#2A2522',
            }]
        };

        if ($('.map-section').length) {
            // contact.php json
            let mapDataLink = $('.map-section').attr('data-link');

            $.ajax({
                url: mapDataLink,
                type: 'get',
                dataType: 'json',
                error: function (data) {
                    console.log("File Not Found");
                },
                success: function (data) {
                    console.log(data)
                    for (let magazines in data) {
                        for (let i = 0; i < data[magazines].length; i++) {
                            var markerInst;
                            markerInst = addMarker(
                                data[magazines][i].dataRel,
                                new google.maps.LatLng(
                                    data[magazines][i].dataLat,
                                    data[magazines][i].dataLng
                                ),
                                i,
                                data[magazines][i].dataString,
                                data[magazines][i].dataImg,
                                data[magazines][i].dataImgActive,
                                data[magazines][i].dataAddress,
                                magazines
                            );
                            markersArr.push(markerInst);
                        }
                    }

                    maps[mapId].markerClusterer = new MarkerClusterer(maps[mapId].map, markersArr, clusterOptions);

                    maps[mapId].markers.forEach(function (marker, index) {
                        maps[mapId].bounds.extend(marker.getPosition());
                    });

                    if (!lat == '' && !lng == '') {
                        // maps[mapId].bounds.setPosition(marker.getPosition());
                        // maps[mapId].bounds.fitBounds();
                    } else {
                        maps[mapId].map.fitBounds(maps[mapId].bounds);
                    }

                }
            });
        }

        maps[mapId] = new Map(mapId, mapOptions);

        maps[mapId].bounds = new google.maps.LatLngBounds();


        ib.addListener('closeclick', function () {
            maps[mapId].markers.forEach(function (marker) {
                marker.active = false;
                marker.setIcon(marker.mainImage);
            });
        });
    }

    $('.map').each(function () {
        initialize($(this));
    });

});
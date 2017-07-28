(function ($) {

    $(document).on('ready', function () {
        // When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', init);

        function init() {
            if(document.documentElement.clientWidth > 767){
                var zoomDes = 11;
            }else {
                var zoomDes = 10;
            }
            var mapOptions = {
                zoom: zoomDes,
                center: new google.maps.LatLng(50.55071599, 30.30626038),
                scrollwheel: false,
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-3"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#f39247"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#f39247"},{"saturation":"0"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ff6f00"},{"saturation":"100"},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#f39247"},{"saturation":"0"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#008eff"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#f3dbc8"},{"saturation":"0"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
            };

            var mapElement = document.getElementById('map');
            var map = new google.maps.Map(mapElement, mapOptions);
            var features = [
                {
                    position: new google.maps.LatLng(50.5443014, 30.2004923),
                    markerInfo: {
                        img: '../../../frontend/img/marker-img1.png',
                        address: 'на Ревуцького, 48',
                        state: 'Термін здачі: квітень 2018 року',
                        tel: '(044) 33 99 290',
                    }
                }, {
                    position: new google.maps.LatLng(50.4941005, 30.3771114),
                    markerInfo: {
                        img: '../../../frontend/img/marker-info2.png',
                        address: 'на Стеценка, 37',
                        state: 'Перша черга збудована',
                        tel: '(044) 22 03 022',
                    }
                }, {
                    position: new google.maps.LatLng(50.46698383, 30.42036206),
                    markerInfo: {
                        img: '../../../frontend/img/marker-info3.png',
                        address: 'Толбухiна, 43а',
                        state: 'Термін здачі: серпень 2018 року',
                        tel: '(044) 33 99 884',
                    }
                }
            ];
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 342,
            });


            features.forEach(function(feature) {
                var infowindow = new google.maps.InfoWindow({
                    maxWidth: 342,
                    content: '<div class="marker-info">' +
                    '<img class="marker-info__img" src="' + feature.markerInfo.img + '" alt="">' +
                    '<div class="marker-info__text"><p class="marker-info__address">'+
                    'Welcome Home' + '</br>' +
                    feature.markerInfo.address
                    + '</p><p class="marker-info__state">'+
                    feature.markerInfo.state
                    +'</p><p class="marker-info__tel">' +
                    'Телефон офісу продажів:' + '</br><span>' +
                    feature.markerInfo.tel + '</span></p></div></div>'
                });
                var marker = new google.maps.Marker({
                    position: feature.position,
                    icon: '../../../frontend/img/marker.svg',
                    map: map
                });



                google.maps.event.addListener(marker, 'click', function() {

                    infowindow.open(map,marker);

                    var iwOuter = $('.gm-style-iw');

                    var iwBackground = iwOuter.prev();

                    // Removes background shadow DIV
                    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

                    // Removes white background DIV
                    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

                    // Moves the infowindow to the right and down
                    iwOuter.parent().parent().css({left: '196px', top: '57px'});

                    // shadow of the arrow display: none
                    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display: none;;'});
                    // arrow display: none
                    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none;'});

                    // Changes the desired tail shadow color.
                    //iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

                    // Reference to the div that groups the close button elements.
                    var iwCloseBtn = iwOuter.next();

                    // close button
                    iwCloseBtn.css({'display': 'block','top':'5px','right':'55px'});
                });



                // Event that closes the Info Window with a click on the map
                google.maps.event.addListener(map, 'click', function() {
                    infowindow.close();
                });

                //infowindow.open(map, marker);

                google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
                    if(document.documentElement.clientWidth > 767){
                        infowindow.open(map,marker);
                        var iwOuter = $('.gm-style-iw');
                        var iwBackground = iwOuter.prev();
                        // Removes background shadow DIV
                        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
                        // Removes white background DIV
                        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
                        // Moves the infowindow to the right and down
                        iwOuter.parent().parent().css({left: '196px', top: '57px'});
                        // shadow of the arrow display: none
                        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'display: none;;'});
                        // arrow display: none
                        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'display: none;'});
                        // Changes the desired tail shadow color.
                        //iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
                        // Reference to the div that groups the close button elements.
                        var iwCloseBtn = iwOuter.next();
                        // close button
                        iwCloseBtn.css({'display': 'block','top':'5px','right':'55px'});
                        google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
                            //this part runs when the mapobject shown for the first time
                        });
                    }else{

                    }

                });
            });


        }
    });

})(jQuery);




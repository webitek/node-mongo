

    //google.maps.event.addDomListener(window, 'load', init);
function init() {
    var mapElement = document.getElementById('map');
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.45071599, 30.55626038),
        scrollwheel: false
    };

    var map = new google.maps.Map(mapElement, mapOptions);

    var features = {
        home: [
        {
            position: new google.maps.LatLng(50.393846, 30.653265),
            markerInfo: {
                img: 'img/pin-1.png',
                address: 'Ревуцького, 48',
                state: 'Термін здачі: квітень 2018 року',
                tel: '(044) 33 99 290',
                link: '#'
            }
        }, {
            position: new google.maps.LatLng(50.496435, 30.368950),
            markerInfo: {
                img: 'img/pin-1.png',
                address: 'Стеценка, 37',
                state: 'Перша черга збудована',
                tel: '(044) 22 03 022',
                link: '#'
            }
        }, {
            position: new google.maps.LatLng(50.4669865, 30.420338),
            markerInfo: {
                img: 'img/pin-1.png',
                address: 'Толбухiна, 43а',
                state: 'Термін здачі: серпень 2018 року',
                tel: '(044) 33 99 884',
                link: '#'
            }
        }
        ],
        contacts: [
            {
                position: new google.maps.LatLng(50.393846, 30.653265),
                markerInfo: {
                    title: 'Welcome Home на Ревуцького',

                    address: 'вул. Ревуцького, 9',
                    tel: '(044) 22 030 22',
                    telLink: '0442203022',
                    email: 'buy@welcome-home.com.ua',

                    schedule: 'Графік роботи',
                    time: '8.00 - 19.00',
                    weekend: 'Без вихідних',

                    link: '#'
                }
            }, {
                position: new google.maps.LatLng(50.496435, 30.368950),
                markerInfo: {
                    title: 'Welcome Home на Ревуцького',

                    address: 'вул. Ревуцького, 9',
                    tel: '(044) 22 030 22',
                    telLink: '0442203022',
                    email: 'buy@welcome-home.com.ua',

                    schedule: 'Графік роботи',
                    time: '8.00 - 19.00',
                    weekend: 'Без вихідних',

                    link: '#'
                }
            }, {
                position: new google.maps.LatLng(50.166435, 30.168950),
                markerInfo: {
                    title: 'Welcome Home на Ревуцького',

                    address: 'вул. Ревуцького, 9',
                    tel: '(044) 22 030 22',
                    telLink: '0442203022',
                    email: 'buy@welcome-home.com.ua',

                    schedule: 'Графік роботи',
                    time: '8.00 - 19.00',
                    weekend: 'Без вихідних',

                    link: '#'
                }
            }, {
                position: new google.maps.LatLng(50.416435, 30.368950),
                markerInfo: {
                    title: 'Welcome Home на Ревуцького',

                    address: 'вул. Ревуцького, 9',
                    tel: '(044) 22 030 22',
                    telLink: '0442203022',
                    email: 'buy@welcome-home.com.ua',

                    schedule: 'Графік роботи',
                    time: '8.00 - 19.00',
                    weekend: 'Без вихідних',

                    link: '#'
                }
            }
        ],
        house: [
            {
                position: new google.maps.LatLng(50.496435, 30.368950),
                markerInfo: {
                    address: 'Ревуцького, 45'
                }
            }
        ]
    };
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200,
    });

    var count = 0;
    //var mapSection = document.querySelector('.map-section');
    var contactsMap = document.querySelector('.contacts-map');
    var houseMap = document.querySelector('.house-map');
    if(contactsMap){
        features.contacts.forEach(function (feature) {
            count++;
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 400,
                content: '<div class=" contact-marker contact-marker' + count + '">' +
                '<div class="contact-marker__triangular"></div>' +
                '<p class="contact-marker__title">' + feature.markerInfo.title +'</p>'+
                '<div class="contact-marker__wrap">' +
                        '<div class="contact-marker__group">' +
                            '<p class="contact-marker__text">' + feature.markerInfo.address +'</p>'+
                            '<a class="contact-marker__up-text link" href="tel:'+ feature.markerInfo.telLink + '">' + feature.markerInfo.tel + '</a>'+
                            '<a class="contact-marker__text" href="mailto:'+ feature.markerInfo.email + '">' + feature.markerInfo.email + '</a></div>'+
                        '<div class="contact-marker__group">' +
                            '<p class="contact-marker__text">' + feature.markerInfo.schedule +'</p>'+
                            '<p class="contact-marker__up-text">' + feature.markerInfo.time +'</p>'+
                            '<p class="contact-marker__text">' + feature.markerInfo.weekend +'</p>'+
                        '</div></div>'

                + '<a class="contact-marker__link link_underline" href="'+ feature.markerInfo.link + '">Записатись на перегляд</a></div>'
            });
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: 'img/marker.svg',
                map: map
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoMarkerStyle(infowindow, marker);

                infoWindowUp(infowindow);
            });

            // Event that closes the Info Window with a click on the map
            google.maps.event.addListener(map, 'click', function () {
                infowindow.close();
            });
            //infowindow.open(map, marker);

            google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
                infoMarkerStyle(infowindow, marker);

                infoWindowUp(infowindow);

                if (document.documentElement.clientWidth > 767) {
                    //console.log("clientWidth > 767")
                }
            });
        });
    } else if(houseMap){
        features.house.forEach(function (feature) {
            count++;
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 342,
                content: '<div class=" house-map-marker house-map-marker' + count + '">' +
                '<p class="house-map-marker__address">' + feature.markerInfo.address +
                '</p></div>'
            });
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: 'img/marker.svg',
                map: map
            });

            // google.maps.event.addListener(marker, 'click', function () {
                // infoMarkerStyle(infowindow, marker);
            // });

            // Event that closes the Info Window with a click on the map
            // google.maps.event.addListener(map, 'click', function () {
            //     infowindow.close();
            // });
            //infowindow.open(map, marker);

            google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
                infoMarkerStyle(infowindow, marker);

                setTimeout(function () {
                    $('.tabs__content').hide();
                }, 500);
                if (document.documentElement.clientWidth > 767) {
                    //console.log("clientWidth > 767")
                }
            });
        });
    } else{
        features.home.forEach(function (feature) {
        count++;
        var infowindow = new google.maps.InfoWindow({
            maxWidth: 342,
            content: '<div class=" marker-info marker-info' + count + ' ">' +
            '<div class="marker-info__text">' +
            '<p class="marker-info__address">' + feature.markerInfo.address +'</p>'+
            '<a class="marker-info__link link_underline" href="'+ feature.markerInfo.link + '">Детальнiше</a></div>'+
            '<img class="marker-info__img" src="' + feature.markerInfo.img + '" alt=""></div>'
        });
        var marker = new google.maps.Marker({
            position: feature.position,
            icon: 'img/marker.svg',
            map: map
        });

        google.maps.event.addListener(marker, 'click', function (e) {
            infoMarkerStyle(infowindow, marker);

            infoWindowUp(infowindow);
            /*
            // console.log(infowindow.content.split(' ')[2]);
            var thisMarker = infowindow.content.split(' ')[3];
            var thisParent = $("." + thisMarker).parents('.gm-style-iw')
            // console.log(document.getElementsByClassName(selfMarker));
            // document.querySelector("." + thisMarker).style.zIndex = "1";
            // document.querySelector("." + thisMarker).style.zIndex = "1";

            // setTimeout(function () {
            //     console.log(otherMarkersParent);
            //     thisParent.parent().css({'z-index':'1'});
            // }, 1000)
             */
        });

        // Event that closes the Info Window with a click on the map
        google.maps.event.addListener(map, 'click', function () {
            infowindow.close();
        });
        //infowindow.open(map, marker);

        google.maps.event.addListenerOnce(map, 'tilesloaded', function () {
            infoMarkerStyle(infowindow, marker);

            infoWindowUp(infowindow)

            setTimeout(function () {
                $('.tabs__content').hide();
            }, 500);
            if (document.documentElement.clientWidth > 767) {
                //console.log("clientWidth > 767")
            }
        });
    });

    }

    function infoWindowUp(infowindow){
        var otherMarkers = infowindow.content.split(' ')[2],
            otherMarkersParent = $("." + otherMarkers).parents('.gm-style-iw');
        // console.log($("." + otherMarkers));
        for(var i = 0; i < otherMarkersParent.length; i++){
            $(otherMarkersParent[i]).parent().css({'z-index':'-9999'});
        }

        $('.gm-style-iw').on('click', function(e){
            var gwIw = $('.gm-style-iw');
            for(var i = 0; i < gwIw.length; i++){
                $(gwIw[i]).parent().css({'z-index':'-9999'});
            }
            $(this).parent().css({'z-index':'1'});
        })
    }

    function infoMarkerStyle(infowindow, marker) {
        infowindow.open(map, marker);
        var iwOuter = $('.gm-style-iw');
        var iwBackground = iwOuter.prev();
        var iwCloseBtn = iwOuter.next();
        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});
        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});
        // Moves the infowindow to the right and down
        iwOuter.parent().parent().css({left: '11px', top: '16px'});

        iwOuter.css({opacity: '1'});

        // shadow of the arrow display: none
        iwBackground.children(':nth-child(1)').attr('style', function (i, s) {
            return s + 'display: none;'
        });
        // arrow display: none
        iwBackground.children(':nth-child(3)').attr('style', function (i, s) {
            return s + 'display: none;'
        });
        // Changes the desired tail shadow color.
        //iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
        // Reference to the div that groups the close button elements.

        // close button
        if(contactsMap){
            iwCloseBtn.css({'opacity': '1'});
            setTimeout(function () {
                iwCloseBtn.children('img').attr('style', '')
                iwCloseBtn.children('img').attr('src', '../img/close-bubble.svg')
            }, 100)
        }else{
            iwCloseBtn.css({'display': 'none'});
        }

        iwOuter.children().css({'overflow': 'visible'}).children().css({'overflow': 'visible'})

        //$('.marker-info1').closest('.gm-style-iw').css({ 'right': '-18px', 'bottom': '-73px'}).next().css({'right': '40px', 'top': '78px'})
        //$('.marker-info2').closest('.gm-style-iw').css({ 'right': '342px', 'bottom': '0'}).next().css({'right': '400px'})
        // $('.marker-info3').closest('.gm-style-iw').css({'right':'342px','bottom':'-146px'})
    }
}




function init() {
    var mapElement = document.getElementById("map");
    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(50.45071599, 30.55626038),
        scrollwheel: false
    };
    var map = new google.maps.Map(mapElement, mapOptions);
    var features = {
        home: [ {
            position: new google.maps.LatLng(50.393846, 30.653265),
            markerInfo: {
                img: "img/pin-1.png",
                address: "Ревуцького, 48",
                state: "Термін здачі: квітень 2018 року",
                tel: "(044) 33 99 290",
                link: "#"
            }
        }, {
            position: new google.maps.LatLng(50.496435, 30.36895),
            markerInfo: {
                img: "img/pin-1.png",
                address: "Стеценка, 37",
                state: "Перша черга збудована",
                tel: "(044) 22 03 022",
                link: "#"
            }
        }, {
            position: new google.maps.LatLng(50.4669865, 30.420338),
            markerInfo: {
                img: "img/pin-1.png",
                address: "Толбухiна, 43а",
                state: "Термін здачі: серпень 2018 року",
                tel: "(044) 33 99 884",
                link: "#"
            }
        } ],
        contacts: [ {
            position: new google.maps.LatLng(50.393846, 30.653265),
            markerInfo: {
                title: "Welcome Home на Ревуцького",
                address: "вул. Ревуцького, 9",
                tel: "(044) 22 030 22",
                telLink: "0442203022",
                email: "buy@welcome-home.com.ua",
                schedule: "Графік роботи",
                time: "8.00 - 19.00",
                weekend: "Без вихідних",
                link: "#"
            }
        }, {
            position: new google.maps.LatLng(50.496435, 30.36895),
            markerInfo: {
                title: "Welcome Home на Ревуцького",
                address: "вул. Ревуцького, 9",
                tel: "(044) 22 030 22",
                telLink: "0442203022",
                email: "buy@welcome-home.com.ua",
                schedule: "Графік роботи",
                time: "8.00 - 19.00",
                weekend: "Без вихідних",
                link: "#"
            }
        }, {
            position: new google.maps.LatLng(50.166435, 30.16895),
            markerInfo: {
                title: "Welcome Home на Ревуцького",
                address: "вул. Ревуцького, 9",
                tel: "(044) 22 030 22",
                telLink: "0442203022",
                email: "buy@welcome-home.com.ua",
                schedule: "Графік роботи",
                time: "8.00 - 19.00",
                weekend: "Без вихідних",
                link: "#"
            }
        }, {
            position: new google.maps.LatLng(50.416435, 30.36895),
            markerInfo: {
                title: "Welcome Home на Ревуцького",
                address: "вул. Ревуцького, 9",
                tel: "(044) 22 030 22",
                telLink: "0442203022",
                email: "buy@welcome-home.com.ua",
                schedule: "Графік роботи",
                time: "8.00 - 19.00",
                weekend: "Без вихідних",
                link: "#"
            }
        } ],
        house: [ {
            position: new google.maps.LatLng(50.496435, 30.36895),
            markerInfo: {
                address: "Ревуцького, 45"
            }
        } ]
    };
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 200
    });
    var count = 0;
    var contactsMap = document.querySelector(".contacts-map");
    var houseMap = document.querySelector(".house-map");
    if (contactsMap) {
        features.contacts.forEach(function(feature) {
            count++;
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 400,
                content: '<div class=" contact-marker contact-marker' + count + '">' + '<div class="contact-marker__triangular"></div>' + '<p class="contact-marker__title">' + feature.markerInfo.title + "</p>" + '<div class="contact-marker__wrap">' + '<div class="contact-marker__group">' + '<p class="contact-marker__text">' + feature.markerInfo.address + "</p>" + '<a class="contact-marker__up-text link" href="tel:' + feature.markerInfo.telLink + '">' + feature.markerInfo.tel + "</a>" + '<a class="contact-marker__text" href="mailto:' + feature.markerInfo.email + '">' + feature.markerInfo.email + "</a></div>" + '<div class="contact-marker__group">' + '<p class="contact-marker__text">' + feature.markerInfo.schedule + "</p>" + '<p class="contact-marker__up-text">' + feature.markerInfo.time + "</p>" + '<p class="contact-marker__text">' + feature.markerInfo.weekend + "</p>" + "</div></div>" + '<a class="contact-marker__link link_underline" href="' + feature.markerInfo.link + '">Записатись на перегляд</a></div>'
            });
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: "img/marker.svg",
                map: map
            });
            google.maps.event.addListener(marker, "click", function() {
                infoMarkerStyle(infowindow, marker);
                infoWindowUp(infowindow);
            });
            google.maps.event.addListener(map, "click", function() {
                infowindow.close();
            });
            google.maps.event.addListenerOnce(map, "tilesloaded", function() {
                infoMarkerStyle(infowindow, marker);
                infoWindowUp(infowindow);
                if (document.documentElement.clientWidth > 767) {}
            });
        });
    } else if (houseMap) {
        features.house.forEach(function(feature) {
            count++;
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 342,
                content: '<div class=" house-map-marker house-map-marker' + count + '">' + '<p class="house-map-marker__address">' + feature.markerInfo.address + "</p></div>"
            });
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: "img/marker.svg",
                map: map
            });
            google.maps.event.addListenerOnce(map, "tilesloaded", function() {
                infoMarkerStyle(infowindow, marker);
                setTimeout(function() {
                    $(".tabs__content").hide();
                }, 500);
                if (document.documentElement.clientWidth > 767) {}
            });
        });
    } else {
        features.home.forEach(function(feature) {
            count++;
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 342,
                content: '<div class=" marker-info marker-info' + count + ' ">' + '<div class="marker-info__text">' + '<p class="marker-info__address">' + feature.markerInfo.address + "</p>" + '<a class="marker-info__link link_underline" href="' + feature.markerInfo.link + '">Детальнiше</a></div>' + '<img class="marker-info__img" src="' + feature.markerInfo.img + '" alt=""></div>'
            });
            var marker = new google.maps.Marker({
                position: feature.position,
                icon: "img/marker.svg",
                map: map
            });
            google.maps.event.addListener(marker, "click", function(e) {
                infoMarkerStyle(infowindow, marker);
                infoWindowUp(infowindow);
            });
            google.maps.event.addListener(map, "click", function() {
                infowindow.close();
            });
            google.maps.event.addListenerOnce(map, "tilesloaded", function() {
                infoMarkerStyle(infowindow, marker);
                infoWindowUp(infowindow);
                setTimeout(function() {
                    $(".tabs__content").hide();
                }, 500);
                if (document.documentElement.clientWidth > 767) {}
            });
        });
    }
    function infoWindowUp(infowindow) {
        var otherMarkers = infowindow.content.split(" ")[2], otherMarkersParent = $("." + otherMarkers).parents(".gm-style-iw");
        for (var i = 0; i < otherMarkersParent.length; i++) {
            $(otherMarkersParent[i]).parent().css({
                "z-index": "-9999"
            });
        }
        $(".gm-style-iw").on("click", function(e) {
            var gwIw = $(".gm-style-iw");
            for (var i = 0; i < gwIw.length; i++) {
                $(gwIw[i]).parent().css({
                    "z-index": "-9999"
                });
            }
            $(this).parent().css({
                "z-index": "1"
            });
        });
    }
    function infoMarkerStyle(infowindow, marker) {
        infowindow.open(map, marker);
        var iwOuter = $(".gm-style-iw");
        var iwBackground = iwOuter.prev();
        var iwCloseBtn = iwOuter.next();
        iwBackground.children(":nth-child(2)").css({
            display: "none"
        });
        iwBackground.children(":nth-child(4)").css({
            display: "none"
        });
        iwOuter.parent().parent().css({
            left: "11px",
            top: "16px"
        });
        iwOuter.css({
            opacity: "1"
        });
        iwBackground.children(":nth-child(1)").attr("style", function(i, s) {
            return s + "display: none;";
        });
        iwBackground.children(":nth-child(3)").attr("style", function(i, s) {
            return s + "display: none;";
        });
        if (contactsMap) {
            iwCloseBtn.css({
                opacity: "1"
            });
            setTimeout(function() {
                iwCloseBtn.children("img").attr("style", "");
                iwCloseBtn.children("img").attr("src", "../img/close-bubble.svg");
            }, 100);
        } else {
            iwCloseBtn.css({
                display: "none"
            });
        }
        iwOuter.children().css({
            overflow: "visible"
        }).children().css({
            overflow: "visible"
        });
    }
}
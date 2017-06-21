var root = 'https://jsonplaceholder.typicode.com';
var map;
var marker;
$(function() {
    var string = window.location.href;
    var url = new URL(string);
    var userID = url.searchParams.get("userId");
    goToProfile(userID);
})

function goToProfile (id) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
            {
                var name = document.createElement("p");
                var username = document.createElement("p");
                var email = document.createElement("p");
                var address = document.createElement("p");
                var phone = document.createElement("p");
                var website = document.createElement("p");
                var company = document.createElement("p");                
                
                $(name).addClass("name");
                $(username).addClass("username");
                $(email).addClass("email");
                $(address).addClass("address");
                $(phone).addClass("phone");
                $(website).addClass("website");
                $(company).addClass("company");
                
                $('.profileBoxImportant').append(name);
                $('.profileBoxImportant').append(username);
                $('.profileBoxImportant').append(email);
                $('.profileBoxImportant').append(address);
                $('.profileBoxImportant').append(phone);
                $('.profileBoxImportant').append(website);
                $('.profileBoxImportant').append(company);
                
                
                name.innerHTML = data[i].name;
                username.innerHTML = "@" + data[i].username;
                email.innerHTML = data[i].email;
                address.innerHTML = data[i].address.street + " " + data[i].address.suite + " " + data[i].address.city + " " + data[i].address.zipcode;
                phone.innerHTML = data[i].phone;
                website.innerHTML = data[i].website;
                console.log(data[i].address.geo.lat + " " + data[i].address.geo.lng);
                map.setCenter(new google.maps.LatLng(data[i].address.geo.lat, data[i].address.geo.lng));
                marker.setPosition(new google.maps.LatLng(data[i].address.geo.lat, data[i].address.geo.lng));
                company.innerHTML = data[i].company.name + " " + data[i].company.catchPhrase + " " + data[i].company.bs;
                
                marker.setMap(map)
                getPostsOfUser(data[i]);
             }
        } 
    });
}

function geoLocationOfUser () {
    map = new google.maps.Map(document.getElementById('addressMap'), {
        center: {lat: 0, lng: 0},
        zoom: 4,
        /* source: https://snazzymaps.com/style/122/flat-map-with-labels */
        styles: [ { "featureType": "water", "elementType": "all", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "labels", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "labels", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" } ] } ]

    });
    
    marker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
        animation: google.maps.Animation.BOUNCE
    });
    
    marker.setMap(map);
}

function getPostsOfUser(user) {
    $.ajax({
      url: root + '/posts?userId=' + user.id ,
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            var post = document.createElement("div");
            var picture = document.createElement("div");
            var pTitle = document.createElement("p");
            var contentPost = document.createElement("span");
            var contentArea = document.createElement("div");
                        
            $(post).addClass("post");
            $(picture).addClass("picture");
            $(pTitle).addClass("postTitle");
            $(contentPost).addClass("contentPost");
            $(contentArea).addClass("contentArea");
            
            $(post).append(picture);
            $(post).append(pTitle);
            $(post).append('<br>');
            $(post).append(contentArea);
            $(contentArea).append(contentPost);
            $(".postsProfileContainer").append(post);

            contentPost.innerHTML = data[i].body;
            pTitle.innerHTML = data[i].title;
        } 
    });
}
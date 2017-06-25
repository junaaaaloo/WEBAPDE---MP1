var root = 'https://jsonplaceholder.typicode.com';
var map;
var marker;
var userPostCnt = 0;
var albumsCount = 0;

$(function() {
    var string = window.location.href;
    var url = new URL(string);
    var userID = url.searchParams.get("userId");   
    if(userID != null)
        goToProfile(userID, userPostCnt);
    else
        window.location.href = "users.html"  
})

function goToProfile (id, postNum) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        id = id - 1;
        
        var image = document.createElement("div");
        var name = document.createElement("span");
        var username = document.createElement("span");
        var email = document.createElement("span");
        var address = document.createElement("span");
        var phone = document.createElement("span");
        var website = document.createElement("span");
        var company = document.createElement("span");
        
        var companyCatchPhrase = document.createElement("span");
        var companyDescription = document.createElement("span");
        var companyName = document.createElement("span");
        
        $(image).addClass("userImage");
        $(name).addClass("name");
        $(username).addClass("username");
        $(email).addClass("email");
        $(address).addClass("address");
        $(phone).addClass("phone");
        $(website).addClass("website");
        $(company).addClass("company");
        
        $(companyCatchPhrase).addClass("company-phrase");
        $(companyDescription).addClass("company-desc");
        $(companyName).addClass("company-name")
        
        
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(image);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(name);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(username);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(email);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(phone);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(website);
        $('.profileBoxImportant').append('<br>');
        $('.profileBoxImportant').append(company);
        $('.profileBoxImportant').append('<br>');
        $(company).append(companyName);
        $(company).append('<br>');
        $(company).append(companyDescription);
        $(company).append('<br>');
        $(company).append(companyCatchPhrase);

        name.innerHTML = data[id].name;
        username.innerHTML = "@" + data[id].username;
        email.innerHTML = data[id].email;
        address.innerHTML = data[id].address.street + " " + data[id].address.suite + " " + data[id].address.city + " " + data[id].address.zipcode;
        phone.innerHTML = data[id].phone;
        website.innerHTML = data[id].website;
        
        companyName.innerHTML = data[id].company.name;
        companyCatchPhrase.innerHTML = data[id].company.catchPhrase;
        companyDescription.innerHTML = data[id].company.bs;
        
        map.setCenter(new google.maps.LatLng(data[id].address.geo.lat, data[id].address.geo.lng));
        marker.setPosition(new google.maps.LatLng(data[id].address.geo.lat, data[id].address.geo.lng));
        
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        
        var infowindow = new google.maps.InfoWindow({
            content: "<div class = 'address'>" + address.innerHTML + "</div>",
        });
        
        infowindow.open(map,marker);
        
        getPostsOfUser(data[id], postNum); 
        getAlbums(data[id], albumsCount);
    });
}

function getPostsOfUser(user, start) {
    $.ajax({
      url: root + '/posts?userId=' + user.id ,
      method: 'GET'
    }).then(function(data) {
        console.log(data);
        if(data.length != start){
            for(i = start; i < (start +5); i++)
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
                $(post).append(contentArea);
                $(contentArea).append(contentPost);
                $(".postsProfileContainer").append(post);

                contentPost.innerHTML = data[i].body;
                pTitle.innerHTML = data[i].title;
            }
            userPostCnt = i;
            $('.profilePostsContainer .more').click(function(e) {
               getPostsOfUser(user, userPostCnt); 
            });
        }

        else{
            $('.postsProfileContainer .more').hide();
        }
    });
}

function getAlbums(user) {
     $.ajax({
        url: root + '/albums',
        method: 'GET'
    }).then(function(data){
        if(data.length != albumsCount) {
            var count = 0;
            for(i = data.length-1; i >= 0 && count < 10; i--) {
                if(data[i].userId == user) {
                    count += 1;
                    var albumName = document.createElement('p');
                    var albumLink = document.createElement('a');
                    var albumPost = document.createElement('ul');

                    $(albumLink).attr('href', 'single-album.html?albumId=' + data[i].id);
                    $(albumLink).addClass('albumLink');
                    $(albumPost).addClass('album');
                    $(albumName).addClass('albumTitle');

                    albumName.innerHTML = "" + data[i].title

                    setThumbnailImages(data[i].id, albumPost);
                    $('.profileAlbumsContainer').append(albumLink);
                    $(albumLink).append(albumPost);
                    $(albumPost).append(albumName);
                }
            }
            
            if(data.length == albumsCount)
                $('#moreAlbumsMessage').hide();
        } else {
            $('#moreAlbumsMessage').hide();
        }
        
        albumsCount = data.length - i - 1;
    });   
}

function geoLocationOfUser () {
    map = new google.maps.Map(document.getElementById('addressMap'), {
        center: {lat: 0, lng: 0},
        zoom: 6,
        /* source: https://snazzymaps.com/style/122/flat-map-with-labels */
        styles: [ { "featureType": "water", "elementType": "all", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "labels", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "labels", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" } ] } ],
    });
    
    marker = new google.maps.Marker({
        position: {lat: 0, lng: 0},
        map: map
    });
}

function setThumbnailImages(id, albumPost)
{
    $.ajax({
        url: root + '/photos',
        method: 'GET'
    }).then(function(data){
        var count = 0;
        for (var j = (id)*50-1; j > ((id-1)*50)+45; j--) {    
            var imagePost = document.createElement('li');
            var imageContent = document.createElement('img');
            
            $(imageContent).attr("src", data[j].thumbnailUrl);
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
        } 
    });
}
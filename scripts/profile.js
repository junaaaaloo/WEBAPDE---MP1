var root = 'https://jsonplaceholder.typicode.com';
var map;
var marker;
var userID = 0;
var postsCount = 0;
var albumsCount = 0;

$(function() {
    var string = window.location.href;
    var url = new URL(string);
    userID = url.searchParams.get("userId");   
    if(userID != null)
        goToProfile(userID);
    else
        window.location.href = "users.html"  
    
    
})

function goToProfile (id) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        id = id - 1;
        
        $('.tab-link').click(function() {
            var tabID = $(this).attr('data-tab');
            
            $('.tab-link').removeClass('current');
            $('.tab-content').removeClass('current');

            $(this).addClass('current');
            $("#"+tabID).addClass('current');
        })
        
        var image = document.createElement("div");
        var name = document.createElement("span");
        var username = document.createElement("span");
        var email = document.createElement("span");
        var address = document.createElement("span");
        var phone = document.createElement("span");
        var website = document.createElement("span");
        var company = document.createElement("div");
        
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
        $(company).append(companyCatchPhrase);
        $(company).append('<br>');
        $(company).append(companyDescription);

        name.innerHTML = data[id].name;
        username.innerHTML = "@" + data[id].username;
        email.innerHTML = data[id].email;
        address.innerHTML = data[id].address.street + " " + data[id].address.suite + " " + data[id].address.city + " " + data[id].address.zipcode;
        phone.innerHTML = "<b>Phone: </b>" + data[id].phone;
        website.innerHTML = "<b>Website: </b>" + data[id].website;
        
        companyName.innerHTML = "<b>Company</b>";
        companyDescription.innerHTML = data[id].company.bs;
        companyCatchPhrase.innerHTML = data[id].company.name + "<br>\"" +data[id].company.catchPhrase + "\"";
        
        
        map.setCenter(new google.maps.LatLng(data[id].address.geo.lat, data[id].address.geo.lng));
        marker.setPosition(new google.maps.LatLng(data[id].address.geo.lat, data[id].address.geo.lng));
        
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
        
        var infowindow = new google.maps.InfoWindow({
            content: "<div class = 'address'>" + address.innerHTML + "</div>",
        });
        
        infowindow.open(map,marker);
        
        getPostsOfUser(postsCount); 
        getAlbumsOfUser(albumsCount);
    });
}

function getPostsOfUser(start) {
    $.ajax({
      url: root + '/posts?userId=' + userID,
      method: 'GET'
    }).then(function(data) {
        if(data.length != start){
            for(i = data.length - start - 1; i > (data.length - start - 6); i--)
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
                $(".profilePostsContainer").append(post);

                contentPost.innerHTML = data[i].body;
                pTitle.innerHTML = data[i].title;
                postsCount += 1;
                
                var showChar = 70;  // How many characters are shown by default
                var moretext = "Read more >>>";
                var lesstext = "Read less <<<";
                var content = $(contentPost).html();

                if(content.length > showChar) {

                    var c = content.substr(0, showChar);
                    var h = content.substr(showChar, content.length - showChar);

                    var html = c + '<span class="morecontent">' + h + '</span> <span class="morelink">' + moretext + '</span>';

                    $(contentPost).html(html);
                }
            }
            
            $(".morelink").click(function(e){
                if($(this).hasClass("less")) {
                    $(this).removeClass("less");
                    $(this).html(moretext);
                } else {
                    $(this).addClass("less");
                    $(this).html(lesstext);
                }
                $(this).parent().prev().toggle();
                $(this).prev().toggle();
                e.preventDefault();
                return false;
            }); 

            if(data.length == postsCount) 
                $('#morePostsMessage').hide();
        }
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

function getAlbumsOfUser (start) {
    $.ajax({
        url: root + '/albums?userId='+userID,
        method: 'GET'
    }).then(function(data){
        if(data.length != albumsCount) {
            for(i = data.length - start - 1; i > (data.length - start - 6); i--) {
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
                albumsCount += 1;
                $(albumLink).append(albumPost);
                $(albumPost).append(albumName);
            }
            
            if(data.length == albumsCount)
                $('#moreAlbumsMessage').hide();
        }
    });   
}

function setThumbnailImages(id, albumPost)
{
    $.ajax({
        url: root + '/photos?albumId='+id,
        method: 'GET'
    }).then(function(data){
        var count = 0;
        var rand = Math.round((Math.random() * 45) + 4);
        
        for (var j = rand; j > rand-4
             ; j--) {    
            var imagePost = document.createElement('li');
            var imageContent = document.createElement('img');
            
            $(imageContent).attr("src", data[j].thumbnailUrl);
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
        } 
    });
}
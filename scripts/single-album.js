var root = 'https://jsonplaceholder.typicode.com';
var imageCount = 0;

$(document).ajaxStart(function(){
    $("#waitImg").css("display", "block");
    if(imageCount == 0);
        $('#wholePanel').css("display", "none");
});

$(document).ajaxComplete(function(){
    $("#waitImg").css("display", "none");
    $('#wholePanel').css("display", "block");
    
});


$(document).ajaxError(function(){
    $("#waitImg").css("display", "none");
    $('#messageComplete').html("Internal Server Error");
});

$(function() {
    var string = window.location.href;
    var url = new URL(string);
    var albumId = url.searchParams.get("albumId");
    
    if(albumId != null) {
        goToAlbum(albumId-1);
    } else {
        window.location.href = "albums.html";
    }
});

function goToAlbum (id) {
    $.ajax({
        url: root + '/albums',
        method: 'GET'
    }).then(function(data){
        loadImages(data[id].id, document.getElementById('albumGallery'));
        $('.albumInfo').append(data[id].title + "<br>");
        getNameUsernameWithLink(document.getElementsByClassName('albumInfo')[0], data[id].userId);
    });   
}

function getNameUsernameWithLink (window, id) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        var name = document.createElement('a');
        var username = document.createElement('a');
        
        $(name).attr('href', 'profile.html?userId=' + data[id-1].id);
        $(username).attr('href', 'profile.html?userId=' + data[id-1].id);
        
         name.innerHTML = data[id-1].name;
         username.innerHTML = "@" + data[id-1].username;
        
        $(window).append(name);
        $(window).append(username);
    });
}
function loadImages(id, albumPost)
{
    $.ajax({
        url: root + '/photos?albumId=' + id,
        method: 'GET'
    }).then(function(data){
        var count = 0;
        for (var j = 50-1; j > -1; j--) {    
            var imagePost = document.createElement('a');
            var imageContent = document.createElement('img');
            
            $(imagePost).attr("href", data[j].url)
            $(imagePost).attr("data-fancybox", "gallery");
            $(imagePost).attr("data-caption", data[j].title);
            
            $(imageContent).attr("src", data[j].thumbnailUrl);
            $(imageContent).attr("alt", "");
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
            
            $(imagePost).jBox('Mouse', {
                theme: 'TooltipDark',
                content: "<span class = 'hover-title'> " + data[j].title + "</span> <br>"
            });
            
            imageCount ++;
            var rand = (Math.random() * 10) - 5;
            $(imagePost).rotate(rand);
        } 
    });
}
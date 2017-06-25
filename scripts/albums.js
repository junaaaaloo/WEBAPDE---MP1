var root = 'https://jsonplaceholder.typicode.com';
var albumsCount = 0;

$(function() {
    getRecentAlbums(albumsCount);
    
    var string = window.location.href;
    var url = new URL(string);
    var albumId = url.searchParams.get("albumId");
})

function getRecentAlbums (start) {
    $.ajax({
        url: root + '/albums',
        method: 'GET'
    }).then(function(data){
        if(data.length != albumsCount) {
            for(i = data.length - start - 1; i > (data.length - start - 11); i--) {
                var albumName = document.createElement('p');
                albumName.innerHTML = "album title";

                var albumPost = document.createElement('ul');

                $(albumPost).addClass('album');
                $(albumName).addClass('albumTitle');

                albumName.innerHTML = "" + data[i].title;
                $(albumPost).append(albumName);

                setThumbnailImages(data[i].id, albumPost);
                $('#albumContainer').append(albumPost);
                $(albumPost).hover(function () {
                    var i = 0;
                    $(this).css("position", "relative");
                });
            }
            
            if(data.length == albumsCount)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
        
        albumsCount = data.length - i - 1;
    });   
}

function setThumbnailImages(id, albumPost)
{
    $.ajax({
        url: root + '/photos',
        method: 'GET'
    }).then(function(data){
        var count = 0;
        for (var j = (id-1)*50; j < (id*50)-46; j++) {    
            var imagePost = document.createElement('li');
            var imageContent = document.createElement('img');
            
            $(imageContent).attr("src", data[j].thumbnailUrl);
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
        } 
    });
}
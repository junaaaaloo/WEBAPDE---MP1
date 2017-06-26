var root = 'https://jsonplaceholder.typicode.com';
var albumsCount = 0;

$(function() {
    getRecentAlbums(albumsCount);
});

function getRecentAlbums (start) {
    $.ajax({
        url: root + '/albums',
        method: 'GET'
    }).then(function(data){
        if(data.length != albumsCount) {
            for(i = data.length - start - 1; i > (data.length - start - 11); i--) {
                var albumName = document.createElement('p');
                albumName.innerHTML = "album title";

                var albumLink = document.createElement('a');
                var albumPost = document.createElement('ul');
                
                $(albumLink).attr('href', 'single-album.html?albumId=' + data[i].id);
                $(albumLink).addClass('albumLink');
                $(albumPost).addClass('album');
                $(albumName).addClass('albumTitle');

                albumName.innerHTML = "" + data[i].title
     
                setThumbnailImages(data[i].id, albumPost);
                $('#albumContainer').append(albumLink);
                $(albumLink).append(albumPost);
                $(albumPost).append(albumName);
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
        url: root + '/photos?albumId='+id,
        method: 'GET'
    }).then(function(data){
        var count = 0;
        for (var j = 49; j > 45; j--) {    
            var imagePost = document.createElement('li');
            var imageContent = document.createElement('img');
            
            $(imageContent).attr("src", data[j].thumbnailUrl);
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
        } 
    });
}
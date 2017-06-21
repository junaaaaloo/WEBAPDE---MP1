var root = 'https://jsonplaceholder.typicode.com';
var albumsCount = 0;

$(function() {
    getRecentAlbums(albumsCount);
})
function getRecentAlbums (start) {
    $.ajax({
        url: root + '/albums',
        method: 'GET'
    }).then(function(data){
        if(data.length != albumsCount) {
            for(var i = start; i < (start + 5); i++) {
                var albumName = document.createElement('p');
                albumName.innerHTML = "album title";

                var albumPost = document.createElement('div');

                $(albumPost).addClass('album');
                $(albumName).addClass('albumTitle')

                albumName.innerHTML = "" + data[i].title;
                $(albumPost).append(albumName);

                setAlbumImages(data[i].id, albumPost)

                $('#albumContainer').append(albumPost);
            }
            
            if(data.length != albumsCount)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
        
        albumsCount = i;
    });   
}

function setAlbumImages(id, albumPost)
{
    $.ajax({
        url: root + '/photos',
        method: 'GET'
    }).then(function(data){
        for (var j = (id-1)*50; j < (id*50); j++) {    
            var imagePost = document.createElement('div');
            var imageContent = document.createElement('div');
            
            $(imagePost).addClass('imagePost');
            $(imageContent).addClass('imageContent');  
            $(imageContent).css("background-image", "url(" + data[j].thumbnailUrl + ")");
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
            
            var rand = (Math.random() * 10) - 5;
            $(imagePost).css("transform", "rotate(" + rand + "deg)");
        }
        
    });
}
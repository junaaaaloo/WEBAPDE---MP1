var root = 'https://jsonplaceholder.typicode.com';
var imagesCount = 0;

$(function () {
    getRecentImages(imagesCount);
})

function getRecentImages (start) {
    $.ajax({
      url: root + '/photos',
      method: 'GET'
    }).then(function(data) {
        if(imagesCount != data.length)
        {
            for(i = start; i < (start + 10); i++)
            {
                var imagePost = document.createElement("div");
                var imageContent = document.createElement("div");
                var rand = (Math.random() * 10) - 5;
                
                $(imagePost).addClass("imagePost");
                $(imageContent).addClass("imageContent");
                
                $('#imageContainer').append(imagePost);
                $(imagePost).append(imageContent);
                
                $(imageContent).css("background-image", "url(" + data[i].thumbnailUrl + ")");
                $(imagePost).css("transform", "rotate(" + rand + "deg)");
            }
            
            photoCnt = i;
            
            if(photoCnt == data.length)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
    });
}
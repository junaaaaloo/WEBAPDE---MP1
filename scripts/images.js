var root = 'https://jsonplaceholder.typicode.com';
var imagesCount = 0;

$(function () {
    getRecentImages(imagesCount);
    $(".modalImageContent").on('load', function(){
        document.getElementsByClassName("modalImageContentContainer")[0].style.height = this.height;
        document.getElementsByClassName("modalImageContentContainer")[0].style.width = this.width;
    });
})

function getAlbumName (window, id) {
    $.ajax({
      url: root + '/albums',
      method: 'GET'
    }).then(function(data) {
        $(window).append("<span id = 'albumIcon' class = 'modalIcon'> </span>");
        window.innerHTML += "<a href = single-album.html?albumId=" + (id) +" >" + data[id-1].title + "</a><br>";
        getNameUsernameWithLink(window, data[id-1].userId);
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
         username.innerHTML = data[id-1].username;
        
        $(window).append("<span id = 'userIcon' class = 'modalIcon'> </span>");
        $(window).append(name);
        $(window).append('<br>');
        $(window).append('@ ');
        $(window).append(username);
    });
}

function getRecentImages (start) {
    $.ajax({
      url: root + '/photos',
      method: 'GET'
    }).then(function(data) {
        if(imagesCount != data.length)
        {
            for(i = data.length - start - 1; i > (data.length - start - 11); i--)
            {
                var imagePost = document.createElement("div");
                var imageContent = document.createElement("div");
                var rand = (Math.random() * 10) - 5;
                var hoverText = "";
                $(imagePost).attr("value", data[i].id)
                
                $(imagePost).addClass("imagePost");
                $(imageContent).addClass("imageContent");
                
                $(imageContent).css("background-image", "url(" + data[i].thumbnailUrl + ")");      
                $(imagePost).rotate(rand);
                
                $('#imageContainer').append(imagePost);
                $(imagePost).append(imageContent);
                
                $(imagePost).click(function () {
                    var imgsrc = data[$(this).attr("value") - 1].url;
                    $(".modalImageContent").attr("src", imgsrc);
                    document.getElementsByClassName("modalOverlay")[0].innerHTML = "<span id = 'titleIcon' class = 'modalIcon'> </span>";
                    document.getElementsByClassName("modalOverlay")[0].innerHTML += data[i].title + "<br>";
                    getAlbumName(document.getElementsByClassName("modalOverlay")[0], data[$(this).attr("value") - 1].albumId);
                    document.getElementsByClassName("modalImage")[0].style.display = "block";
                })
                
               
                
                $('.closeModal').click(function () {
                    document.getElementsByClassName("modalImage")[0].style.display = "none";
                })
                
                $(document).keydown(function(event) {
                    if(event.keyCode == 27) {
                        document.getElementsByClassName("modalImage")[0].style.display = "none";
                    }
                })
                
                 $(imagePost).jBox('Mouse', {
                    theme: 'TooltipDark',
                    content: "<span class = 'hover-title'> " + data[i].title + "</span> <br>" + " <span class = 'hover-more'> Click to view more details </span>",
                });
            }
            
            photoCnt = data.length - i - 1;
            
            if(photoCnt == data.length)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
    });
}
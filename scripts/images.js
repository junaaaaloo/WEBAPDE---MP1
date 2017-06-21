var root = 'https://jsonplaceholder.typicode.com';
var imagesCount = 0;

$(function () {
    getRecentImages(imagesCount);
})

function getAlbumName (window, id) {
    $.ajax({
      url: root + '/albums',
      method: 'GET'
    }).then(function(data) {
       window.innerHTML = data[id-1].title;
    });
}

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
                $(imagePost).click(function () {
                    document.getElementsByClassName("modalImage")[0].style.display = "block";
                    document.getElementsByClassName("modalImageContent")[0].src = data[i].url;
                })
                
                $(imageContent).css("background-image", "url(" + data[i].thumbnailUrl + ")");
                $(imagePost).css("transform", "rotate(" + rand + "deg)");
                
                $('.closeModal').click(function () {
                    document.getElementsByClassName("modalImage")[0].style.display = "none";
                })
                
                $(document).keydown(function(event) {
                    if(event.keyCode == 27) {
                        document.getElementsByClassName("modalImage")[0].style.display = "none";
                    }
                })
                
                getAlbumName(document.getElementById("captionModal"), data[i].albumId);
            }
            
            photoCnt = i;
            
            if(photoCnt == data.length)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
    });
}

function getRealImage () {
    var modal = document.getElementById('myModal');

    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
        modal.style.display = "none";
    }
}
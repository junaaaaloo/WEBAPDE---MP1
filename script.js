var root = 'https://jsonplaceholder.typicode.com';
var postCnt = 0;
var photoCnt = 0;

$(document).ready(function () {
    getRecentPosts(postCnt);
    getRecentImages(photoCnt);
});

function getAllUsers () {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        
    });
}

function redirectToUserPage (userId) {
    console.log(userId);
}

function getRecentPosts (start) {
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
        if(data.length != start) {
            for(i = start; i < (start + 10); i++)
            {
                var post = document.createElement("div");
                $(post).addClass("post");
                var picture = document.createElement("div");
                $(picture).addClass("picture");
                var pTitle = document.createElement("p");
                $(pTitle).addClass("postTitle");
                var contentPost = document.createElement("span");
                $(contentPost).addClass("contentPost");
                var contentArea = document.createElement("div");
                $(contentArea).addClass("contentArea");
                var name = document.createElement("span");
                $(name).addClass("name");
                var username = document.createElement("span");
                $(username).addClass("username");

                $(post).append(picture);
                $(post).append(pTitle);
                $(post).append(name);
                $(post).append(username);
                $(post).append(contentArea);
                $(contentArea).append(contentPost);
                $("#postContainer").append(post);

                contentPost.innerHTML = data[i].body;
                pTitle.innerHTML = data[i].title;
                setName(data[i].userId, name);
                setUsername(data[i].userId, username);
            }
            postCnt = i;
            
            if(postCnt == data.length)
                $('#moreMessage').hide();
        } else {
            $('#moreMessage').hide();
        }
      
    });
}

function setName(id, name)
{
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
                name.innerHTML = data[i].name;
        } 
    });
}

function setUsername(id, username)
{
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
                username.innerHTML = "@" + data[i].username;
        } 
    });
}

function getRecentAlbums () {
    
}

function getRecentImages (start) {
    $.ajax({
      url: root + '/photos',
      method: 'GET'
    }).then(function(data) {
        if(photoCnt != data.length)
        {
            for(i = start; i < (start + 10); i++)
            {
                var imagePost = document.createElement("div");
                $(imagePost).addClass("imagePost");
                var imageContent = document.createElement("div");
                $(imageContent).addClass("imageContent");
                
                $('#imageContainer').append(imagePost);
                $(imagePost).append(imageContent);
                
                $(imageContent).css("background-image", "url(" + data[i].thumbnailUrl + ")");
                var rand = (Math.random() * 10) - 5;
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

function getCommentsOfPost (postId) {
    
}

function getCertainPost (postId) {
    
}

function getCertainUser (userId) {
    
}

function getCertainImage (imageId) {
    
}

var root = 'https://jsonplaceholder.typicode.com';
var postCnt = 0;
$(document).ready(function () {
     getRecentPosts(postCnt);

});

function getAllUsers () {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        
    });
}

function getRecentPosts (start) {
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
        if(data.length != start) {
            for(i = start; i<= (start + 9); i++)
            {
                var post = document.createElement("div");
                $(post).addClass("post");
                var picture = document.createElement("div");
                $(picture).addClass("picture");
                var pTitle = document.createElement("span");
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
                var br =document.createElement("br");
                $(post).append(br);
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

function getRecentImages () {
    
}

function getCommentsOfPost (postId) {
    
}

function getCertainPost (postId) {
    
}

function getCertainUser (userId) {
    
}

function getCertainImage (imageId) {
    
}

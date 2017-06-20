var root = 'https://jsonplaceholder.typicode.com';
$(document).ready(function () {
     getRecentPosts(0);
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
            
            $(post).append(picture);
            $(post).append(pTitle);
            $(post).append(contentArea);
            $(contentArea).append(contentPost);
            $("#postContainer").append(post);

            contentPost.innerHTML = data[i].body;
            pTitle.innerHTML = data[i].title;
            
            var name = document.createElement("span");
            $(name).addClass("name");
            var username = document.createElement("span");
            $(username).addClass("username");
            
            $(post).append(name);
            $(post).append(username);
            name.innerHTML = getName(data[i].userId);
            console.log(name.innerHTML);
            
            username.innerHTML = getUsername(data[i].userId);
            
        }
    });
}

function getName(id)
{
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
                return data[i].name;
        } 
    });
}

function getUsername(id)
{
    return 0;
//    var users = getAllUsers();
//    for(i = 0; i < users.length; i++)
//    {
//        if(id == users[i].id)
//            return users[i].username;
//    }
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

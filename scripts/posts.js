var root = 'https://jsonplaceholder.typicode.com';
var postsCount = 0;


$(function () {
    getRecentPosts(postsCount);
})

function filterPosts () {
    var value = $("#searchText").val();
    
    $('.postTitle').each(function(){
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            $(this).parent().show();
            $(this).mark(value);
        } else {
            $(this).parent().hide();
        }
    });

    $('.contentPost').each(function(){
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            $(this).parent().parent().show();
            $(this).mark(value);
        } else {
            if(!$(this).is(":visible")) {
                $(this).parent().parent().hide();
            }
        }
    });
}

function getRecentPosts (start) {
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
        if(data.length != start) {
            for(i = start; i < (start + 10); i++) {
                var post = document.createElement("div");
                var picture = document.createElement("div");
                var pTitle = document.createElement("p");
                var contentPost = document.createElement("span");
                var contentArea = document.createElement("div");
                var name = document.createElement("a");
                var username = document.createElement("a");
                
                $(post).addClass("post");
                $(picture).addClass("picture");
                $(pTitle).addClass("postTitle");
                $(contentPost).addClass("contentPost");
                $(contentArea).addClass("contentArea");
                $(name).addClass("name");
                $(username).addClass("username");
                
                $(post).append(picture);
                $(post).append(pTitle);
                $(post).append(name);
                $(post).append(username);
                $(post).append(contentArea);
                $(contentArea).append(contentPost);
                $("#postContainer").append(post);
                
                $(name).attr('href', 'profile.html?userId=' + data[i].userId);
                $(username).attr('href', 'profile.html?userId=' + data[i].userId);
                contentPost.innerHTML = data[i].body;
                pTitle.innerHTML = data[i].title;
                setName(data[i].userId, name);
                setUsername(data[i].userId, username);
            }
            
            postsCount = i;
            
            if(postsCount == data.length)
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
        name.innerHTML = data[id-1].name;
    });
}

function setUsername(id, username)
{
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        username.innerHTML = "@" + data[id-1].username; 
    });
}

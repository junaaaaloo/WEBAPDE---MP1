var root = 'https://jsonplaceholder.typicode.com';
var postsCount = 0;
var prev;

$(document).ajaxStart(function(){
    $("#waitImg").css("display", "block");
    if(postsCount == 0)
        $('#wholePanel').css("display", "none");
});

$(document).ajaxComplete(function(){
    $("#waitImg").css("display", "none");
    $('#wholePanel').css("display", "block");
    
});


$(document).ajaxError(function(){
    $("#waitImg").css("display", "none");
    $('#messageComplete').html("Internal Server Error");
});


$(function () {
    getRecentPosts(postsCount);
})

function filterPosts () {
    var value = $("#searchText").val();
    var count = 0;
    
    var options = {};
    options['separateWordSearch'] = false;
    
    $('.postTitle').each(function(){
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            $(this).parent().show();
            $(this).mark(value, options);
            count++;
        } else {
            $(this).parent().hide();
        }
    });

    $('.contentPost').each(function(){
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            if(!$(this).is(":visible"))
                count++;
            $(this).parent().parent().show();
            $(this).mark(value, options);
        } else {
            if(!$(this).is(":visible")) {
                $(this).parent().parent().hide();
            }
        }
    });
    
    if(prev != null)
        prev.close();
    
    if(value != "") 
        notifyPosts("<span class = matches-notification> Search results for " + value + " : " + count + "/" + postsCount + " </span>");
}

function notifyPosts (value) {
    prev = new jBox('Notice', {
        content: value,
        color: 'black',
        fontFamily: 'Lato',
        autoClose: 5000,
        attributes: {
            x: 'right',
            y: 'bottom'
        }
    });
}

function getRecentPosts (start) {
    $.ajax({
      url: root + '/posts',
      method: 'GET'
    }).then(function(data) {
        if(data.length != start) {
            for(i = data.length - start - 1; i > (data.length - start - 11); i--) {
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
            
            postsCount = data.length - i - 1;
            
            if(postsCount == data.length)
                $('#moreMessage').hide();
            
            filterPosts();
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

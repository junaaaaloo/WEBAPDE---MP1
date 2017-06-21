var postsCount = 0;
$(function () {
    getRecentPosts(postsCount);
})

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
                var name = document.createElement("a");
                $(name).addClass("name");
                var username = document.createElement("a");
                $(username).addClass("username");
                
                $('.name').attr('href', 'profile.html');
                $('.name').attr('onclick', 'goToProfile(' + data[i].userId + ')');
                
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

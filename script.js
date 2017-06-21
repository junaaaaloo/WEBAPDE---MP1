var root = 'https://jsonplaceholder.typicode.com';
var postCnt = 0;
var photoCnt = 0;
var albumCnt = 0;

$(document).ready(function () {
    getRecentPosts(postCnt);
    getRecentImages(photoCnt);
    getRecentAlbums(albumCnt);
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
            
                name.click(function () {
                    goToProfile(data[i].userId)
                });
                username.click(function () {
                    goToProfile(data[i].userId)
                });
                
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

function getRandomColorRGB () {
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)

    if (r == 0 && g == 0 && b == 0)
        return getRandomColor();
    else 
        return "rgb(" + r + ", " + g + ", " + b + ")";
}

function getRecentAlbums (start) {
    for(var i = start; i < (start + 5); i++) {
        var albumName = document.createElement('p');
        albumName.innerHTML = "album title";
        
        var albumPost = document.createElement('div');
    
        $(albumPost).addClass('album');
        $(albumName).addClass('albumTitle')
        
        $(albumPost).append(albumName);
        
        
        for (var j = 0; j < 5; j++) {    
            var imagePost = document.createElement('div');
            var imageContent = document.createElement('div');
            
            $(imagePost).addClass('imagePost');
            $(imageContent).addClass('imageContent');            
            
            $(imagePost).append(imageContent);
            $(albumPost).append(imagePost);
            
            var rand = (Math.random() * 10) - 5;
            $(imagePost).css("transform", "rotate(" + rand + "deg)");
        
        }
        
        
        
        $('#albumContainer').append(albumPost);

    }
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

function goToProfile(id) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
            {
                var name = document.createElement("span");
                $(name).addClass("name");
                var username = document.createElement("span");
                $(username).addClass("username");
                var email = document.createElement("span");
                $(email).addClass("email");
                var address = document.createElement("span");
                $(address).addClass("address");
                var phone = document.createElement("span");
                $(phone).addClass("phone");
                var website = document.createElement("span");
                $(website).addClass("website");
                var company = document.createElement("span");
                $(company).addClass("company");
                
                $('.profileBoxImportant').append(name);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(username);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(email);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(address);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(phone);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(website);
                $('.profileBoxImportant').append('<br>');
                $('.profileBoxImportant').append(company);
                
                name.innerHTML = data[i].name;
                username.innerHTML = "@" + data[i].username;
                email.innerHTML = data[i].email;
                address.innerHTML = data[i].address.street + " " + data[i].address.suite + " " + data[i].address.city + " " + data[i].address.zipcode;
                phone.innerHTML = data[i].phone;
                website.innerHTML = data[i].website;
                company.innerHTML = data[i].company.name + " " + data[i].company.catchPhrase + " " + data[i].company.bs;
                
                getPostsOfUser(data[i]);
             }
        } 
    });
}

function getPostsOfUser(user)
{
    $.ajax({
      url: root + '/posts?userId=' + user.id ,
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
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

            $(post).append(picture);
            $(post).append(pTitle);
            $(post).append('<br>');
            $(post).append(contentArea);
            $(contentArea).append(contentPost);
            $(".postsProfileContainer").append(post);

            contentPost.innerHTML = data[i].body;
            pTitle.innerHTML = data[i].title;
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

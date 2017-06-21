var root = 'https://jsonplaceholder.typicode.com';
var userPostCnt = 0;

$(function() {
    var string = window.location.href;
    var url = new URL(string);
    var userID = url.searchParams.get("userId");
    goToProfile(userID, userPostCnt);
})

function goToProfile (id, postNum) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        var name = document.createElement("p");
        var username = document.createElement("p");
        var email = document.createElement("p");
        var address = document.createElement("p");
        var phone = document.createElement("p");
        var website = document.createElement("p");
        var company = document.createElement("p");

        $(name).addClass("name");
        $(username).addClass("username");
        $(email).addClass("email");
        $(address).addClass("address");
        $(phone).addClass("phone");
        $(website).addClass("website");
        $(company).addClass("company");

        $('.profileBoxImportant').append(name);
        $('.profileBoxImportant').append(username);
        $('.profileBoxImportant').append(email);
        $('.profileBoxImportant').append(address);
        $('.profileBoxImportant').append(phone);
        $('.profileBoxImportant').append(website);
        $('.profileBoxImportant').append(company);

        name.innerHTML = data[id-1].name;
        username.innerHTML = "@" + data[id-1].username;
        email.innerHTML = data[id-1].email;
        address.innerHTML = data[id-1].address.street + " " + data[id-1].address.suite + " " + data[id-1].address.city + " " + data[id-1].address.zipcode;
        phone.innerHTML = data[id-1].phone;
        website.innerHTML = data[id-1].website;
        company.innerHTML = data[id-1].company.name + " " + data[id-1].company.catchPhrase + " " + data[id-1].company.bs;

        getPostsOfUser(data[id-1], postNum); 
    });
}

function getPostsOfUser(user, start) {
    $.ajax({
      url: root + '/posts?userId=' + user.id ,
      method: 'GET'
    }).then(function(data) {
        if(data.length != start){
            for(i = start; i < (start +5); i++)
            {
                var post = document.createElement("div");
                var picture = document.createElement("div");
                var pTitle = document.createElement("p");
                var contentPost = document.createElement("span");
                var contentArea = document.createElement("div");

                $(post).addClass("post");
                $(picture).addClass("picture");
                $(pTitle).addClass("postTitle");
                $(contentPost).addClass("contentPost");
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
            userPostCnt = i;
            $('.more').click(function(e) {
               getPostsOfUser(user, userPostCnt); 
            });
        }
        else{
            $('.more').hide();
        }
    });
}
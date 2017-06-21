var root = 'https://jsonplaceholder.typicode.com';

$(function() {
    var string = window.location.href;
    var url = new URL(string);
    var userID = url.searchParams.get("userId");
    goToProfile(userID);
})

function goToProfile (id) {
    $.ajax({
      url: root + '/users',
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            if(id == data[i].id)
            {
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

function getPostsOfUser(user) {
    $.ajax({
      url: root + '/posts?userId=' + user.id ,
      method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
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
    });
}
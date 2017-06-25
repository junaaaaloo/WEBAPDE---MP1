var root = 'https://jsonplaceholder.typicode.com';

$(function() {
    getUsers();
})

function getUsers(){
    $.ajax({
        url: root + '/users',
        method: 'GET'
    }).then(function(data) {
        for(i = 0; i < data.length; i++)
        {
            var user = document.createElement("a");
            var pic = document.createElement("div");
            var name = document.createElement("p");
            var username = document.createElement("p");
            var contentArea = document.createElement("div");
            
            $(user).addClass("user");
            $(pic).addClass("picture");
            $(contentArea).addClass("content");
            
            $(user).append(pic);
            $(contentArea).append(name);
            $(contentArea).append(username);
            $(user).append(contentArea);
            $("#userContainer").append(user);
            
            $(user).attr('href', 'profile.html?userId=' + data[i].id);
            name.innerHTML = data[i].name;
            username.innerHTML = "@" + data[i].username;
            console.log(data[i].username);
        }
    });
        
}
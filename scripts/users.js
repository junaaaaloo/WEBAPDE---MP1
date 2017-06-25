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
            var user = document.createElement("div");
            var pic = document.createElement("div");
            var name = document.createElement("a");
            var username = document.createElement("a");
            
            $(user).addClass("user");
            $(pic).addClass("picture");
            
            $(user).append(pic);
            $(user).append(name);
            $(user).append(username);
            $("#container").append(user);
            
            $(name).attr('href', 'profile.html?userId=' + data[i].userId);
            $(username).attr('href', 'profile.html?userId=' + data[i].userId);
            name.innerHTML = data[i].name;
            username.innerHTML = data[i].username;
            console.log(data[i].username);
        }
    });
        
}
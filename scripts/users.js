var root = 'https://jsonplaceholder.typicode.com';
var userCount = 0;

$(function() {
    getUsers(userCount);
})


function filterUsers () {
    var value = $("#searchText").val();
    var count = 0;
    
    $('.content').each(function() {
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            count++;
            $(this).mark(value);
            $(this).parent().show();
        } else {
            $(this).parent().hide();
        }
    })
    
    if(value != "") 
        notifyUsers("<span class = matches-notification> Search results for " + value + " : " + count + "/" + userCount + " </span>");
}


function notifyUsers (value) {
    new jBox('Notice', {
        content: value,
        color: 'black',
        fontFamily: 'Lato',
        autoClose: 3000,
        attributes: {
            x: 'right',
            y: 'bottom'
        }
    });
}

function getUsers(count){
    $.ajax({
        url: root + '/users',
        method: 'GET'
    }).then(function(data) {
        for(i = data.length - count - 1; i > data.length - count - 11; i--)
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
           userCount++;
        }
        
        if(userCount ==  data.length)
            $('#moreMessage').hide();
    });
        
}
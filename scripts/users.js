var root = 'https://jsonplaceholder.typicode.com';
var userCount = 0;
var prev;

$(document).ajaxStart(function(){
    $("#waitImg").css("display", "block");
    if(userCount == 0)
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


$(function() {
    getUsers(userCount);
})


function filterUsers () {
    var value = $("#searchText").val();
    var count = 0;
    var options = {};
    options['separateWordSearch'] = false;

    $('.content').each(function() {
        $(this).unmark();
        if(this.innerHTML.includes(value)) {
            count++;
            $(this).mark(value, options);
            $(this).parent().show();
        } else {
            $(this).parent().hide();
        }
    })
    
    if(prev != null)
        prev.close();
    if(value != "") 
        notifyUsers("<span class = matches-notification> Search results for " + value + " : " + count + "/" + userCount + " </span>");
}


function notifyUsers (value) {
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
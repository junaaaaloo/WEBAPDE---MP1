var root = 'https://jsonplaceholder.typicode.com';

function getRandomColorRGB () {
    var r = Math.floor(Math.random() * 255)
    var g = Math.floor(Math.random() * 255)
    var b = Math.floor(Math.random() * 255)

    if (r == 0 && g == 0 && b == 0)
        return getRandomColor();
    else 
        return "rgb(" + r + ", " + g + ", " + b + ")";
}


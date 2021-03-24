const http = require("http");

let users = ['Tom', 'Andy', 'Jessica', 'Paul'];

let server = http.createServer(function (request, response) {
    
  if(request.url === '/') {
    response.end('<h1>Welcome!</h1>');
  } else if (request.url === '/users') {
    response.end('<h1>' + users + '</h1>');
  } else if (request.url.split('/')[1] === 'users') {
    let userIdx = request.url.split('/')[2];
    let userName = users[userIdx-1];
    
    response.end('<h1>' + userName + '</h1>');     
  } else {
    response.end('<h1>Page Not Available</h1>');
  }
});

server.listen(3000);
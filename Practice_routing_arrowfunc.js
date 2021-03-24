const http = require("http");

const users = ['Tom', 'Andy', 'Jessica', 'Paul']; 

const server = http.createServer((request, response) => { // Arrow Function
  if (request.url === '/') {
    response.end('<h1>Welcome!</h1>');
  } else if (request.url === '/users') {
    response.end(`<h1>${users}</h1>`); 
  } else if (request.url.split('/')[1] === 'users') {
    const userIdx = request.url.split('/')[2];
    const userName = users[userIdx-1]; 

    response.end(`<h1>${userName}</h1>`); 
  } else {
    response.end('<h1>Page Not Available</h1>');
  }
});

server.listen(3000);
const http = require('http');
const PORT = process.env.PORT || 8080;
const URL  = process.env.URL  || 'http://www.actionherojs.com';

function handleRequest(request, response){
  response.statusCode = 302;
  response.setHeader("Location", URL);
  response.end(`You are being redirected to ${URL}\r\n`);
  logRequest(request);
}

function logRequest(request){
  let now = new Date().toISOString();
  let ip = request.connection.remoteAddress
  if(request.headers['x-forwarded-for']){ ip = request.headers['x-forwarded-for']; }
  console.log(`${now} | sending ${ip} to ${URL}`);
}

const server = http.createServer(handleRequest);

server.listen(PORT, function(){
  console.log(`Server listening on port ${PORT}`);
});

const http = require('http');
const PORT = process.env.PORT || 8080;
const URL  = process.env.URL  || 'http://www.actionherojs.com';

function handleRequest(request, response) {
  let protocol = request.headers['x-forwarded-proto']
  let hostname = request.headers.host.replace('www.', '')
  let url = `${protocol}://${hostname}${request.url}`

  response.statusCode = 302
  response.setHeader('Location', url)
  response.end(`You are being redirected to ${url}\r\n`)
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

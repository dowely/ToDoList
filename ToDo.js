var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res){
	console.log('server is running...');
	console.log(req.url);
	
	switch(req.url){
		case "/":
			var mainPage = fs.readFileSync('main.html');
			res.writeHead(200,{'Content-Type' : 'text/html'});
			res.write(mainPage);
			res.end();
			break;
		case "/style.css":
			var styleSheet = fs.readFileSync('style.css');
			res.writeHead(200,{'Content-Type' : 'text/css'});
			res.write(styleSheet);
			res.end();
			break;
		case "/index.js":
			var scripting = fs.readFileSync('index.js');
			res.writeHead(200,{'Content-Type' : 'text/javascript'});
			res.write(scripting);
			res.end();
			break;
		case "/dane.json":
			var data = fs.readFileSync('dane.json');
			res.writeHead(200,{'Content-Type' : 'application/json'});
			res.write(data);
			res.end();
			break;
		case "/save":
			let body = [];
			
			req.on('data', function (chunk) {
				body.push(chunk);
				console.log('A chunk of data just arrived..');
			}).on('end', function () {
				body = Buffer.concat(body).toString();
				console.log(body);
				fs.writeFile('dane.json' , body , function(err){
					if(err) throw err;
					console.log('Zapisano!');
				});
				res.writeHead(200,{'Content-Type' : 'text/plain'});
				res.end();
			});
			break;
	}
});

server.listen(3000);

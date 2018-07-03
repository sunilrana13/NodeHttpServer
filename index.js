const http = require('http');
const path = require('path');
const fs = require('fs');
const hostname = "nodeapp.com";
const port = "3000";
const server = http.createServer((req, res) => {
    console.log("Request for " + req.url + " by method" + req.method);
    if (req.method == "GET") {
        var fileUrl = req.url;
        if (req.url == "/") {
            fileUrl = "/index.html";
        }
        const filePath = path.resolve("./public" + fileUrl);
        console.log(filePath);
        const fileExt = path.extname(filePath);
        if (fileExt == ".html") {
            fs.exists(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader("content-Type", "text/html");
                    res.end("<html><body><h1> file not found on server.... </h1></body></html>");
                    return;
                }
                else {
                    res.statusCode = 200;
                    res.setHeader("content-Type", "text/html");
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        }
        else {
            res.statusCode = 404;
            res.setHeader("content-Type", "text/html");
            res.end("<html><body><h1> file not an html file on server.... </h1></body></html>");
            return;

        }


        // res.end("<html><body><h1> node http server is working.... </h1></body></html>");
    }
    else {
   
    res.statusCode = 404;
    res.setHeader("content-Type", "text/html");
    res.end("<html><body><h1> only get method allowed on server.... </h1></body></html>");
    return;


    }
    
});

server.listen(port, hostname, () => { console.log(`server listning at http://${hostname}:${port}`);});
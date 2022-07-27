const fs = require('fs');
exports.Load = function (req, res, filename) {

    const header = fs.readFileSync("./ui/html/template/header.html").toString();

    console.log(header);
    fs.readFile("./ui/html/pages"+filename+".html", function (err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end(err.message);
        }
        res.write(header + data.toString());
        res.end();
    });

    // fs.readFile("./ui/html/template/header.html", function (err, data) {
    //     res.write(data);
    // });
    //
    // fs.readFile("./ui/html/pages"+filename+".html", function (err, data) {
    //     if (err) {
    //         res.writeHead(404.ejs, {'Content-Type': 'text/html'});
    //         return res.end(err.message);
    //     }
    //     res.write(data);
    //     res.end();
    // });
};
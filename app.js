const express = require('express');
const path = require('path');
const fs = require('fs');
const favi = require('serve-favicon');
const config = require('config');
const filedir = config.get('files.dir');

const app = express();

app.set('view engine', 'ejs');
app.use(favi(__dirname+'/public/images/favicon.ico'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/index', function (req,res){

  console.log(readFileLines(__dirname+'/views/pages/index.ejs'));
  data = readFileLines(__dirname+'/views/pages/index.ejs');  
   res.send(data);
});

app.get('/files/*', (req,res) => {

  let inpath = filedir + req.params[0];
  let path = "/files/"+req.params[0];

try {
  if(fs.statSync(inpath).isFile())
  {
    res.sendFile(inpath);
    return;
  }
} catch (e) {
  console.log(e);
  show404(res);
}

  let dirs = fs.readdirSync(inpath).filter(function(file) {
    return fs.statSync(inpath+'/'+file).isDirectory();
  });
  let files =fs.readdirSync(inpath).filter(function(file) {
    return fs.statSync(inpath+'/'+file).isFile();
  });

renderWithHeader(res, {filename :'/files', dirs:dirs, files:files, path:path}, 'stashheader');
});

app.all('*', (req, res) => {

   const file = (req.params[0].charAt(req.params[0].length-1) === '/') ? req.params[0].slice(0, -1) : req.params[0]  ;
   console.log(file);
   fs.access('./views/pages'+file+'.ejs', fs.F_OK, (err)=> {
      if (err) {
         show404(res);
         console.log("butts");
      } else {
         renderWithHeader(res, {filename :''+file}, 'stdheader');
      }

   });
});

function show404(res)
{
  renderWithHeader(res, {filename :'/404'},'stdheader');

}

function renderWithHeader(res, array) {
  console.log("stdheader"
  );
  renderWithHeader(res, array, 'stdheader')
}
function renderWithHeader(res, array, header) {
    array.header=header;
    console.log(array.header);
    res.render('templates/template', array);
}

const readFileLines = filename =>
   fs.readFileSync(filename)
   .toString('UTF8')
   .split('\n');

var server = app.listen(config.get('server.port'), function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})

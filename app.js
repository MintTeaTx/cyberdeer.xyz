const express = require('express');
const path = require('path');
const fs = require('fs');
const favi = require('serve-favicon');
const config = require('config');
const filedir = config.get('files.dir');

const app = express();

app.set('view engine', 'ejs');
app.use(express.favicon(__dirname, 'public/images/favicon.ico'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req,res){
   renderWithHeader(res, {filename :'/index'}, 'indexheader');
});

app.get('/files/*', (req,res) => {

  let inpath = filedir + req.params[0];
  let path = "/files/"+req.params[0];

    if(fs.statSync(inpath).isFile())
    {
      res.sendFile(inpath);
      return;
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
         renderWithHeader(res, {filename :'/404'},'stdheader');
         console.log("butts");
      } else {
        console.log("dicks");
         renderWithHeader(res, {filename :''+file}, 'stdheader');
      }

   });
});

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
app.listen(config.get('server.port'), function ()
{
   console.log('listening on '+config.get('server.port'));
});

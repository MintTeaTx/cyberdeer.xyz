const express = require('express');
const path = require('path');
const fs = require('fs');
const favi = require('serve-favicon');
const config = require('config');
const filedir = config.get('files.dir');

const app = express();

app.set('view engine', 'ejs');
//app.use(express.favicon(__dirname, 'public/images/favicon.ico'));
app.use('/public', express.static(__dirname + '/public'));

app.get('/index', function (req,res){

try {
  data = require('./views/pages/index.json');
  console.log(data.data);
  success(res,data.data);
} catch(err) {
  console.log( err);
}
});



function success(res, data)
{
  res.json({success:true, data:data, err:''});
}
function error(res,err)
{
  res.json({success:false, data:'', err:err});
}
app.listen(config.get('server.port'), function ()
{
   console.log('listening on '+config.get('server.port'));
});

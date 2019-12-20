const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const ProductRouter = require('./product/routes.config');
const MachineRouter = require('./machine/routes.config');

app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.get('/',function(req,res){
    res.render('index');
});
app.get('/dashboard',function(req,res){
    res.render('dashboard');
});
app.get('/addreading',function(req,res){
    res.render('addreading');
});
app.get('/addmachine',function(req,res){
    res.render('addmachine');
});
app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
ProductRouter.routesConfig(app);
MachineRouter.routesConfig(app);


app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});

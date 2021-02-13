
const express = require("express");
const morgan = require('morgan');
const exphbs = require('express-handlebars');  
const path  = require('path') //Modulo 
const flash= require('connect-flash'); 
const session=require('express-session'); 
const MysqStore = require('express-mysql-session'); 
const {database}=require('./keys'); 
const passport = require('passport');

//Initializations

const app = express();
require('./lib/passport');
//Settings
app.set('port', process.env.PORT|| 4000);  
app.set('views',path.join(__dirname,'views')) //Le dice a node donde está la carpeta views
app.engine('.hbs', exphbs({
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'),'layouts'), 
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname: '.hbs', 
    helpers: require('./lib/handlebars')
})); 

app.set('view engine', '.hbs');


//Middlewares 
app.use(session({
  secret: 'faztmysqlnodesession',
  resave: false,
  saveUninitialized: false, 
  //Guardar la sessión dentro de la BD en vez de la memoria del server
  store: MysqStore(database) 
}));
app.use(flash());
app.use(morgan('dev')); 
app.use(express.urlencoded({extended: false})) //aceptar desde los fomularios los dato enviado por users 
app.use(express.json()); //para información json 
app.use(passport.initialize()); 
app.use(passport.session());


//Global variable  
//función o middleware
app.use((req, res ,next)=>{ 
  app.locals.success=req.flash('success');
   next();
});

//LLamar a las rutas
 app.use(require("./routes/index")); 
 app.use(require("./routes/authentication")); 
 app.use('/links',require("./routes/links")); //'links' ira en las rutas 

//Public css, javascript,imagenes
app.use(express.static(path.join(__dirname, 'public')));
//Starting the server

app.listen(app.get('port'),()=>{
  console.log('Server on port ', app.get('port'));
})

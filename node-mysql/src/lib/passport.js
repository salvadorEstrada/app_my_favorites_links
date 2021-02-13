const passport=require('passport'); 
const LocalStrategy=require('passport-local').Strategy;   
const db =require('../database'); 
const helpers=require('../lib/helper'); 

//ESTO ES PAR EL LOGIN, CUANDO YA EL USUARIO TIENE UNA CUENTA 

passport.use('local.signin',new LocalStrategy({
    //usernameField: 'username', 
    //passwordField: 'password'
}));





//ESTO ES PARA EL SIGNUP; EL REGISTRO DE USUARIO
passport.use('local.signup',new LocalStrategy({
    usernameField: 'username', 
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password,done)=>{
    const{ fullname } = req.body;
    const newUser =  {
        username,
        password,
        fullname 
    }; 
    console.log(req.body);
    newUser.password = await helpers.encryptPassword(password);//Cifra el password de entrada
    const resultQuery = await db.query('INSERT INTO users SET ?',[newUser]);  
    //resultQuery tiene una propiedad llamada insertId 
    newUser.id = resultQuery.insertId;
    return done(null, newUser);  

}));

//Para almacenar el usuario en session
passport.serializeUser((user, done)=> {
    done(null, user.id)
}); 

//para deserilizar el usuario 

passport.deserializeUser(async(id, done)=>{
  const rows = await db.query('SELECT *FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});















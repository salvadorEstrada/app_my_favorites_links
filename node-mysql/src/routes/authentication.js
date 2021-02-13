const express = require('express'); 
const router = express.Router();  
const passport=require('passport');

//PARA RENDERIZAR EL FORMULARIO
router.get('/signup',(req,resp)=>
{
   resp.render('auth/signup');
});  

/*router.post('/signup',(req,resp)=>{ 
    passport.authenticate('local.signup',{
        successRedirect: '/profile', 
        failureRedirect: '/signup',
        failureFlash:true
    }); 
    console.log(req.body);
    resp.send('received');
});*/
//Hace lo mismo de arriba 
//RECIBE LOS DATOS DEL FORMULARIO
router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/profile', 
    failureRedirect: '/signup',
    failureFlash:true
}));  

//RENDERIZAR EL FORMULARIO DEL LOGIN 
router.get('/signin', (req, res)=>{
   res.render('auth/signin');
});

/*router.post('/signin', (req,res,next)=>{
   passport.authenticate('local.signin',{
     successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
   })(req,res, next);
});*/

//CUANDO SE REGISTRA EL USUARIO LO MANDA A ESTE METHOD
router.get('/profile',(req, resp)=>{
    resp.send('this is a profile');
})

module.exports =router;
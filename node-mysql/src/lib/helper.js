const bcrypt =require('bcryptjs');
const passport = require('passport');
const helpers = {}; 

//Aqui se recibe la contraseña en texto plano(password) y luego se encripta 
//Método para registrarse
helpers.encryptPassword = async(password)=>{
  const salt= await bcrypt.genSalt(10);
  const hashpwd =await bcrypt.hash(password, salt);
  return hashpwd;
}; 

//Método para el logeo (Hace la comparación si ya existe el password en la DB) 
helpers.matchPassword = async(password, savePassword)=>{
    //password = password en texto plano, savePassword, el password que esté en la DB. 
    try{
        await bcrypt.compare(password, savePassword);
    }catch(e)
    {
      console.log(e);
    }
   
};
module.exports = helpers;
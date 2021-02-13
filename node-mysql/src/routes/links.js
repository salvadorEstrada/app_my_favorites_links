
const express = require('express'); 
const router = express.Router();  

const pooldb =require('../database');

router.get('/add', (req, res) =>{
  res.render('links/add'); 
}); 
//RECIBE DATOS DEL FORMULARIO Y LOS PERSISTE EN LA DB
router.post('/add', async(req, res)=>{
  const {title, url, description}=req.body 
  //Guardar enk un nuevo objeto  
  const newLink={
    title, 
    url,
    description
  }  
  //INSERTA UN ENLACE
  await pooldb.query('INSERT INTO links set ?',[newLink])
  req.flash('success', 'Link saved successfuly !')
  res.redirect('/links');
}); 
//CUANDO EL USUARIO AGREGUE UN ENLACE DEBE VER UNA VISTA DE SUS ENLACES COMO RESPUESTA 
//CONSULTA UN ENLACE
router.get('/', async(req,res)=>{
  const links=await pooldb.query('SELECT *FROM links'); 
  console.log(links); 
  //En vez de mandar este mensaje mando la lista
  //res.send('listas iran aquí'); 
  res.render('links/list', { links });//llama a links/list
}); 

//ELIMINAR UN ENLACE 

router.get('/delete/:id', async(req, res)=>{
  const {id}=req.params;//id que va a pasar el usuario desde la viasta 
  await pooldb.query('DELETE FROM links WHERE ID =?',[id])  
  req.flash('success','Link removed successfully');
  res.redirect('/links');
})  

//EDITAR UN ENLACE 

router.get('/edit/:id',async(req, res)=>{
  const{id}=req.params;//d que va a pasar el usuario desde la viasta para edit  
  const links = await pooldb.query('SELECT *FROM links WHERE ID =?', [id]);  
  //console.log(links[0]); solo para ver lo que sucede en consola
  res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id',async(req,res)=>{
   const{id}=req.params;//id que manda el user desde la vista 
   const{title,description,url} =req.body;//datos que voy a editar 
   //save the in a new object "newLink"
   const newLink={
      title,
      description,
      url
   };
  console.log(newLink); 
  await pooldb.query('UPDATE links set ? WHERE id=?',[newLink, id]); 
  req.flash('success','Link updated successfully');
  res.redirect('/links');
})

module.exports = router;  





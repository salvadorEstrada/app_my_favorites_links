const  express = require('express');
const router = express.Router();

//Definir una ruta inicial
router.get('/', (req, res)=>{
    res.send('Hello world!');
});

module.exports = router;

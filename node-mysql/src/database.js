const mysql = require('mysql');  
//Solo quiero la propiedad databse
const {database} = require('./keys');  
//modulo para convertir codigo de callbaks a codigo de promesas 
//How to convert callbaks code to promisify code
const{promisify} = require('util');

const cnpool=mysql.createPool(database); 

     cnpool.getConnection((err, cnn)=>{
         if(err)
         {  
             if(err.code==='PROTOCOL_CONNECTION_LOST')
             {
                console.log('DATABSE CONNECTION WAS CLOSDED');
             }
             if(err.code==='ER_CON_COUNT_ERROR')
             {
                 console.log('DATABASE HAS MANY CONNECTIONS');
             } 
             if(err.code=== 'ECONNREFUSED') 
             {
                 console.error('DATABSE CONNECTION WAS REFUSE')
             }  

        }  
        
        if(cnn) cnn.release(); 
        console.log('DATABASE CONNECTED RIGHT NOW!'); 
        return;
}); 

//promisify Pool querys en vez de callbacks
cnpool.query=promisify(cnpool.query);
module.exports = cnpool;  
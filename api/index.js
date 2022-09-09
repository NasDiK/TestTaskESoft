const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

const start = async ()=>{
    try{
        app.listen(PORT,()=>{
            console.log('Server is running on port '+PORT);
        });
    }
    catch (err){
        console.log(err);
    }
}

start();

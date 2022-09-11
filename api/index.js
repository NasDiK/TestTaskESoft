const express = require('express');
const PORT = process.env.PORT || 3001;
const authRouter = require('./routers/authRouter');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);


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

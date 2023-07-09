const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/userRoutes.js');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/netflix' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("DataBase connection is completed")
});

app.use('/api/user' , userRoutes);
app.listen(5000 , ()=>{
    console.log('listening on port 5000')
})
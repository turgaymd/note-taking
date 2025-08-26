const express=require('express');
const dotenv=require("dotenv");
const connectDB=require('./config')
const noteRouter =require("./routes/noteRoute")
const cors=require('cors')
const app=express();
const PORT=process.env.PORT || 5000;

dotenv.config()
connectDB({
useNewUrlParser:true,
});

app.use(express.json());
app.use(cors({
    origin:['http://localhost:3000', 'https://note-taking-livid.vercel.app'],
    credetentials:true,
}))
app.use('/api/', noteRouter)
app.get('/', (req,res)=>{
    res.send(
        'Api is running'
    )
})
app.listen(PORT, ()=>console.log('Server is running on', PORT))
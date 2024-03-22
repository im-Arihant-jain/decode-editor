console.log("Hello world");                             
const express = require('express')
const cors = require("cors")
const app = express();
const {generateFile} = require('./generateFile')
const {executeCpp} = require('./executeCpp')
const {executePython} = require('./executePython')
// at the end you want monwy right and hecne 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
// naato naato naato naato naato  naato naato       
app.listen(5000, ()=>{
    console.log("Listening on port 5000");
});

app.get('/',(req,res)=>{
    res.json("Heldfasdflo")
})
app.post('/run', async (req,res)=>{
    console.log("request made")
    const {language='cpp',code}= req.body;
    try{
        const filepath = await generateFile(language,code);
        let output;
        if(language=="py"){
              output = await executePython(filepath)        
        }
        else{
              output = await executeCpp(filepath)
        }   
        return res.json({filepath,output})
    }catch(err){         
        res.status(500).json({err});
    }
   
})
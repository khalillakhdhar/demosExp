const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const PORT = 4000;
app.use(bodyParser.json())
let items=[];
app.get("/items",(req,res)=>{
    res.json(items);
})
app.post("/items",(req,res)=>{
    const newItem=req.body;
    items.push(newItem)
    res.status(201).json(newItem); // create
    // minimum 
    //res.json(newItem)
})

app.put('/items/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const itemIndex=items.findIndex(i=>i.id===id);
    if(itemIndex!==-1)
    {
        items[itemIndex]=req.body;
        res.json(items[itemIndex])
    }
    else
    res.status(404).json({message:'objet introuvable'})
})
app.delete("/items/:id",(req,res)=>{
    const id=parseInt(req.params.id);
    const itemIndex=items.findIndex(i=>i.id===id);
    if(itemIndex!==-1)
    {
        items.splice(itemIndex,1)
        res.json({message:'supprimé avec succés'})
    }
    else
    res.status(404).json({message:'objet introuvable'})

})


// code http
// 100 => valid
// 200 (200,201,202,203)=> succés d'exécution 201 (created from scratch) => 202 => void executed, 203 
// code 201=> creation and  not update


//exemple minimale
/*
app.get('/', (req, res) => { res.send('Bienvenue sur mon serveur Express!'); });
app.get("/hello",(req,res)=>
{
    res.send("hello application <br> <a href='../'>retour</a>")
})
*/
app.listen(PORT, () => { console.log(`Serveur démarré sur http://localhost:${PORT}`); });
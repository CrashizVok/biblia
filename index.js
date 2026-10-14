const express = require("express")
require("dotenv").config()
const app = express()
const PORT = process?.env?.PORT
const HOST = process?.env?.HOST

app.get("/gospel", (req,res) => {
    const {passage = "Mark"} = req.query
    const style = process?.env.STYLE
    const apikey = process?.env.APIKEY

    fetch(`https://api.biblia.com/v1/bible/content/LEB.html?passage=${passage}&style=${style}&key=${apikey}`)
    .then(async (result) =>{
        console.log("GET /gospel result: ", result);
        const gospelText = await result.text() 
        return res.status(200).send(gospelText)
    })
    .catch((error) =>{
        console.warn(error);
        return res.status(403).json({error: "Bad request"})
    })
})
















// ---> Runner <---
app.listen(PORT, HOST, (error) =>{
    console.warn(`Error --> ${error}`);
    if (!error) {
        console.log(`Server is running on ${HOST}:${PORT}`);   
    }
})
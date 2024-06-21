import express from 'express';
const port = process.env.PORT || 3000
const app = express()

// listen to run the server:
app.listen(port , ()=>{
    console.log(`server is running on port ${port}`)
})
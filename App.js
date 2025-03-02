const express = require('express');
const PORT = 3364;
const path = require('path');
const app = express();
const usermodel = require('./models/user')
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname+ 'public')));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/read",async(req,res)=>{

    let users = await usermodel.find();
    res.render("read",{users});
})
app.post("/create",async(req,res)=>{
    let {username,email,image} = req.body;

    let CreatedUser = await usermodel.create({
        username: username,
        email: email,
        image: image
    })
    res.redirect("/read");
})
app.get("/delete/:id",async(req,res)=>{
    let users = await usermodel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");

});
app.get("/edit/:userid",async(req,res)=>{
    let user= await usermodel.findOne({_id: req.params.userid});
    res.render("edit",{user});
})
app.post("/update/:userid" ,async (req,res)=>{
    let {username,email,image} = req.body;
    let updateduser = await usermodel.findOneAndUpdate({_id: req.params.userid}, {username,email,image});
    res.redirect("/read");
})
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})

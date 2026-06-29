const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const Student = require("./models/Student");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MONGODB CONNECTED");
    })
    .catch((err)=>{
    console.log("Unable to Connect DB",err);
});

app.post("/api/students", async (req, res) => {
    try {
        const students = await Student.create(req.body);
        res.json({
            message:"Record Saved",
            data:students
        });
    }
    catch (err) {
        console.log("unable to store data", err);
    }
});

app.get("/api/students", async (req,res)=>{
    try{
        const students= await Student.find();
        res.json({
            message:"All Record",
            data:students
        });
    }
    catch (err){
        console.log ("Record nhi mil rha hai...",err);
    }
})



app.put("/api/students/:id",async(req,res)=>{
    try{
        //const id = req.params.id;
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id,req.body);
        if(!student){
            return res.status(401).json({
                sucess:false,
                message:"Student Not Found"
            })
        }
        res.json({
            message:"Record Updated"
        })
    }
    catch (err){
        console.log ("Unable to Update...",err);
    }
});

app.delete("/api/students/:id", async(req,res) =>{
    try{
        const{id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(401).json({
                message:"Invalid Student Id"
            });
        };
        res.json({
            message:"Record Deleted"
        });
    }
    catch (err){
        console.log("Unable to Delete",err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server Connected at" + PORT);
});


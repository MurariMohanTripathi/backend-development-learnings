 const express = require("express");
 const users = require("./MOCK_DATA.json");
 const app = express();
 const PORT =8000;
const fs =require('fs');
 //middleware
 app.use(express.urlencoded({extended:false}));
 //REST API
 app.get("/api/users",(req,res)=>{
   return res.json(users);
 });

 app.get('/users',(req,res)=>{
   const html = `
   <ul>
   ${users.map((user =>`<li>${user.first_name}</li>`))}
   </ul>
   `;
   res.send(html);
 });

 app.route("/api/users/:id")
 .get((req,res)=>{
   const id = Number(req.params.id);
   const user = users.find((user)=>user.id ===id);
   return res.json(user);
 }).patch((req,res)=>{
   //EDit user with id
   return res.json({status:'pending'});
 })
 .delete((req,res)=>{
   //delete user with id 
   return res.json({status:'pending'});
 });
 
 app.post('/api/users',(req,res)=>{
   const body = req.body;
   // console.log(body);
   users.push({...body,id:users.length+1});
   fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
      return res.json({status:"success",id:users.length+1});
   });
 });
 
//  app.patch('/api/users/:id',(req,res)=>{
//    //TODO : edit the user with id
//    return res.json({status:"pending"});
//  });
 
//  app.delete('/api/users/:id',(req,res)=>{
//    //TODO : delete the user with id
//    return res.json({status:"pending"});
//  });


 app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
 }) 
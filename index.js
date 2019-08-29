var express = require("express");
var multer = require("multer");
var jsonwebtoken = require('jsonwebtoken')
var photouploadModels = require('./models/photouploadModel')
var mongoose = require('mongoose')
var app = express();
//image uploading procedure
var storage = multer.diskStorage({
	//image destination in which folder image should upload
	destination: function(req,file,callback){
		callback(null,'./upload');
	},
	//file naming
	filename: function(req,file,callback){
		callback(null,file.fieldname+'-'+Date.now()+".jpg")
	}
})

var upload = multer({storage:storage}).array('userPhoto');
//mongoose connection
mongoose.connection.openUri('mongodb://localhost:27017/carparking',{useNewUrlParser:true});
mongoose.connection.on('connected',() => {
    console.log("connected to db")
})
mongoose.connection.on('error',(err)=>{
    if(err){
        console.log(`Conenction failed ${err}`)
    }
})
//upload all images
// app.post('api/gallery',function(req,res){
	
	
// 	newUpload.upload(req,res,function(err){
// 		if(err){
// 			return res.send("error upload file")
// 		}
// 		res.send("file uploaded")
// 	})
// })
//render to html page
app.get('/',function(req,res){
	res.sendFile(__dirname+"/index.html");
})
//multiple photos uploading
app.post('/api/photo',upload,function(req,res){
	filename =[]
	
	for (var i =0;i<req.files.length;i++)
	{
	let newPhotos=	new photouploadModels();
	newPhotos.photo_name = req.files[i].filename
	newPhotos.photo_path = req.files[i].path
	newPhotos.save((err,save)=>{
		if(err){
			res.status(500).json({
				message:"uploading failed"
			})
		}else{
			res.send("upload successfuly")
			res.status(200).json({
				
				message:"Successfuly uploaded"
				
			})
		}
	})
	}
})
	//get all photos
	app.get('/api/allphotos',(req,res)=>{
		photouploadModels.find((err,result)=>{
			if(err){
				res.status(500).json({
					message:"uploading failed"
				})
			}else{
				res.status(200).json({
				message:"all photos",result
			})
		
				
			}
		})

	})
	
	
	
	// if(req.files){
	// 	for(var i =0;i<req.filename.length;i++){
	// 		var newFileupload = new photouploadModels
			 
	// 	}
	// }
	// for (var i =0;i<req.filename.length;i++){
	// 	console.log(i)
	// }
	

const port = 3000;

// function verifyToken(req,res,next){
// 	const bearerHeader = req.header['authorization']
// 	if(typeof bearerHeader !='undefined'){
// 		const bearer = bearerHeader.split(' ')
// 		const bearerToken = bearer[1]
// 		req.token = bearerToken
// 		jsonwebtoken.verify(req.token,'secretkey',(err,authData)=>{
// 			if(err){
// 				res.status(403).send(err)
// 			}else{
// 				req.authData = authData
// 				next()
// 			}
// 		})
// 	}
// }

app.listen(port,function(){
	console.log(`App is listen at port ${port}`);
})


 
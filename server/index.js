const express = require("express")
const app = express()
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')
const drivers = require('./models/drivers');
const faceDetectWarning = require('./models/faceDetectWarning');
const carDetectWarnings = require('./models/carDetectWarnings');
const db = 'mongodb://localhost:27017/carsdata'
var multer = require('multer');
var upload = multer({dest: '../public/uploads/'});
const fs = require('fs');

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("database is connected"))
    .catch(err => console.log(err))

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'backend', 'public')));

const port = 3001

app.listen(port, () => {console.log(`Server is running on port: ${port}`);
});

app.get("/home", async (req, res) => {
  
  /* console.log(bookdata) */
  res.json({message: "Hi"})
})

app.post("/faceEvents",upload.array('file'), async (req, res) => {
  //console.log(req)
  //console.log(Object.keys(req.query)[0])
  //let jsonstring = Object.keys(req.query)[0]
  //let jsonitem = JSON.parse(jsonstring)
  //req.body
  //console.log(jsonitem)
  console.log(req.body)
  let idNumlist = await faceDetectWarning.find().sort({warning_id:-1}).limit(1)
  let idNum = idNumlist[0].warning_id
  console.log("idNum")
  console.log(idNum)
  //console.log(req)
  let faceEvent = new faceDetectWarning({
    warning_id:`${idNum+1}`,
    driver_id:req.body.DRIVER_ID,
    left_hand:req.body.lefthand,
    right_hand:req.body.righthand,
    head_hori:req.body.statusH,
    head_vert:req.body.statusV,
    timestringserver:req.body.timestringserver,
    timeNumber:req.body.time,
    message:req.body.message,
    image:"",
    lefteye:req.body.lefteye,
    righteye:req.body.righteye,
  })

  //new driver
  let booktemp = await drivers.findOne({ driver_id: req.body.DRIVER_ID })
  if (!booktemp){
  //if (req.body.DRIVER_ID == "001"){
    let newdriver = new drivers({
      driver_id:req.body.DRIVER_ID,
      mins:0,
      score:0,
      status:"none",
    })
    newdriver.save()

  }
  else{
    //let doc = await drivers.findOneAndUpdate({ driver_id: req.body.DRIVER_ID },{mins: booktemp.mins+1})
    //console.log(booktemp.mins+1)
  }

  //new 
  //drivers.findOneAndUpdate({ driver_id: req.body.DRIVER_ID },{mins: mins+1})

  console.log(idNum)
  if(req.files){
    console.log(req.files);
    //console.log(req.body);
    //var image = req.files
    //fs.writeFile('./face_image/test.jpg', image.path).catch(err =>{res.json({reply: err})});
    console.log("true")
  }
  //console.log(req.query)
  faceEvent.save()
  .then(data => {
    res.json({reply: "Face Event Saved",id:`${idNum+1}`})
  }).catch(err =>{res.json({reply: err})})
  /* console.log(bookdata) */
  //res.json({message: "Hi"})
})

app.post("/carEvents", async (req, res) => {
  console.log(req.body)
  /* console.log(bookdata) */
  let idNumlist = await carDetectWarnings.find().sort({warning_id:-1}).limit(1)
  let idNum = idNumlist[0].warning_id
  console.log("idNum")
  console.log(idNum)
  /* let idNum = await carDetectWarnings.countDocuments() */
  let carEvent = new carDetectWarnings({
    warning_id:`${idNum+1}`,
    driver_id:req.body.DRIVER_ID,
    pace:req.body.speed,
    crossingline:req.body.CROSSING,
    location:req.body.location,
    //collision:req.body.,
    objectsDistanceList:req.body.distance_set,
    objectsTypeList:req.body.distance_classes,
    warning:req.body.warning,
    warningMessage:req.body.warningMessage,
    timestringserver:req.body.timestring,
    timeNumber:req.body.timenow,
    })
  carEvent.save()
  .then(data => {
    res.json({reply: "Car Event Saved",id:`${idNum+1}`})
  }).catch(err =>{res.json({reply: err})})
})

app.post("/driver", async (req, res) => {
  console.log(req.body)
  /* console.log(bookdata) */
  let newdriver = new drivers({
    driver_id:req.body.driver_id,
    mins:0,
    score:0,
    status:"none",
  })
  let booktemp = await drivers.findOne({ driver_id: req.body.DRIVER_ID })
  if (!booktemp){
    newdriver.save()
    .then(data => {
      res.json({reply: "Driver Saved"})
    }).catch(err =>{res.json({reply: err})})
  }
})

app.post("/driveraddmins", async (req, res) => {
  let driverData = await drivers.findOne({ driver_id: req.body.driver_id })
  let driverDataADD = await drivers.findOneAndUpdate({ driver_id: req.body.driver_id },{mins: driverData.mins+1})
  console.log(driverDataADD.mins)
  res.json({reply: "1 Minunte Added"})

})

app.post("/image/:id",upload.array('file'), async (req, res) =>{
  if(req.files){
    console.log(req.files[0]);
    console.log(req.files[0].filename);
    console.log(req.params.id)
    //let string = 
    let FaceDetectDatatest = await faceDetectWarning.findOne({ warning_id: req.params.id })
    console.log(FaceDetectDatatest)
    let FaceDetectData = await faceDetectWarning.findOneAndUpdate({ warning_id: req.params.id },{image: req.files[0].filename})
    console.log(FaceDetectData)
    //var image = req.files
    //fs.writeFile('./face_image/test.jpg', image.path).catch(err =>{res.json({reply: err})});
    console.log("true")
  }
  

  res.json({reply: "bug solved Image added"})

})

app.post("/imagecar/:id",upload.array('file'), async (req, res) =>{
  if(req.files){
    console.log(req.files[0]);
    console.log(req.files[0].filename);
    //let string = 
    let carDetectDatatest = await carDetectWarnings.findOne({ warning_id: req.params.id })
    console.log(carDetectDatatest)
    let carDetectData = await carDetectWarnings.findOneAndUpdate({ warning_id: req.params.id },{image: req.files[0].filename})
    //var image = req.files
    //fs.writeFile('./face_image/test.jpg', image.path).catch(err =>{res.json({reply: err})});
    console.log("true")
  }
  

  res.json({reply: "bug solved Image added"})

})


app.get("/driverlist", async (req, res) => {
  let alldriverdata = await drivers.find()
  /* console.log(bookdata) */
  res.json(alldriverdata)
})

app.get("/driver/:id", async (req, res) => {
  let getTheDriver = await drivers.findOne({ driver_id: req.params.id })
  console.log("hisad")
  console.log(getTheDriver)
  res.json(getTheDriver)
})

app.get("/driverFace/:id", async (req, res) => {
  let getTheDriverFaceWarning = await faceDetectWarning.find({ driver_id: req.params.id })
  let getTheDriverFaceWarning2 = await faceDetectWarning.find()
  console.log(getTheDriverFaceWarning2)
  if (req.params.id == "null"){
    res.json(getTheDriverFaceWarning2)
  }
  else{
    res.json(getTheDriverFaceWarning)
  }
  
})

app.get("/driverCam/:id", async (req, res) => {
  let getTheDriverCamWarning = await carDetectWarnings.find({ driver_id: req.params.id })
  let getTheDriverCamWarning2 = await carDetectWarnings.find()
  /* console.log(bookdata) */
  if (req.params.id == "null"){
    res.json(getTheDriverCamWarning2)
  }
  else{
    res.json(getTheDriverCamWarning)
  }
})

/* app.get("/driverCase/:id", async (req, res) => {
  let getTheDriver = await drivers.findOne({ driver_id: req.params.id })
  
  res.json(getTheDriver)
}) */

app.delete("/clearOld", async (req,res) => {
  let getTheDriverCamWarning = await carDetectWarnings.deleteMany({ image : { $exists: false }})
  //let getTheDriverFaceWarning = await faceDetectWarning.deleteMany({warning_id:{$lt:381}})
  //{ image : { $exists: false } 
  console.log("yes")
  res.json({reply:"delete"})
})

app.get("/CamEvent/:id", async (req, res) => {
  let getTheDriverCamWarning = await carDetectWarnings.find({ warning_id: req.params.id })
  console.log(req.params.id)
  console.log(getTheDriverCamWarning)
  res.json(getTheDriverCamWarning)
})

app.get("/FaceEvent/:id", async (req, res) => {
  let getTheDriverFaceWarning = await faceDetectWarning.find({ warning_id: req.params.id })
  console.log(req.params.id)
  res.json(getTheDriverFaceWarning)
})

app.get("/linkdriverFace/:id/:idx", async (req, res) => {

  let getTheDriverFaceWarning = await faceDetectWarning.find({ driver_id: req.params.idx })
  let getTheDriverCamWarning = await carDetectWarnings.find({ warning_id: req.params.id })
  let resArray = []
  for (let i = 0;i < getTheDriverFaceWarning.length;i++){
      console.log(Math.abs(getTheDriverCamWarning[0].timeNumber- getTheDriverFaceWarning[i].timeNumber))
      console.log(getTheDriverFaceWarning[i].timestringserver)
    if (Math.abs(getTheDriverCamWarning[0].timeNumber- getTheDriverFaceWarning[i].timeNumber) <= 60*60*4){
      console.log("+++++++++++++++++++++++++++++++++++++++++")
      resArray.push(getTheDriverFaceWarning[i])
    }
  }
  
  console.log(getTheDriverCamWarning[0].timestringserver)
  console.log(getTheDriverFaceWarning.length)
  console.log(resArray.length)
  console.log("===============================================")
  res.json(resArray)
  /* let getTheDriverFaceWarning = await faceDetectWarning.find({ driver_id: req.params.id })
  let getTheDriverFaceWarning2 = await faceDetectWarning.find()
  console.log(getTheDriverFaceWarning2)
  if (req.params.id == "null"){
    res.json(getTheDriverFaceWarning2)
  }
  else{
    res.json(getTheDriverFaceWarning)
  } */
  
})
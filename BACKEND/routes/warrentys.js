const router = require("express").Router();
let Warrenty =require("../model/warrenty");

//create

router.route("/warr").post((req,res)=>{

    const productid =req.body.productid;
    const billno=req.body.billno;
    const  purchasedate=req.body.purchasedate;
    const claimdate=req.body.claimdate;
    const email =req.body.email;
    const contactNo =req.body.contactNo;
   
    

    const newWarrenty = new Warrenty({

       productid,
       billno,
       purchasedate,
       claimdate,
       email,
       contactNo


    })

    newWarrenty.save().then(()=>{
        res.json("warrenty Added")
    }).catch((err)=>{
        console.log(err);
    })
  

}) 

//read
router.route("/tr").get((req,res)=>{

    Warrenty.find().then((warrentys)=>{
        res.json(warrentys)
    }).catch((err)=>{
        console.log(err)
    })
})




module.exports =router;

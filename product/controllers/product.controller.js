const ProductModel = require('../models/product.model');
const fs = require('fs');
const moment=require('moment');
exports.insert = (req, res) => {
    
    // var file = req.files.ProductImage;
     var images={imgdata: Buffer, contentType: String};
    // fs.readFile(file.path,(err,data)=>{
        // images.img=data;
        // images.contentType=file.mimetype;
    // });
    req.body.images=images;
    req.body.createddate = new Date();
    ProductModel.createProduct(req.body)
        .then((result) => {
            res.status(201).send({Success:true,Message:"Reading Add Successfully",id: result._id});
        });
};

exports.list = (req, res) => {
    var machineNo = req.query.machineNo;
    console.log(machineNo);
    if(machineNo===null ||machineNo==="" || machineNo==="0" || machineNo==="undefined" || machineNo===undefined){
        ProductModel.list()
        .then((result) => {
            res.status(200).send(result);
        })
    }
    else{
        ProductModel.alllist(machineNo)
        .then((result) => {
            res.status(200).send(result);
        });
    }
   
};
exports.listdash = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ProductModel.listdash(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ProductModel.findById(req.params.productId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.getByMachineNo = (req, res) => {
    var machineNo = req.query.machineNo;
    var dateof =moment(new Date(req.query.dateof)).format("YYYY-MM-DD");
    console.log(machineNo);
    ProductModel.findBymachineNo(machineNo,dateof)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    
    ProductModel.patchProduct(req.params.productId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    console.log(req);
    ProductModel.removeById(req.params.productId)
        .then((result)=>{
            console.log(result);
            res.status(201).send({Success:true,Message:"Delete Sucessfully"});
        });
};
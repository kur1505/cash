const SubCategoryModel = require('../models/subcategory.model');
const fs = require('fs');
exports.insert = (req, res) => {
    var file = req.files.SubCategoryImage;
    var images={data: Buffer, contentType: String};
    fs.readFile(file.path,(err,data)=>{
        images.data=data;
        images.contentType=file.mimetype;
    });
    req.body.images=images;
    req.body.createddate = new Date();
    SubCategoryModel.createSubCategory(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 100;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    SubCategoryModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    SubCategoryModel.findById(req.params.subcategoryId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    
    SubCategoryModel.patchSubCategory(req.params.subcategoryId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    SubCategoryModel.removeById(req.params.subcategoryId)
        .then((result)=>{
            res.status(204).send({});
        });
};
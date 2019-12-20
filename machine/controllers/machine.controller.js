const MachineModel = require('../models/machine.model');
const fs = require('fs');
exports.insert = (req, res) => {
    req.body.createddate = new Date();
    MachineModel.createMachine(req.body)
        .then((result) => {
            res.status(201).send({Success:true,Message:"Reading Add Successfully",id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    MachineModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    MachineModel.findById(req.params.machineId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    
    MachineModel.patchMachine(req.params.machineId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    
    MachineModel.removeById(req.params.Id)
        .then((result)=>{
            res.status(201).send({Success:true,Message:'Deleted',Res_Obj:result});
        });
};
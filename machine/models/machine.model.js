const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const machineSchema = new Schema({
    machineName: {type: String,required:true},
    description: String,
    isdeleted:{type:Boolean,default:false},
    createddate:Date,
    deletedate:Date
});

machineSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
machineSchema.set('toJSON', {
    virtuals: true
});

machineSchema.findById = function (cb) {
    return this.model('Machines').find({id: this.id}, cb);
};

const Machine = mongoose.model('Machines', machineSchema);


exports.findByMachine = (machine) => {
    return Machine.find({machineName: machine});
};
exports.findById = (id) => {
    return Machine.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createMachine = (machineData) => {
    const machine = new Machine(machineData);
    return machine.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Machine.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, machine) {
                if (err) {
                    reject(err);
                } else {
                    resolve(machine);
                }
            })
    });
};

exports.patchMachine = (id, machineData) => {
    return new Promise((resolve, reject) => {
        Machine.findById(id, function (err, machine) {
            if (err) reject(err);
            for (let i in machineData) {
                machine[i] = machineData[i];
            }
            machine.save(function (err, updatedmachine) {
                if (err) return reject(err);
                resolve(updatedmachine);
            });
        });
    })

};

exports.removeById = (machineId) => {
    
    return new Promise((resolve, reject) => {
        Machine.deleteOne({_id: machineId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


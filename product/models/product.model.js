const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const MachineModel = require('../../machine/models/machine.model');
const productSchema = new Schema({
    machineNo: { type: String, required: true },
    dateTime: Date,
    currentReading: { type: String, required: true },
    previousReading: { type: String, required: true },
    total: { type: Number, required: true },
    isdeleted: { type: Boolean, default: false },
    images: { img: Buffer, contentType: String },
    createddate: Date,
    deletedate: Date
});

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
productSchema.set('toJSON', {
    virtuals: true
});

productSchema.findById = function (cb) {
    return this.model('Products').find({ id: this.id }, cb);
};

const Product = mongoose.model('Products', productSchema);


exports.findBymachineNo = (machineNo) => {
    return Product.find({ machineNo: machineNo }).sort({ _id: -1 }).limit(1);
};
exports.findById = (id) => {
    return Product.findById(id)
        .then((result) => {

            return result;
        });
};

exports.createProduct = (productData) => {
    const product = new Product(productData);
    return product.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        var dbYesterday = new Date();
        dbYesterday.setDate(dbYesterday.getDate() - 3);
        Product.find().limit(perPage)
            .skip(perPage * page).sort({ dateTime: -1 })
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {

                    resolve(products);
                }
            })
    });
};

exports.listdash = (perPage, page) => {
    return new Promise((resolve, reject) => {
        var dbYesterday = new Date();
        dbYesterday.setDate(dbYesterday.getDate() - 3);
        Product.aggregate([
        { $match: { dateTime: { $gt: dbYesterday } } },
        { $group: { _id: { dateTime: "$dateTime", mId: "$machineNo" }, sumtotal: { $sum: "$total" } } }
        
        ]).limit(perPage)
            .skip(perPage * page).sort({ mId: 1 })
            .exec(function (err, products) {
                if (err) {
                    reject(err);
                } else {
                    resolve(products);
                }
            })
    });
};

exports.patchProduct = (id, productData) => {
    return new Promise((resolve, reject) => {
        Product.findById(id, function (err, product) {
            if (err) reject(err);
            for (let i in productData) {
                product[i] = productData[i];
            }
            product.save(function (err, updatedProduct) {
                if (err) return reject(err);
                resolve(updatedProduct);
            });
        });
    })

};

exports.removeById = (productId) => {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: productId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

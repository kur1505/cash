const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
    categoryId: { type: String, required: true },
    subcategoryName: {type: String,required:true},
    description: String,
    isdeleted:{type:Boolean,default:false},
    images: { data: Buffer, contentType: String },
    createddate:Date,
    deletedate:Date
});

subcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
subcategorySchema.set('toJSON', {
    virtuals: true
});

subcategorySchema.findById = function (cb) {
    return this.model('SubCategorys').find({id: this.id}, cb);
};

const subcategory = mongoose.model('SubCategorys', subcategorySchema);


exports.findBySubCategory = (subcategory) => {
    return SubCategory.find({subcategory: subcategory});
};
exports.findById = (id) => {
    return SubCategory.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createSubCategory = (subcategoryData) => {
    const subcategory = new SubCategory(subcategoryData);
    return subcategory.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        SubCategory.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, subcategorys) {
                if (err) {
                    reject(err);
                } else {
                    resolve(subcategorys);
                }
            })
    });
};

exports.patchSubCategory = (id, subcategoryData) => {
    return new Promise((resolve, reject) => {
        SubCategory.findById(id, function (err, subcategory) {
            if (err) reject(err);
            for (let i in subcategoryData) {
                subcategory[i] = subcategoryData[i];
            }
            subcategory.save(function (err, updatedSubCategory) {
                if (err) return reject(err);
                resolve(updatedSubCategory);
            });
        });
    })

};

exports.removeById = (subcategoryId) => {
    return new Promise((resolve, reject) => {
        SubCategory.remove({_id: subcategoryId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [100, "Price should be greater then 100"], max: [300000, "Price should be less then 300000"] },
    discountPercentage: { type: Number, min: [5, "Discount should be Greater then 5%"], max: [90, "Discount should be less then 90%"] },
    rating: { type: Number, min: [2, "Rating should be Greater then 2"], max: [5, "Rating should be Less then 5"] },
    stock: { type: Number, min: [30, "Stock shoulde be Greater the 30"], max: [10000, "Stock should be Less then 10000"] },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type : String, required: true},
    images: { type: [String], required: true }
})



const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


exports.Product = mongoose.model("Product", productSchema)
const { Product } = require("../model/Products")

exports.addProduct = async (req, res) => {
    const product = new Product(req.body)

    try {
        const result = await product.save()
        res.status(201).json({ message: "Success", data: result })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.fetchAllProducts = async (req, res) => {
    let query = Product.find();
    let condition = {}
    let totalProductsQuery = Product.find(condition);

    console.log(condition);
    try {
        req.query.category
        if (req.query.category) {
            query = query.find({ category: req.query.category })
            totalProductsQuery = totalProductsQuery.find({ category: req.query.category })
        } if (req.query.brand) {
            query = query.find({ brand: req.query.brand })
            totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand })
        }
        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order })

        }
        if (req.query._page && req.query._limit) {
            const page = req.query._page;
            const pageSize = req.query._limit
            query = query.skip(pageSize * (page - 1)).limit(pageSize)

            //query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }
        const totalDocs = await totalProductsQuery.count().exec();
        const result = await query.exec();

        //const count = await query.find().count();
        //console.log(result)
        const newResult = {
            result,
            totalRecord: totalDocs
        }
        res.status(200).json({ message: "Success", data: newResult })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
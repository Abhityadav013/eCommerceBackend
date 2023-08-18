const express = require("express");
const mongoose = require("mongoose");
const productRouter = require('./routes/Product')


const app = express();

// app.get('/', (rerq, res) => {
//     res.send({ status: "Get APi Call" })
// })
app.use(express.json())
app.use('/products', productRouter.router)


main().catch((err) => console.log({ message: err.message }))
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/eCommerceBackend")
    console.log("DB is Connected")
}
app.listen(5000, () => {
    console.log("Server Is Started")
})